import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './NavBar.css';

function NavBar (){
    const [sidebar, changeSideBar] = useState(false)

    const showSidebar = () => changeSideBar(!sidebar)

  return (
    <>
        <div className='navbar'>
            <Link to='#' className='menu-bars'>
                <FaBars/>
            </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items'>
                <li className='navbar-toggle'>
                    <Link to="#" className='menu-bars'>
                        <AiOutlineClose/>
                    </Link>
                </li>
                {SidebarData.map((items, index) => {
                    return(
                        <li key={index} className={items.cName}>
                            <Link to={items.path}>
                                <span>{items.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    </>
  )
}

export default NavBar