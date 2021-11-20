import React, { useState } from 'react'
import { CameraComponent, GameStartOverlay, QuestionOverlay } from '../components'

function GamePlayPage() {
    const [gameStared, setGameStared] = useState(false)
    return (
        <>
            <CameraComponent />
            {
                gameStared ? <QuestionOverlay /> : <GameStartOverlay startGame={startGame} />
            }
        </>
    )

    function startGame() {
        setGameStared(true);
    }
}

export default GamePlayPage