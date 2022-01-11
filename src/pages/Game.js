import React, { useState, useEffect, useContext } from 'react'
import Board from '../components/Board'
import Players from '../components/Players'
import { useNavigate } from 'react-router-dom'
import { GameOptionsContext } from '../contexts/gameOptionsContext'
import { WinnerContext } from '../contexts/winnerContext'

const Game = () => {
  const { board, setBoard, checkBoardState, players } =
    useContext(GameOptionsContext)
  const { winner, setWinner } = useContext(WinnerContext)
  const [xIsNext, setXIsNext] = useState(true)
  let navigate = useNavigate()

  useEffect(() => {
    if (!board || !players) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (winner) {
      navigate('/score-boards')
    }
  }, [winner])

  const updateBoard = (x, y) => {
    if (winner || board[x][y]) return
    const updatedSquares = board.slice()
    updatedSquares[x][y] = xIsNext ? 'X' : 'O'
    setBoard(updatedSquares)
    const hasWinner = checkBoardState(x, y)
    if (hasWinner) {
      if (hasWinner === 'tie') {
        setWinner('tie')
      } else {
        const iconToSearch = xIsNext ? 'X' : 'O'
        const numberOfMovesByRow = board.map(row =>
          row.reduce((sum, cell) => (cell === iconToSearch ? sum + 1 : sum), 0)
        )
        const numberOfMoves = numberOfMovesByRow.reduce(
          (sum, row) => row + sum,
          0
        )
        setWinner({
          id: Date.now(),
          name: players[hasWinner.winner],
          size: board.length,
          moves: numberOfMoves
        })
      }
    }
    setXIsNext(!xIsNext)
  }

  return (
    <div className='game'>
      <div className='game-board'>
        {board && <Board updateBoard={updateBoard} />}
      </div>
      <div className='game-info'>
        {players && (
          <div className='status'>
            Next player: {xIsNext ? players.xPlayer : players.oPlayer}
            <Players players={players} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Game
