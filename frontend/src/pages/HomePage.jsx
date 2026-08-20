import AppointmentCard from '../components/AppointmentCard'

export default function HomePage() {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Private care, thoughtfully coordinated</p>
        <h1>Healthcare that makes room for you.</h1>
        <p className="hero-text">Find the right specialist, choose a time that works, and keep every appointment close at hand.</p>
        <a className="button" href="/booking">Book an appointment</a>
      </div>
      <AppointmentCard
        patientName="Aarav Sharma"
        doctorName="Dr. Meera Kapoor"
        date="2026-08-24"
        timeSlot="10:30 AM"
        status="confirmed"
      />
    </section>
  )
}
