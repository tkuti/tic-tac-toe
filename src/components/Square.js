import React from 'react'
import xPic from '../images/x.png'
import oPic from '../images/o.png'

const Square = ({value, updateSquare}) => {

  return (
    <div className='square' onClick={updateSquare}>
      {
        value && <img src={value === 'X' ? xPic : oPic} alt="" />
      } 
    </div>
  )
}

export default Square
