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

  return (
    <WinnerContext.Provider value={{ winner, setWinner, scores, setScores }}>
      {props.children}
    </WinnerContext.Provider>
  )
}
