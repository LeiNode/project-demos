import NavBar from './components/NavBar';
import ParticleClass from "./components/ParticlesClass";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Connect from './pages/Connect';
import Project1 from './pages/Project1';
import Project2 from './pages/Project2';
import { SHOW_TEXT } from './featureFlags';
import './App.css';

function App() {
  return(
    <div>
      {/* <Alert>
        Hello <span>World</span>
      </Alert> */}

      <BrowserRouter>
        <ParticleClass />
        {SHOW_TEXT && <NavBar />}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/connect' element={<Connect/>}/>
          <Route path = '/Project1' element={<Project1/>}/>
          <Route path = '/Project2' element= {<Project2/>} />
        </Routes>
      </BrowserRouter>
      
      {/* <ListGroup items = {items} heading="Projects" /> */}
    </div>
  )
}

export default App;