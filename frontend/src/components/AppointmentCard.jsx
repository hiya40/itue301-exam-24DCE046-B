export default function AppointmentCard({ patientName, doctorName, date, timeSlot, status }) {
  return (
    <article className="appointment-card">
      <div>
        <p className="eyebrow">Appointment</p>
        <h3>{doctorName}</h3>
        <p>Patient: {patientName}</p>
      </div>
      <div className="appointment-details">
        <span>{date}</span>
        <span>{timeSlot}</span>
        <span className={`status status-${status}`}>{status}</span>
      </div>
    </article>
  )
}
