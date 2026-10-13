import { Link } from 'react-router-dom'
import "./Page.css"

function Connect() {
  return (
    <main className='page-container'>
      <Link to='/' className='back-link'>← Back to Earth</Link>
      <h1>Connect</h1>

      <section className='content-container'>
        <p>I look forward to connecting with you.</p>
        <div className='link-list'>
          <a href="https://github.com/leinode" target="_blank" rel="noopener noreferrer" className='link-button'>GitHub</a>
          <a href="https://linkedin.com/in/daniel-nguyen-7a128224b" target="_blank" rel="noopener noreferrer" className='link-button'>LinkedIn</a>
          <a href="mailto:daniel.nguyen.2345@gmail.com" className='link-button'>Email</a>
          <Link to='/resume' className='link-button'>Resume</Link>
        </div>
      </section>
    </main>
  )
}

export default Connect
