import React, { useState } from 'react'
import Board from './Board'

const Game = () => {
  const size = 9
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(
    Array.from(Array(size), () => new Array(size).fill(null))
  )
  const [winner, setWinner] = useState(false)

  const updateSquares = (x, y) => {
    if (winner || squares[x][y]) return
    const updatedSquares = squares.slice()
    updatedSquares[x][y] = xIsNext ? 'X' : 'O'
    setSquares(updatedSquares)
    setXIsNext(!xIsNext)
    const hasWinner = calculateWinner(x, y)
    if (hasWinner) {
      setWinner(hasWinner)
    }
  }

  const calculateWinner = (x, y) => {
    const row = squares[x]
    const isWinningRow = isWinningLine(row)
    if (isWinningRow) return isWinningRow

    const column = squares.map(row => row[y])
    const isWinningColumn = isWinningLine(column)
    if (isWinningColumn) return isWinningColumn

    let diagonal = []
    for (let i = 0; i < squares.length; i++) {
      let diff = i - (x - y)
      if (diff >= 0 && diff < squares.length) {
        diagonal.push(squares[i][diff])
      }
    }
    const isWinningDiagonal = isWinningLine(diagonal)
    if (isWinningDiagonal) return isWinningDiagonal

    let antiDiagonal = []
    for (let i = 0; i < squares.length; i++) {
      let diff = (x + y) - i
      if (diff >= 0 && diff < squares.length) {
        antiDiagonal.push(squares[i][diff])
      }
    }
    const isWinningAntiDiagonal = isWinningLine(antiDiagonal)
    if (isWinningAntiDiagonal) return isWinningAntiDiagonal

    return false
  }

  const isWinningLine = line => {
    let counter = 0
    for (let cell of line) {
      if (cell === 'X') {
        if (counter >= 0) {
          counter++
        } else {
          counter = 0
        }
      } else if (cell === 'O') {
        if (counter <= 0) {
          counter--
        } else {
          counter = 0
        }
      } else {
        counter = 0
      }
      const hasWinner = counter === 3 ? 'X' : counter === -3 ? 'O' : false
      if (hasWinner) {
        return hasWinner
      }
    }
    return false
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={squares} updateSquares={updateSquares}/>
      </div>
      <div className='game-info'>
        {!winner ? (
          <div className='status'>Next player: {xIsNext ? 'X' : 'O'}</div>
        ) : (
          <div className='winner'>Winner: {winner}</div>
        )}
      </div>
    </div>
  )
}

export default Game
