import React, { useState, useEffect, useContext } from 'react'
import Board from '../components/Board'
import Players from '../components/Players'
import { useNavigate } from 'react-router-dom'
import { GameOptionsContext } from '../contexts/gameOptionsContext'

const Game = () => {
  const { board, setBoard, checkBoardState, players } =
    useContext(GameOptionsContext)
  const [xIsNext, setXIsNext] = useState(true)
  const [winner, setWinner] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {
    if (!board || !players) {
      navigate('/')
    }
  }, [])

  const updateBoard = (x, y) => {
    if (winner || board[x][y]) return
    const updatedSquares = board.slice()
    updatedSquares[x][y] = xIsNext ? 'X' : 'O'
    setBoard(updatedSquares)
    setXIsNext(!xIsNext)
    const hasWinner = checkBoardState(x, y)
    if (hasWinner) {
      setWinner(hasWinner)
    }
  }

  return (
    <div className='game'>
      <div className='game-board'>
        {board && <Board board={board} updateBoard={updateBoard} />}
      </div>
      <div className='game-info'>
        {!winner && players ? (
          <div className='status'>
            Next player: {xIsNext ? players.xPlayer : players.oPlayer}
            <Players players={players}/>
          </div>
        ) : (
          <div className='winner'>Winner: {winner}</div>
        )}
      </div>
    </div>
  )
}

export default Game
