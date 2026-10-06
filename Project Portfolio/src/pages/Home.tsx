import { Link } from 'react-router-dom'
import Earth from '../components/Earth'
import "./Home.css"

function Home() {
  return (
    <main className='home-container'>
      <header className='home-header'>
        <h1>Daniel Nguyen</h1>
        <p>Software Developer</p>
      </header>

      <Earth />

      {/* Plain links for visitors who don't try the globe */}
      <nav className='home-menu' aria-label='Main'>
        <Link to='/about'>About Me</Link>
        <Link to='/projects'>Projects</Link>
        <Link to='/connect'>Connect</Link>
      </nav>

      <footer className='home-footer'>
        © {new Date().getFullYear()} Daniel Nguyen. All rights reserved.
      </footer>
    </main>
  )
}

export default Home
