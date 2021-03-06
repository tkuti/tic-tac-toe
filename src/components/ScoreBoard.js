import React, { useContext } from 'react'
import { WinnerContext } from '../contexts/winnerContext'

const ScoreBoard = ({ type, size }) => {
  const { winner, scores } = useContext(WinnerContext)

  const renderTableRow = () => {
    let list
    if (type === 'Winnings') {
      list = [...scores.winnersScores].filter(score => score.size === size)
      list.sort((a, b) => b.winnings - a.winnings)
    } else {
      list = [...scores.movesScores].filter(score => score.size === size)
      list.sort((a, b) => a.moves - b.moves)
    }
    return list.map((row, index) => (
      <tr
        key={index}
        className={
          (type === 'Winnings' && row.name === winner.name) ||
          (type === 'Moves' && row.id === winner.id)
            ? 'highlighted'
            : ''
        }
      >
        <td>{index + 1}</td>
        <td>{row.name}</td>
        <td>
          {row.size} X {row.size}
        </td>
        <td>{type === 'Winnings' ? row.winnings : row.moves}</td>
      </tr>
    ))
  }

  return (
    <div className='scoreboard'>
      <h3>{type} Scoreboard</h3>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Size</th>
              <th>{type}</th>
            </tr>
          </thead>
          <tbody>{renderTableRow()}</tbody>
        </table>
      </div>
    </div>
  )
}

export default ScoreBoard
