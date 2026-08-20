# MedCare Plus Hospital Appointment System

This repository implements the five ITUE301 examination tasks using React, Express.js, MongoDB, and Mongoose.

## Project Structure

- `frontend/`: React + Vite application with React Router pages and API consumption.
- `backend/`: Express REST API, request logger, error handler, and Mongoose models.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend at `http://localhost:5000`. To use another URL, create `frontend/.env` with `VITE_API_URL=http://localhost:5000`.

## Backend Setup

```bash
cd backend
npm install
npm start
```

The backend starts with `node server.js` and serves port `5000` by default.

## MongoDB Setup

1. Copy `.env.example` to `.env` in the project root.
2. Set `MONGO_URI` to a local MongoDB or MongoDB Atlas connection string.
3. Set `PORT=5000` if required.
4. Start the backend with `npm start`.

The MongoDB schema models are in `backend/models`. `POST /api/v1/mongodb/demo` demonstrates a Mongoose insert and returns a meaningful validation response for invalid patient data.

## Required Environment Variables

```env
MONGO_URI=mongodb://127.0.0.1:27017/medcare_plus
PORT=5000

## API Endpoints

- `GET /api/v1/appointments`: returns appointments.
- `POST /api/v1/appointments`: creates an appointment.
- `GET /api/v1/doctors`: returns doctors for the React Doctors page.
- `POST /api/v1/mongodb/demo`: creates a MongoDB patient document when MongoDB is connected.

## Examination Evidence

Create three screenshots for the required report: the React app in the browser, a successful API request in Postman or Thunder Client, and the created MongoDB document in Compass or Atlas. Save the final PDF as `[RollNo]_SetA_Report.pdf`.


