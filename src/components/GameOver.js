import React, {useContext} from 'react'
import Board from './Board'
import { WinnerContext } from '../contexts/winnerContext'
import { GameOptionsContext } from '../contexts/gameOptionsContext'
import { useNavigate } from 'react-router-dom'

const GameOver = () => {
    const { winner, setWinner } = useContext(WinnerContext)
    const { setBoard, setPlayers } = useContext(GameOptionsContext)
    let navigate = useNavigate()

    const startNewGame = () => {
        setPlayers(null)
        setBoard(null)
        setWinner(null)
        localStorage.removeItem('players')
        localStorage.removeItem('board')
        navigate('/')
      }

  return (
    <div>
      <h1>Game Over</h1>
      <Board updateBoard={() => {}} />
      <h2>Result: </h2>
      {winner === 'tie' ? (
        <p>Tie game</p>
      ) : (
        <div>
          <p>Winner: {winner.name}</p>
          <p>
            Game size: {winner.size} X {winner.size}
          </p>
          <p>Number of moves: {winner.moves}</p>
        </div>
      )}
      <button onClick={startNewGame}>New Game</button>
    </div>
  )
}

export default GameOver
