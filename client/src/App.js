import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header/>
        <hr />
        <MainPages />
      </div>
    </Router>
  )
}

export default App
