import { useState } from 'react'

const initialForm = { patientName: '', doctorName: '', date: '', timeSlot: '' }

export default function BookingPage() {
  const [formData, setFormData] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setSubmitted(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="booking-layout">
      <div className="section-heading">
        <p className="eyebrow">A calmer next step</p>
        <h1>Book a visit.</h1>
        <p>Tell us who you would like to see and when. Your request will be marked pending for confirmation.</p>
        {formData.patientName && <p className="live-preview">Booking for <strong>{formData.patientName}</strong></p>}
      </div>
      <form className="booking-form" onSubmit={handleSubmit}>
        <label>Patient name<input name="patientName" value={formData.patientName} onChange={handleChange} required /></label>
        <label>Doctor name<input name="doctorName" value={formData.doctorName} onChange={handleChange} required /></label>
        <label>Date<input type="date" name="date" value={formData.date} onChange={handleChange} required /></label>
        <label>Time slot<input name="timeSlot" placeholder="10:30 AM" value={formData.timeSlot} onChange={handleChange} required /></label>
        <button className="button" type="submit">Request appointment</button>
        {submitted && <p className="success">Appointment request submitted for {formData.patientName}.</p>}
      </form>
    </section>
  )
}
