import React, { useContext } from 'react'
import { WinnerContext } from '../contexts/winnerContext'

const ScoreBoard = ({ type }) => {
  const { winner, scores } = useContext(WinnerContext)

  const renderTableRow = () => {
    let list
    if (type === 'Winnings') {
      list = [...scores.winnersScores]
      list.sort((a, b) => b.winnings - a.winnings)
    } else {
      list = [...scores.movesScores]
      list.sort((a, b) => a.moves - b.moves)
    }
    return list.map((row, index) => (
      <tr key={index} className={
          (type === "Winnings" && row.name === winner.name) || 
          (type === "Moves" && row.id === winner.id)
          ? "highlighted"
          : ""
      }>
        <td>{index + 1}</td>
        <td>{row.name}</td>
        <td>{row.size} * {row.size}</td>
        <td>{type === 'Winnings' ? row.winnings : row.moves}</td>
      </tr>
    ))
  }

  return (
    <div>
      <h2>{type} Score Board</h2>
      <table>
        <thead>
          <tr>
            <th>Nr</th>
            <th>Name</th>
            <th>Size</th>
            <th>{type}</th>
          </tr>
        </thead>
        <tbody>{renderTableRow()}</tbody>
      </table>
    </div>
  )
}

export default ScoreBoard
