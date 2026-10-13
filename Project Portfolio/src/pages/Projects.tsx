import { Link } from 'react-router-dom'
import "./Page.css"

function Projects() {
  return (
    <main className='page-container'>
      <Link to='/' className='back-link'>← Back to Earth</Link>
      <h1>Projects</h1>

      <section className='content-container'>
        <h2>Split Step Counter</h2>
        <p>
          A computer vision model that counts a tennis player's split steps. An LSTM trained on MediaPipe
          pose landmarks reaches 90% recall and 80% precision on a held-out test set, fed by a Python
          video-processing pipeline built on threads and queues, and containerized with Docker.
        </p>
        <div className='link-list'>
          <Link to='/projects/split-step' className='link-button'>Watch the demo</Link>
        </div>
      </section>

      <section className='content-container'>
        <h2>More Projects</h2>
        <p>Stay tuned for more projects!</p>
      </section>
    </main>
  )
}

export default Projects
