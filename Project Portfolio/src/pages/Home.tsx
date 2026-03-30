import React from 'react'
import "./Home.css"

function Home() {
  return (
      <div>
        <div className='content-container'> 
          About Me
          <p>
            I am a software developer with a passion for creating innovative solutions.
            I have experience in full-stack development, working with technologies such as React, Node.js, and Python.
            In my free time, I enjoy contributing to open-source projects and exploring new technologies. 
            Feel free to take a look around my portfolio to see some of the projects I've worked on! 
            I look forward to connecting with you.
          </p>
        </div>

        <div className='content-container'> 
          Skills
          <p>
            I have experience in a variety of programming languages and frameworks, including:
            <ul>
              <li>TypeScript (React, Node.js)</li>
              <li>Python</li>
              <li>SQL</li>
            </ul>
          </p>
          <p>
            I am currrently learning about machine learning and data science, and I am excited to apply these skills to future projects.
            Somethings that I am interested in exploring includes anomaly detection in time series data, natural language processing, and computer vision.   
          </p>

        </div>

        <div className='content-container'> 
          History
          <p>
            I am a software developer with a passion for creating innovative solutions.
            I have experience in full-stack development, working with technologies such as React, Node.js, and Python.
            In my free time, I enjoy contributing to open-source projects and exploring new technologies. 
            Feel free to take a look around my portfolio to see some of the projects I've worked on! 
            I look forward to connecting with you.
          </p>
        </div>
      </div>
    
  )
}

export default Home