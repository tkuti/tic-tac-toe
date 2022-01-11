import React, {useContext, useEffect} from 'react'
import { WinnerContext } from '../contexts/winnerContext'
import { GameOptionsContext } from '../contexts/gameOptionsContext'
import Board from '../components/Board'
import ScoreBoard from '../components/ScoreBoard'
import { useNavigate } from 'react-router-dom'

const ScoreBoards = () => {
    const { winner, scores, setScores } = useContext(WinnerContext)
    const { setBoard, setPlayers } = useContext(GameOptionsContext)
    let navigate = useNavigate()

    const startNewGame = () => {
        setPlayers(null)
        setBoard(null)
        localStorage.removeItem("players")
        localStorage.removeItem("board")
        navigate('/')
    }

    useEffect(() => {
        if (winner !== 'tie') {
           const newScores = [...scores]
           newScores.push(winner)
            setScores(newScores)
        }
    }, [])

    return (
        <div>
            <h1>Game Over</h1>
            <Board updateBoard={() => {}}/>
            <h2>result: </h2>
            {
                winner === 'tie' 
                ? <p>Tie game</p>
                : <div>
                    <p>Winner: {winner.name}</p>
                     <p>Game size: {winner.size}*{winner.size}</p>
                     <p>Number of moves: {winner.moves}</p>   
                </div>
            }
            <button onClick={startNewGame}>New Game</button>
            <ScoreBoard type="winners"/>
        </div>
    )
}

export default ScoreBoards
