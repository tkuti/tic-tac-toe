import React from 'react'
import Square from './Square'

const Board = ({squares, updateSquares}) => {
  
  const renderSquare = (x, y) => {
    return (
      <Square
        key={x + y}
        value={squares[x][y]}
        updateSquare={() => updateSquares(x, y)}
      />
    )
  }

  return (
    <div>
      {squares.map((row, indexRow) => (
        <div className='board-row' key={indexRow}>
          {row.map((cell, indexColumn) =>
            renderSquare(indexRow, indexColumn)
          )}
        </div>
      ))}
    </div>
  )
}

export default Board
