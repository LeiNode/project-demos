import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './NavBar.css';
import { IconContext } from 'react-icons/lib';

function NavBar (){
    const [sidebar, changeSideBar] = useState(false)

    const showSidebar = () => changeSideBar(!sidebar)

  return (
    <>
        <IconContext.Provider value={{color:'white'}}>
            <div className='navbar '>
                <button className='menu-bars'>
                    <FaBars onClick={showSidebar}/>
                </button>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <button className='menu-bars'>
                            <AiOutlineClose />
                        </button>
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
        </IconContext.Provider>
    </>
  )
}

export default NavBar