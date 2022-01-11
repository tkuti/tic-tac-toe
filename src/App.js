import './App.css'
import React from 'react'
import Game from './pages/Game'
import Start from './pages/Start'
import ScoreBoards from './pages/ScoreBoards'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { GameOptionsContextProvider } from './contexts/gameOptionsContext'
import { WinnerContextProvider } from './contexts/winnerContext'

function App() {
  return (
    <div className='App'>
      <HashRouter>
        <GameOptionsContextProvider>
          <WinnerContextProvider>
            <Routes>
              <Route path='/' element={<Start />} />
              <Route path='/game' element={<Game />} />
              <Route path='/score-boards' element={<ScoreBoards />} />
            </Routes>
          </WinnerContextProvider>
        </GameOptionsContextProvider>
      </HashRouter>
    </div>
  )
}

export default App
