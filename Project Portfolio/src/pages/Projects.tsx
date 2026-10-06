import { Link } from 'react-router-dom'
import "./Page.css"

function Projects() {
  return (
    <main className='page-container'>
      <Link to='/' className='back-link'>← Back to Earth</Link>
      <h1>Projects</h1>

      <section className='content-container'>
        <h2>Anomaly Detection in Time Series Data</h2>
        <p>Write-up coming soon.</p>
        <Link to='/Project1' className='link-button'>View project</Link>
      </section>

      <section className='content-container'>
        <h2>More Projects</h2>
        <p>Stay tuned for more projects!</p>
      </section>
    </main>
  )
}

export default Projects
