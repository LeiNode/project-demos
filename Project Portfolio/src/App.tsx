import { useState } from 'react'
import ListGroup from "./components/ListGroup"
import Alert from './components/Alert';

function App() {
  let items = ["Project 1", "Project 2", "Project 3", "Project 4", "Project 5"];

  return(
  <div>
      {/* <Alert>
        Hello <span>World</span>
      </Alert> */}
      <ListGroup items = {items} heading="Projects" /> 
    </div>
  )
}

export default App
