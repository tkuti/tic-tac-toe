import React, { createContext, useState, useEffect } from 'react'
import {isWinningLine} from '../helpers/checkState'

export const GameOptionsContext = createContext()

export const GameOptionsContextProvider = props => {
  const [players, setPlayers] = useState(
    () => JSON.parse(localStorage.getItem('players')) || null
  )
  const [board, setBoard] = useState(() => {
    const savedBoard = localStorage.getItem('board')
    if (savedBoard) {
      return JSON.parse(savedBoard)
    } else {
      return null
    }
  })

  useEffect(() => {
    if (board) localStorage.setItem('board', JSON.stringify(board))
  }, [board])


  const checkBoardState = (x, y) => {
    const size = board.length < 4 ? 3 : 4
    const row = board[x]
    const isWinningRow = isWinningLine(row, size)
    if (isWinningRow) return isWinningRow

    const column = board.map(row => row[y])
    const isWinningColumn = isWinningLine(column, size)
    if (isWinningColumn) return isWinningColumn

    let diagonal = []
    for (let i = 0; i < board.length; i++) {
      let diff = i - (x - y)
      if (diff >= 0 && diff < board.length) {
        diagonal.push(board[i][diff])
      }
    }
    const isWinningDiagonal = isWinningLine(diagonal, size)
    if (isWinningDiagonal) return isWinningDiagonal

    let antiDiagonal = []
    for (let i = 0; i < board.length; i++) {
      let diff = x + y - i
      if (diff >= 0 && diff < board.length) {
        antiDiagonal.push(board[i][diff])
      }
    }
    const isWinningAntiDiagonal = isWinningLine(antiDiagonal, size)
    if (isWinningAntiDiagonal) return isWinningAntiDiagonal

    const isBoardFull = board.every(row => row.every(cell => cell))
    if (isBoardFull) return 'tie'

    return false
  }

  return (
    <GameOptionsContext.Provider
      value={{ players, setPlayers, board, setBoard, checkBoardState }}
    >
      {props.children}
    </GameOptionsContext.Provider>
  )
}
