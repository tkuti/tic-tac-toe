import React, { createContext, useState, useEffect } from 'react'

export const WinnerContext = createContext()

export const WinnerContextProvider = props => {
  const [winner, setWinner] = useState(JSON.parse(localStorage.getItem('winner')) || null)
  const [scores, setScores] = useState(
    JSON.parse(localStorage.getItem('scores')) || {
      winnersScores: [],
      movesScores: []
    }
  )

  useEffect(() => {
    localStorage.setItem('winner', JSON.stringify(winner))
  }, [winner])
  
  useEffect(() => {
    localStorage.setItem('scores', JSON.stringify(scores))
  }, [scores])
  

  const saveScores = () => {
    let newWinnersScores
    const isWinnerExist = scores.winnersScores.find(
      score => score.name === winner.name && score.size === winner.size
    )
    if (isWinnerExist) {
      const winnersScores = scores.winnersScores.map(score =>
        score.name === winner.name && score.size === winner.size
          ? { ...score, winnings: score.winnings + 1 }
          : score
      )
      newWinnersScores = [...winnersScores]
    } else {
      const winnersScores = [...scores.winnersScores]
      winnersScores.push({
        name: winner.name,
        size: winner.size,
        winnings: 1
      })
      newWinnersScores = [...winnersScores]
    }
    const newMovesScores = [...scores.movesScores, winner]

    setScores({
      winnersScores: newWinnersScores,
      movesScores: newMovesScores
    })
  }

  return (
    <WinnerContext.Provider value={{ winner, setWinner, scores, saveScores }}>
      {props.children}
    </WinnerContext.Provider>
  )
}
