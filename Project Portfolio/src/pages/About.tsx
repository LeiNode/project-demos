import { Link } from 'react-router-dom'
import "./Page.css"

function About() {
  return (
    <main className='page-container'>
      <Link to='/' className='back-link'>← Back to Earth</Link>
      <h1>About Me</h1>

      <section className='content-container'>
        <h2>About Me</h2>
        <p>
          I am a software developer with a passion for creating innovative solutions.
          I have experience in full-stack development, working with technologies such as React, Node.js, and Python.
          In my free time, I enjoy contributing to open-source projects and exploring new technologies.
          Feel free to take a look around my portfolio to see some of the projects I've worked on!
          I look forward to connecting with you.
        </p>
      </section>

      <section className='content-container'>
        <h2>Skills</h2>
        <p>I have experience in a variety of programming languages and frameworks, including:</p>
        <ul>
          <li>TypeScript (React, Node.js)</li>
          <li>Python</li>
          <li>SQL</li>
        </ul>
        <p>
          I am currently learning about machine learning and data science, and I am excited to apply these skills to future projects.
          Somethings that I am interested in exploring includes anomaly detection in time series data, natural language processing, and computer vision.
        </p>
      </section>

      <section className='content-container'>
        <h2>History</h2>
        <p>
          I am a software developer with a passion for creating innovative solutions.
          I have experience in full-stack development, working with technologies such as React, Node.js, and Python.
          In my free time, I enjoy contributing to open-source projects and exploring new technologies.
          Feel free to take a look around my portfolio to see some of the projects I've worked on!
          I look forward to connecting with you.
        </p>
      </section>
    </main>
  )
}

export default About
