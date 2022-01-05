import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Start = () => {
  const [gameOptions, setGameOptions] = useState({
    player1: '',
    player2: '',
    boardSize: '3',
    xPlayer: ''
  })
  const [firstPlayer, setFirstPlayer] = useState(null)
  let navigate = useNavigate();

  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    setGameOptions({ ...gameOptions, [name]: value })
  }

  const startGame = () => {
      const startPlayer = gameOptions.player2
      const finalGameOptions = {...gameOptions, xPlayer: startPlayer}
      localStorage.setItem("gameOptions", JSON.stringify(finalGameOptions))
      setGameOptions(finalGameOptions)
      setFirstPlayer(startPlayer)
      setTimeout(() => {
        navigate("/game")
      }, 3000)
  }

  return (
    <div>
      <div className='start-screen'>
          {
              firstPlayer &&
              <div className="first-player">
                  First player is: <span>{firstPlayer}</span>
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
          <label htmlFor='board-size-select'></label>
          <select
            name='boardSize'
            id='board-size-select'
            onChange={handleChange}
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
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  )
}

export default Start
