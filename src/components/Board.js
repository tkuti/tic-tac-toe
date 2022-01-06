import React from 'react'
import Square from './Square'

const Board = ({board, updateBoard}) => {
  
  const renderSquare = (x, y) => {
    return (
      <Square
        key={x + y}
        value={board[x][y]}
        updateSquare={() => updateBoard(x, y)}
      />
    )
  }

  return (
    <div>
      {board.map((row, indexRow) => (
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
