import React from 'react'

const Players = ({players}) => {
    return (
        <div>
            <p>{players.xPlayer}: X</p>
            <p>{players.oPlayer}: O</p>
        </div>
    )
}

export default Players
