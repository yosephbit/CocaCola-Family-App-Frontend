import React from 'react'
import banner from '../assets/img/banner-full.png'
import cocacan from '../assets/img/coca-can.png'
import cocashade from '../assets/img/coca-shade.png'
import flower from '../assets/img/flower.png'
import split from '../assets/img/people.jpg'
import bottle from '../assets/img/bottle.png'
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
                <img src={split} alt="" className="score__img" />
                
                <img src={flower} alt="" className="floating-img floating-img--1" />
                <img src={bottle} alt="" className="floating-img floating-img--2" />
                <img src={flower} alt="" className="floating-img floating-img--3" />
                <img src={flower} alt="" className="floating-img floating-img--4" />
            </div>

            <div className="score__footer fl-col align-center">
                <p className="grad text large">Your Participation Code: 12345</p>
                <FaFacebook size={28} color="white" />
                <p className="grad text x-large">SHARE YOUR RESULTS NOW</p>
                <p className="text small">include hashtag #CokeReunionSG and your participation code (eg. #12345)</p>
                <p className="grad text med">Share the video and tell us who do you want to share a Coke with this CNY and why.</p>
                <p className="grad text med">Most creative entries will stand to win weekly prizes!</p>
                
                <div className="score__can-img">
                    <img src={cocacan} alt="" className="img" />
                    <img src={cocashade} alt="" className="shade" />
                    <img src={flame1} alt="" className="flame flame-1" />
                    <img src={flame1} alt="" className="flame flame-2" />
                    <div className="vouchers vouchers--1">
                        VOUCHERS
                        <img src={flower} alt="" className="flower flower--1" />
                        <img src={flower} alt="" className="flower flower--2" />
                    </div>
                    <div className="vouchers vouchers--2">
                        VOUCHERS
                        <img src={flower} alt="" className="flower flower--1" />
                        <img src={flower} alt="" className="flower flower--2" />
                    </div>
                    <div className="advert advert--1">
                        <p className="inner-text">Week 2 (17-23 Jan 2022)</p>
                        <p className="inner-text">x50 Coca-Cola Hamper</p>
                    </div>
                    <div className="advert advert--2">
                        <p className="inner-text">Week 1 (10 -16 Jan 2021)</p>
                        <p className="inner-text">x50 1-year supply of Coca-Cola</p>
                    </div>
                    <div className="advert advert--3">
                        <p className="inner-text">Week 4 (31-6 Feb 2022)</p>
                        <p className="inner-text">x20 Reunion Dinner Vouchers</p>
                    </div>
                    <div className="advert advert--4">
                        <p className="inner-text">Week 3 (24 -30 Jan 2022)</p>
                        <p className="inner-text">x50 Yu Sheng Vouchers</p>
                    </div>
                </div>
                <p className="grad text med">Find out more at (Link).</p>
                
                <img src={flame1} alt="" className="floating-img floating-img--5" />
                <img src={flower} alt="" className="floating-img floating-img--6" />
            </div>
        </div>
    )
}

export default ScorePage
