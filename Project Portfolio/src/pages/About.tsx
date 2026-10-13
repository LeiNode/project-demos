import { Link } from 'react-router-dom'
import "./Page.css"

function About() {
  return (
    <main className='page-container'>
      <Link to='/' className='back-link'>← Back to Earth</Link>
      <h1>About Me</h1>

      <section className='content-container'>
        <h2>Who I Am</h2>
        <p>
          I'm a Computer Science graduate from The University of Texas at Dallas, now working toward a
          Master of Science in Software Engineering there. I enjoy tackling difficult problems, and I'm most
          interested in where software engineering meets machine learning, especially computer vision.
        </p>
      </section>

      <section className='content-container'>
        <h2>Skills</h2>
        <ul>
          <li>Python, Java, JavaScript, SQL, HTML/CSS</li>
          <li>React, TensorFlow, PyTorch, scikit-learn, MediaPipe, Pandas, NumPy</li>
          <li>RESTful API development, object-oriented design, data structures &amp; algorithms</li>
          <li>MySQL, Oracle, and database design (ER/EER modeling)</li>
          <li>AWS, Docker, Git, Linux</li>
        </ul>
      </section>

      <section className='content-container'>
        <h2>What I'm Working On</h2>
        <p>
          My current project is a tennis training application: an LSTM model that detects split steps from
          MediaPipe pose landmarks, fed by a multithreaded Python video-processing pipeline and packaged with
          Docker. You can watch it run on real match footage on the projects page.
        </p>
        <div className='link-list'>
          <Link to='/projects' className='link-button'>See my projects</Link>
          <Link to='/resume' className='link-button'>View my resume</Link>
        </div>
      </section>
    </main>
  )
}

export default About
