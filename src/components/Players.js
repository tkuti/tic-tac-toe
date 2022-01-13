import React from 'react'
import xPic from '../images/x.png'
import oPic from '../images/o.png'

const Players = ({ players }) => {
  return (
    <div className='players'>
      <div className='player'>
        <span>{players.xPlayer}:  </span>
        <img className='players-icon' src={xPic} alt='players-icon' />
      </div>
      <div className='player'>
        <span>{players.oPlayer}:  </span>
        <img className='players-icon' src={oPic} alt='players-icon' />
      </div>
    </div>
  )
}

export default Players
