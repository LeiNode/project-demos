import { Link } from 'react-router-dom'
import "./Page.css"

function NotFound() {
  return (
    <main className='page-container'>
      <Link to='/' className='back-link'>← Back to Earth</Link>
      <h1>Page not found</h1>

      <section className='content-container'>
        <p>There's nothing at this address. It may have moved, or the link may have a typo.</p>
        <div className='link-list'>
          <Link to='/' className='link-button'>Home</Link>
          <Link to='/projects' className='link-button'>Projects</Link>
        </div>
      </section>
    </main>
  )
}

export default NotFound
