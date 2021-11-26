import React from 'react'
import flower from '../assets/img/flower.png'
import bottle from '../assets/img/bottle.png'
import cork from '../assets/img/cork.png'
import flame1 from '../assets/img/flame-1.png'
import { useNavigate } from 'react-router-dom'

function GameStartOverlay(props) {
    let navigate = useNavigate();
    return (
        <div className="main-overlay ">
            <h2 className="header">
                <p>Please tilt your head</p>
                <p>Left or Right to answer.</p>
            </h2>
            <div className="btn-group">
                <button onClick={() => onClickHandler('BACK')} className="img-btn img-btn--fixed">
                    <span style={{fontSize: 'larger'}} className="img-btn__text">
                        Back
                    </span>
                </button>
                <button onClick={() => onClickHandler('START')} className="img-btn img-btn--fixed">
                    <span style={{fontSize: 'larger'}} className="img-btn__text">
                        Start
                    </span>
                </button>
            </div>
            <img src={flower} alt="" className="floating-img floating-img--1" />
            <img src={flower} alt="" className="floating-img floating-img--2" />
            <img src={flower} alt="" className="floating-img floating-img--3" />
            <img src={flame1} alt="" className="floating-img floating-img--4" />
            <img src={bottle} alt="" className="floating-img floating-img--5" />
            <img src={flower} alt="" className="floating-img floating-img--6" />
            <img src={cork} alt="" className="floating-img floating-img--7" />
        </div>
    )

    function onClickHandler(btn) {
        if(btn === "BACK") {
            navigate("/players")
        } else if(btn === "START") {
            props.startGame()
        }
    }
}

export default GameStartOverlay
