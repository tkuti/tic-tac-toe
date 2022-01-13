import React from 'react'
import xPic from '../images/x.png'
import oPic from '../images/o.png'

const Square = ({value, updateSquare, size}) => {

  return (
    <div className={`square ${size}`} onClick={updateSquare}>
      {
        value && <img src={value === 'X' ? xPic : oPic} alt="" />
      } 
    </div>
  )
}

export default Square
