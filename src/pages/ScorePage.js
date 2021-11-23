import React from 'react'
import banner from '../assets/img/banner-full.png'
import flower from '../assets/img/flower.png'
import bottle from '../assets/img/bottle.png'
import cork from '../assets/img/cork.png'
import flame1 from '../assets/img/flame-1.png'
import { FaFacebook } from 'react-icons/fa'

function ScorePage() {
    return (
        <div className="page score">
            <h2 className="score__header">
                WE SCORED <span className="score__value">80%</span> IN
            </h2>
            <div className="score__body">
                <img src={banner} alt="" className="score__logo" />
                <img src={flower} alt="" className="floating-img floating-img--1" />
                
                <img src={flower} alt="" className="floating-img floating-img--2" />
                <img src={flower} alt="" className="floating-img floating-img--3" />
                <img src={flame1} alt="" className="floating-img floating-img--4" />
                <img src={bottle} alt="" className="floating-img floating-img--5" />
                <img src={flower} alt="" className="floating-img floating-img--6" />
                <img src={cork} alt="" className="floating-img floating-img--7" />
            </div>
            <div className="score__footer">
                <p>Your participation Code: 12345</p>
                <FaFacebook color="white" />
                <p>SHARE YOUR RESULTS NOW</p>
                <p>include hashtag #CokeReunionSG and your participation code (eg. #12345)</p>
                <p>Share the video and tell us who do you want to share a Coke with this CNY and why.</p>
                <p>Most creative entries will stand to win weekly prizes! Find out more at (Link).</p>
            </div>
        </div>
    )
}

export default ScorePage
