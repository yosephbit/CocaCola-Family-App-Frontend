import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import { Acknowledge, CameraComponent, GameStartOverlay, QuestionOverlay } from '../components'

function GamePlayPage() {
    const [gameStared, setGameStared] = useState(false)
    return (
        <>
            <CameraComponent />
            {
                gameStared ? <QuestionOverlay /> : <GameStartOverlay startGame={startGame} />
            }
            
            {/* <Popup lockScroll={true} open={true} className="ackno-popup" closeOnDocumentClick>
                <Acknowledge />
            </Popup> */}
        </>
    )

    function startGame() {
        setGameStared(true);
    }
}

export default GamePlayPage