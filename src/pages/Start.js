import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import {GameOptionsContext} from '../contexts/gameOptionsContext'
import Players from '../components/Players'

const Start = () => {
  const {players, setPlayers, setBoard} = useContext(GameOptionsContext)
  const [gameOptions, setGameOptions] = useState({
    player1: '',
    player2: '',
    boardSize: '3',
  })
  let navigate = useNavigate();


  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    setGameOptions({ ...gameOptions, [name]: value })
  }

  const startGame = () => {
      const playerNames = [gameOptions.player1, gameOptions.player2]
      playerNames.sort((a, b) => 0.5 - Math.random())
      const startPlayer = playerNames[0]
      const secondPlayer = playerNames[1]
      const players = {xPlayer: startPlayer, oPlayer: secondPlayer}
      localStorage.setItem("players", JSON.stringify(players))
      setPlayers(players)
      setBoard(
        Array.from(Array(Number(gameOptions.boardSize)), () =>
          new Array(Number(gameOptions.boardSize)).fill(null)
        )
      )
      setTimeout(() => {
        navigate("/game")
      }, 3000)
  }

  return (
    <div>
      <div className='start-screen'>
          {
              players &&
              <div className="first-player">
                  First player is: <span>{players.xPlayer}</span>
                  <Players players={players}/>
              </div>
          }
        <div className='players'>
          <input
            type='text'
            placeholder='Player1'
            name='player1'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Player2'
            name='player2'
            onChange={handleChange}
          />
        </div>
        <div className='board-size'>
          <label htmlFor='board-size-select'>Size: </label>
          <select
            name='boardSize'
            id='board-size-select'
            onChange={handleChange}
          >
            <option value='3'>3 X 3</option>
            <option value='4'>4 X 4</option>
            <option value='5'>5 X 5</option>
            <option value='6'>6 X 6</option>
            <option value='7'>7 X 7</option>
            <option value='8'>8 X 8</option>
            <option value='9'>9 X 9</option>
          </select>
        </div>
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  )
}

export default Start
