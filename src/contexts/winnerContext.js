import React, { createContext, useState, useEffect } from 'react'

export const WinnerContext = createContext()

export const WinnerContextProvider = props => {
  const [winner, setWinner] = useState(null)
  const [scores, setScores] = useState(JSON.parse(localStorage.getItem("scores")) || {
    winnersScores: [], movesScores: []
  })
 
    useEffect(() => {
      localStorage.setItem('scores', JSON.stringify(scores))
    }, [scores])

  return (
    <WinnerContext.Provider
      value={{ winner, setWinner, scores, setScores }}
    >
      {props.children}
    </WinnerContext.Provider>
  )
}
