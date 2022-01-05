import './App.css'
import React from 'react'
import Game from './components/Game'
import Start from './components/Start'
import { HashRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className='App'>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Start />}/>
          <Route path="/game" element={<Game />}/>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
