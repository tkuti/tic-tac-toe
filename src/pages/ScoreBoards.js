import React, { useContext, useEffect, useState } from 'react'
import { WinnerContext } from '../contexts/winnerContext'
import { GameOptionsContext } from '../contexts/gameOptionsContext'
import Board from '../components/Board'
import ScoreBoard from '../components/ScoreBoard'
import { useNavigate } from 'react-router-dom'

const ScoreBoards = () => {
  const { winner, setWinner, scores, setScores } = useContext(WinnerContext)
  const { board, setBoard, setPlayers } = useContext(GameOptionsContext)
  const [boardSize, setBoardSize] = useState(board.length)
  let navigate = useNavigate()

  const startNewGame = () => {
    setPlayers(null)
    setBoard(null)
    setWinner(null)
    localStorage.removeItem('players')
    localStorage.removeItem('board')
    navigate('/')
  }

  useEffect(() => {
    if (winner !== 'tie') {
      saveScores()
    }
  }, [])

  const saveScores = () => {
    let newWinnersScores
    const isWinnerExist = scores.winnersScores.find(
      score => score.name === winner.name && score.size === winner.size
    )
    if (isWinnerExist) {
      const winnersScores = scores.winnersScores.map(score =>
        score.name === winner.name && score.size === winner.size
          ? { ...score, winnings: score.winnings + 1 }
          : score
      )
      newWinnersScores = [...winnersScores]
    } else {
      const winnersScores = [...scores.winnersScores]
      winnersScores.push({
        name: winner.name,
        size: winner.size,
        winnings: 1
      })
      newWinnersScores = [...winnersScores]
    }
    const newMovesScores = [...scores.movesScores]
    newMovesScores.push(winner)

    setScores({
      winnersScores: newWinnersScores,
      movesScores: newMovesScores
    })
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
            Game size: {winner.size}*{winner.size}
          </p>
          <p>Number of moves: {winner.moves}</p>
        </div>
      )}
      <button onClick={startNewGame}>New Game</button>
      <h2>Scoreboards: </h2>
      <div className="boardsize-select">
        <select name="boardSize" id="boardSize" defaultValue={boardSize}
        onChange={(e) => setBoardSize(Number(e.target.value))}>
            <option value="3">3*3</option>
            <option value="4">4*4</option>
            <option value="5">5*5</option>
            <option value="6">6*6</option>
            <option value="7">7*7</option>
            <option value="8">8*8</option>
            <option value="9">9*9</option>
        </select>
      </div>
      <div className='scoreboards-table'>
        <ScoreBoard type='Winnings' size={boardSize}/>
        <ScoreBoard type='Moves' size={boardSize}/>
      </div>
    </div>
  )
}

export default ScoreBoards
