import React, { useContext, useState } from 'react'
import { GameOptionsContext } from '../contexts/gameOptionsContext'
import GameOver from '../components/GameOver'
import ScoreBoard from '../components/ScoreBoard'

const ScoreBoards = () => {
  const { board } = useContext(GameOptionsContext)
  const [boardSize, setBoardSize] = useState(board.length)


  return (
    <div className='scoreboards-screen'>
      <div className='scoreboards'>
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
        <div className='scoreboards-tables'>
          <ScoreBoard type='Winnings' size={boardSize} />
          <ScoreBoard type='Moves' size={boardSize} />
        </div>
      </div>
    </div>
  )
}

export default ScoreBoards
