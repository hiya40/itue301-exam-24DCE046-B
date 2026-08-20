const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const requestLogger = require('./middleware/requestLogger')
const Patient = require('./models/Patient')
const Doctor = require('./models/Doctor')
const Appointment = require('./models/Appointment')

const app = express()
const port = process.env.PORT || 5000

const doctors = [
  { id: 'doc-1', name: 'Dr. Meera Kapoor', email: 'meera.kapoor@medcareplus.com', specialisation: 'Cardiology', available: true },
  { id: 'doc-2', name: 'Dr. Rohan Mehta', email: 'rohan.mehta@medcareplus.com', specialisation: 'Orthopaedics', available: true },
  { id: 'doc-3', name: 'Dr. Anika Sen', email: 'anika.sen@medcareplus.com', specialisation: 'Dermatology', available: false },
]
const appointments = [
  { id: 'apt-1', patientName: 'Aarav Sharma', doctorName: 'Dr. Meera Kapoor', date: '2026-08-24', timeSlot: '10:30 AM', status: 'confirmed', reason: 'Regular check-up' },
]

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.get('/', (request, response) => response.status(200).json({ message: 'MedCare Plus backend is running.', api: '/api/v1' }))

app.get('/api/v1/appointments', (request, response) => response.status(200).json(appointments))

app.post('/api/v1/appointments', (request, response, next) => {
  try {
    const { patientName, doctorName, date, timeSlot, status = 'pending', reason = '' } = request.body
    if (!patientName || !doctorName || !date || !timeSlot) {
      return response.status(400).json({ error: 'patientName, doctorName, date and timeSlot are required.' })
    }
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return response.status(400).json({ error: 'status must be pending, confirmed or cancelled.' })
    }
    const appointment = { id: `apt-${appointments.length + 1}`, patientName, doctorName, date, timeSlot, status, reason }
    appointments.push(appointment)
    return response.status(201).json(appointment)
  } catch (error) {
    return next(error)
  }
})

app.get('/api/v1/doctors', (request, response) => response.status(200).json(doctors))

app.post('/api/v1/mongodb/demo', async (request, response, next) => {
  try {
    if (mongoose.connection.readyState !== 1) return response.status(503).json({ error: 'MongoDB is not connected. Set MONGO_URI and restart the server.' })
    const patient = await Patient.create(request.body)
    return response.status(201).json({ message: 'Patient created successfully.', patient })
  } catch (error) {
    if (error.name === 'ValidationError' || error.code === 11000) return response.status(400).json({ error: 'Patient data failed validation.', details: Object.values(error.errors || {}).map((item) => item.message) })
    return next(error)
  }
})

app.use((error, request, response, next) => {
  console.error(error.message)
  response.status(error.status || 500).json({ error: 'An unexpected server error occurred.' })
})

async function startServer() {
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI)
      console.log('MongoDB connected.')
    } catch (error) {
      console.error('MongoDB connection failed:', error.message)
    }
  } else {
    console.log('MongoDB is disabled until MONGO_URI is provided.')
  }
  app.listen(port, () => console.log(`MedCare Plus backend running at http://localhost:${port}`))
}

if (require.main === module) startServer()
module.exports = app
