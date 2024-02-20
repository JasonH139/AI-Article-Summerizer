import React from 'react'
import Header from './components/header'
import Summerize from './components/summerize'
import './App.css'

const App = () => {
  return (
    <main id="main">
      <div className='app'>
        <Header/>
        <Summerize/>
      </div>
    </main>
  )
}

export default App