import React from 'react'
import banner from '../assets/img/banner-full.png'
import flower from '../assets/img/flower.png'
import flame1 from '../assets/img/flame-1.png'
import flame2 from '../assets/img/flame-2.png'
import { useSearchParams, Link } from 'react-router-dom'

function WelcomePage() {
    const [searchParams] = useSearchParams()
    const link = searchParams.get("invite")
    
    return (
        <div className="page welcome fl-col just-center align-center">
            <div className="container fl-col just-center align-center">
                <img src={banner} alt="" className="main-banner" />
                {link && (
                    <>
                    <p className="welcome__text">
                        Welcome and Gong Xi Fa Cai! Your loved one XXX wants to play the Family
                        Reunion Trivia Challenge with you.
                    </p>
                    <p className="welcome__text">
                        Please answer the trivia for your loved one to play.
                    </p>
                    </>
                )}

                <Link to="/login" className="img-btn fl-row just-center align-center">
                    Start now
                </Link>
            </div>
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

    // function toggleFullScreenAndNavigate() {
    //     var doc = window.document;
    //     var docEl = doc.documentElement;
      
    //     var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    //     var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
      
    //     if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    //       requestFullScreen.call(docEl);
    //     }
    //     else {
    //       cancelFullScreen.call(doc);
    //     }
    //     navigate("/login")
    // }
}

export default WelcomePage
