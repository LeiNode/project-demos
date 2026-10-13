import { Link } from 'react-router-dom'
import "./Page.css"
import "./Resume.css"
import resumePdf from '../resume'

type Entry = { title: string, subtitle?: string, dates: string, bullets?: string[] }

const EDUCATION: Entry[] = [
  {
    title: 'The University of Texas at Dallas',
    subtitle: 'Master of Science, Software Engineering',
    dates: 'February 2025 – December 2027',
  },
  {
    title: 'The University of Texas at Dallas',
    subtitle: 'Bachelor of Science, Computer Science · GPA 3.500',
    dates: 'December 2024',
  },
]

const SKILLS: { label: string, items: string }[] = [
  { label: 'Languages', items: 'Python, Java, JavaScript, SQL, HTML/CSS' },
  { label: 'Software Engineering', items: 'Object-Oriented Programming (OOP), Data Structures & Algorithms, RESTful API Development, SDLC, Agile, Integration Testing' },
  { label: 'Frameworks & Libraries', items: 'React, TensorFlow, PyTorch, scikit-learn, MediaPipe, Pandas, NumPy' },
  { label: 'Databases', items: 'MySQL, Oracle' },
  { label: 'Design & Architecture', items: 'UML (Class, Sequence), ER/EER Modeling, Database Design' },
  { label: 'Cloud & Tools', items: 'AWS, Docker, Git, Linux, Unix' },
]

const ACADEMIC: Entry[] = [
  {
    title: 'Tennis Training Application',
    dates: 'March 2025 – Current',
    bullets: [
      'Developed an LSTM-based model to detect tennis split-step movements from MediaPipe pose landmarks, achieving 90% recall and 80% precision on a held-out test set.',
      'Built a Python video-processing pipeline using threading and queues to process tennis footage, extract MediaPipe pose data, and analyze a sparse dataset for supervised model training.',
      'Containerized the application using Docker to enable consistent deployment and execution on servers.',
    ],
  },
  {
    title: 'Software Engineering',
    dates: 'March – May 2025',
    bullets: [
      'Led a team to model real-world problems like a library rental system using Domain Models and Sequence Diagrams.',
      'Met project deadlines through Scrum meetings, working in an iterative, Agile process.',
      'Set up and led Sprint meetings to make sure deliverables met project standards and deadlines.',
    ],
  },
  {
    title: 'Introduction to Machine Learning',
    dates: 'March – May 2023',
    bullets: [
      'Applied image recognition techniques to correctly identify over 94% of images, improving classification performance in a ResNet image recognition project.',
      'Partnered with 3 others to research and implement neural network architectures, including CNNs, ResNets, and RNNs.',
    ],
  },
]

const PROFESSIONAL: Entry[] = [
  {
    title: 'Ridge Commons Family Dentistry',
    dates: 'August 2021 – Current',
    bullets: [
      'Handle service order requests from the dentist and prepare specifications for purchase and equipment orders.',
      'Maintain an efficient workflow by scheduling, breaking down insurance, and addressing customer concerns.',
      'Collaborate with staff to keep equipment stocked daily and ready for each procedure.',
    ],
  },
]

const SERVICE: Entry[] = [
  { title: 'North Texas Food Bank', subtitle: 'Plano, TX', dates: 'August 2020 – Current' },
]

function EntryList({ entries }: { entries: Entry[] }) {
  return entries.map((entry) => (
    <div className='resume-entry' key={`${entry.title}-${entry.dates}`}>
      <div className='resume-entry-head'>
        <h3>{entry.title}</h3>
        <span className='resume-dates'>{entry.dates}</span>
      </div>
      {entry.subtitle && <p className='resume-subtitle'>{entry.subtitle}</p>}
      {entry.bullets && (
        <ul>
          {entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
      )}
    </div>
  ))
}

function Resume() {
  return (
    <main className='page-container resume'>
      <div className='resume-actions'>
        <Link to='/' className='back-link'>← Back to Earth</Link>
        <a href={resumePdf} target='_blank' rel='noopener noreferrer' className='link-button'>
          Download PDF
        </a>
      </div>

      <header className='resume-header'>
        <h1>Daniel Nguyen</h1>
        <p>
          Richardson, TX ·{' '}
          <a href='mailto:daniel.nguyen.2345@gmail.com'>daniel.nguyen.2345@gmail.com</a> ·{' '}
          <a href='https://linkedin.com/in/daniel-nguyen-7a128224b' target='_blank' rel='noopener noreferrer'>LinkedIn</a> ·{' '}
          <a href='https://github.com/leinode' target='_blank' rel='noopener noreferrer'>GitHub</a>
        </p>
      </header>

      <section className='content-container'>
        <h2>Summary</h2>
        <p>
          Motivated Computer Science graduate with a strong foundation in software development, programming,
          and database systems. Proficient in Java, Python, SQL, and RESTful APIs, with experience building and
          streamlining applications using current development tools and Agile methodologies. Experienced with
          structured data formats including JSON and XML. Adept at problem solving and writing clear, efficient
          code, with excellent communication skills. Eager to tackle difficult problems and discover new
          AI-driven solutions.
        </p>
      </section>

      <section className='content-container'>
        <h2>Education</h2>
        <EntryList entries={EDUCATION} />
      </section>

      <section className='content-container'>
        <h2>Skills</h2>
        <dl className='resume-skills'>
          {SKILLS.map(({ label, items }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className='content-container'>
        <h2>Academic Experience</h2>
        <EntryList entries={ACADEMIC} />
      </section>

      <section className='content-container'>
        <h2>Professional Experience</h2>
        <EntryList entries={PROFESSIONAL} />
      </section>

      <section className='content-container'>
        <h2>Community Service</h2>
        <EntryList entries={SERVICE} />
      </section>
    </main>
  )
}

export default Resume
