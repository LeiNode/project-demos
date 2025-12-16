import ListGroup from "./components/ListGroup"
import Alert from './components/Alert';
import NavBar from './components/NavBar';
import ParticleClass from "./components/ParticlesClass";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Project1 from './pages/Project1';
import Project2 from './pages/Project2';
import './App.css';

function App() {
  return(
    <div>
      {/* <Alert>
        Hello <span>World</span>
      </Alert> */}
      
      <BrowserRouter>
        <ParticleClass />
        <NavBar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path = '/Project1' element={<Project1/>}/>
          <Route path = '/Project2' element= {<Project2/>} />
        </Routes>
      </BrowserRouter>
      
      {/* <ListGroup items = {items} heading="Projects" /> */}
    </div>
  )
}

export default App;