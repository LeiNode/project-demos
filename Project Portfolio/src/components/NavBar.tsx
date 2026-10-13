import { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './NavBar.css';
import { IconContext } from 'react-icons/lib';

function NavBar (){
    const [sidebar, setSidebar] = useState(false)

    const closeSidebar = () => setSidebar(false)

    // Escape closes the menu, as keyboard users expect from a slide-out panel
    useEffect(() => {
        if (!sidebar) return
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSidebar(false)
        }
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [sidebar])

  return (
    <IconContext.Provider value={{color:'white'}}>
        <div className='navbar'>
            <button
                type='button'
                className='menu-bars'
                aria-label='Open menu'
                aria-expanded={sidebar}
                aria-controls='site-menu'
                onClick={() => setSidebar(true)}
            >
                <FaBars aria-hidden='true'/>
            </button>
        </div>
        <nav id='site-menu' className={sidebar ? 'nav-menu active' : 'nav-menu'} aria-label='Site' inert={!sidebar}>
            <ul className='nav-menu-items'>
                <li className='navbar-toggle'>
                    <button type='button' className='menu-bars' aria-label='Close menu' onClick={closeSidebar}>
                        <AiOutlineClose aria-hidden='true'/>
                    </button>
                </li>
                {SidebarData.map((item) => (
                    <li key={item.path} className={item.cName}>
                        <Link to={item.path} onClick={closeSidebar}>
                            <span>{item.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    </IconContext.Provider>
  )
}

export default NavBar
