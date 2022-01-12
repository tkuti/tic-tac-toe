import React, { useContext, useEffect, useState } from 'react'
import { WinnerContext } from '../contexts/winnerContext'
import { GameOptionsContext } from '../contexts/gameOptionsContext'
import GameOver from '../components/GameOver'
import ScoreBoard from '../components/ScoreBoard'


const ScoreBoards = () => {
  const { winner, scores, setScores } = useContext(WinnerContext)
  const { board } = useContext(GameOptionsContext)
  const [boardSize, setBoardSize] = useState(board.length)


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
      <GameOver />
      <h2>Scoreboards: </h2>
      <div className='boardsize-select'>
        <select
          name='boardSize'
          id='boardSize'
          defaultValue={boardSize}
          onChange={e => setBoardSize(Number(e.target.value))}
        >
          <option value='3'>3X3</option>
          <option value='4'>4X4</option>
          <option value='5'>5X5</option>
          <option value='6'>6X6</option>
          <option value='7'>7X7</option>
          <option value='8'>8X8</option>
          <option value='9'>9X9</option>
        </select>
      </div>
      <div className='scoreboards-table'>
        <ScoreBoard type='Winnings' size={boardSize} />
        <ScoreBoard type='Moves' size={boardSize} />
      </div>
    </div>
  )
}

export default ScoreBoards
