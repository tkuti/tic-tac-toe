import React, { useState } from 'react'
import Square from './Square'

const Board = () => {
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))

  const updateSquares = (i) => {
    const updatedSquares = squares.slice()
    updatedSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(updatedSquares)
    setXIsNext(!xIsNext)
  }

  const renderSquare = i => {
    return <Square value={squares[i]} updateSquare={() => updateSquares(i)} />
  }

  return (
    <div>
      <div className='status'>Next player: {xIsNext ? 'X' : 'O'}</div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

export default Board
