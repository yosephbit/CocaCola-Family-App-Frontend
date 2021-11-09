import React from 'react'
import { Link } from 'react-router-dom'
import flower from '../assets/img/flower.png'
import flame1 from '../assets/img/flame-1.png'
import flame2 from '../assets/img/flame-2.png'

function WelcomePage() {
    return (
        <div className="page welcome fl-col just-center align-center">
            <img src="" alt="" className="main-img" />
            <Link to="/login" className="img-btn fl-row just-center align-center">
                Start now
            </Link>
            <img src={flower} alt="" className="floating-img floating-img--1" />
            <img src={flower} alt="" className="floating-img floating-img--2" />
            <img src={flower} alt="" className="floating-img floating-img--3" />
            <img src={flower} alt="" className="floating-img floating-img--4" />
            <img src={flower} alt="" className="floating-img floating-img--5" />
            <img src={flower} alt="" className="floating-img floating-img--6" />
            <img src={flame1} alt="" className="floating-img floating-img--7" />
            <img src={flame2} alt="" className="floating-img floating-img--8" />

        </div>
    )
}

export default WelcomePage
