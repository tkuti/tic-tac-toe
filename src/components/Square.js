import React from 'react'

const Square = ({value, updateSquare}) => {

  return (
    <button className='square' onClick={updateSquare}>
      {value}
    </button>
  )
}

export default Square
