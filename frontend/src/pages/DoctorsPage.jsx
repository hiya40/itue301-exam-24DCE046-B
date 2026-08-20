import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function DoctorsPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await fetch(`${API_URL}/api/v1/doctors`)
        if (!response.ok) throw new Error('Unable to load doctors.')
        setData(await response.json())
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDoctors()
  }, [])

  return (
    <section>
      <div className="section-heading">
        <p className="eyebrow">Our specialists</p>
        <h1>Meet your care team.</h1>
      </div>
      {loading && <p className="message">Loading doctors...</p>}
      {error && <p className="message error">{error}</p>}
      {!loading && !error && (
        <div className="doctor-grid">
          {data.map((doctor) => (
            <article className="doctor-card" key={doctor.id || doctor._id}>
              <div className="doctor-avatar">{doctor.name.charAt(0)}</div>
              <h2>{doctor.name}</h2>
              <p>{doctor.specialisation}</p>
              <span className={doctor.available ? 'availability available' : 'availability'}>
                {doctor.available ? 'Available' : 'Unavailable'}
              </span>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
