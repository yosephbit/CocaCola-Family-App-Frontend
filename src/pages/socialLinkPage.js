import React from 'react'
import flower from '../assets/img/flower.png'
import link1 from '../assets/img/link-1.png'
import link2 from '../assets/img/link-2.png'
import flame1 from '../assets/img/flame-1.png'
import banner from '../assets/img/banner-full.png'
// import { useNavigate } from 'react-router-dom'

function SocialLinkPage() {
    // let navigate = useNavigate()

    return (
        <div className="page social fl-col align-center">
            <div className="img-container fl-col just-center align-center">
                <img src={banner} alt="" className="main-banner" />
            </div>
            <div className="link-container">
                <h2 className="social__header">SEND/SHARE THE LINK TO START!</h2>
                <div className="fl-row just-center">
                    <div onClick={tempRoute} className="link">
                        <img src={link1} alt="" className="link-img" />
                    </div>
                    <div onClick={tempRoute} className="link">
                        <img src={link2} alt="" className="link-img" />
                    </div>
                </div>
            </div>

            <img src={flower} alt="" className="floating-img floating-img--1" />
            <img src={flower} alt="" className="floating-img floating-img--2" />
            <img src={flower} alt="" className="floating-img floating-img--3" />
            <img src={flower} alt="" className="floating-img floating-img--4" />
            <img src={flower} alt="" className="floating-img floating-img--5" />
            <img src={flame1} alt="" className="floating-img floating-img--6" />
        </div>
    )

    function tempRoute() {
        // navigate("/links")
    }
}

export default SocialLinkPage
