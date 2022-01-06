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
    localStorage.setItem('board', JSON.stringify(board))
  }, [board])


  const checkBoardState = (x, y) => {
    const row = board[x]
    const isWinningRow = isWinningLine(row)
    if (isWinningRow) return isWinningRow

    const column = board.map(row => row[y])
    const isWinningColumn = isWinningLine(column)
    if (isWinningColumn) return isWinningColumn

    let diagonal = []
    for (let i = 0; i < board.length; i++) {
      let diff = i - (x - y)
      if (diff >= 0 && diff < board.length) {
        diagonal.push(board[i][diff])
      }
    }
    const isWinningDiagonal = isWinningLine(diagonal)
    if (isWinningDiagonal) return isWinningDiagonal

    let antiDiagonal = []
    for (let i = 0; i < board.length; i++) {
      let diff = x + y - i
      if (diff >= 0 && diff < board.length) {
        antiDiagonal.push(board[i][diff])
      }
    }
    const isWinningAntiDiagonal = isWinningLine(antiDiagonal)
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
