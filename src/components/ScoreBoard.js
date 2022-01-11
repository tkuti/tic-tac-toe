import React, {useState, useEffect, useContext} from 'react'
import { WinnerContext } from '../contexts/winnerContext'

const ScoreBoard = ({type}) => {
    const { winner, scores } = useContext(WinnerContext)
    const [scoreBoardList, setScoreBoardList] = useState(null)

    useEffect(() => {

    }, [])

    return (
        <div>
            <h2>Winner Score Board</h2>

        </div>
    )
}

export default ScoreBoard
