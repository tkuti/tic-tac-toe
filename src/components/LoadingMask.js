import React from 'react'

const LoadingMask = () => {

    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p className="loading-text">Selecting first player...</p> 
        </div>
    )
}

export default LoadingMask
