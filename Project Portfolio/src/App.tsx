import NavBar from './components/NavBar';
import ParticleClass from "./components/ParticlesClass";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Connect from './pages/Connect';
import Resume from './pages/Resume';
import Project1 from './pages/Project1';
import NotFound from './pages/NotFound';
import { SHOW_NAVBAR } from './featureFlags';
import './App.css';

function App() {
  return(
    <BrowserRouter>
      <ParticleClass />
      {SHOW_NAVBAR && <NavBar />}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/projects/split-step' element={<Project1/>}/>
        <Route path='/connect' element={<Connect/>}/>
        <Route path='/resume' element={<Resume/>}/>
        {/* Old URL, kept so links shared before the rename still work */}
        <Route path='/Project1' element={<Navigate to='/projects/split-step' replace/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
