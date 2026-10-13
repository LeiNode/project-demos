import { Link } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
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
          <Link to='/resume' className='link-button'>Resume</Link>
        </div>
      </section>

      <section className='content-container'>
        <h2>Get in Touch</h2>
        <p className='contact-intro'>Leave your details and a message, and I'll get back to you.</p>
        <ContactForm />
      </section>
    </main>
  )
}

export default Connect
