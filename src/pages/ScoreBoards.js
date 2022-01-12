import React, { useContext, useEffect } from 'react'
import { WinnerContext } from '../contexts/winnerContext'
import { GameOptionsContext } from '../contexts/gameOptionsContext'
import Board from '../components/Board'
import ScoreBoard from '../components/ScoreBoard'
import { useNavigate } from 'react-router-dom'

const ScoreBoards = () => {
  const { winner, setWinner, scores, setScores } = useContext(WinnerContext)
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
      <h2>result: </h2>
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
      <div className='scoreboards-table'>
        <ScoreBoard type='Winnings' />
        <ScoreBoard type='Moves' />
      </div>
    </div>
  )
}

export default ScoreBoards
