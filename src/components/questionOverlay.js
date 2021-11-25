import React from 'react'
import flower from '../assets/img/flower.png'
import bottle from '../assets/img/bottle.png'
import cork from '../assets/img/cork.png'
import flame1 from '../assets/img/flame-1.png'

function QuestionOverlay() {
    return (
        <div className="main-overlay ">
            <h2 className="question">What was her first pet's name?</h2>
            <div className="btn-group">
                <button className="img-btn">
                <span className="img-btn__text">
                        Greg
                    </span>
                </button>
                <button className="img-btn">
                    <span className="img-btn__text">
                        Coco
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
}

export default QuestionOverlay
