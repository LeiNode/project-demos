import { useState } from 'react'
import ListGroup from "./components/ListGroup"
import Alert from './components/Alert';
import NavBar from './components/NavBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Project1 from './pages/Project1';
import Project2 from './pages/Project2';
import { FaBars } from "react-icons/fa";

function App() {
  let items = ["Project 1", "Project 2", "Project 3", "Project 4", "Project 5"];

  return(
    <div>
      {/* <Alert>
        Hello <span>World</span>
      </Alert> */}
      
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/Home' element={<Home/>}/>
          <Route path = '/Project1' element={<Project1/>}/>
          <Route path = '/Project2' element= {<Project2/>} />
        </Routes>
      </BrowserRouter>
      
      {/* <ListGroup items = {items} heading="Projects" /> */}
    </div>
  )
}

export default App
