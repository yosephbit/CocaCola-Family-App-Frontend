import React, { useEffect, useState } from 'react'
import banner from '../assets/img/banner-full.png'
import flower from '../assets/img/flower.png'
import flame1 from '../assets/img/flame-1.png'
import flame2 from '../assets/img/flame-2.png'
import grandpa from '../assets/img/tiger-1.png'
import grandma from '../assets/img/tiger-2.png'
import father from '../assets/img/tiger-3.png'
import mother from '../assets/img/tiger-4.png'
import sister from '../assets/img/tiger-5.png'
import brother from '../assets/img/tiger-6.png'
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useSearchParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { getInviteDetails } from '../_helpers/cloudFunctions'
import Loader from "react-loader-spinner";
import Popup from 'reactjs-popup';
import { ParticipationPage, ShareToWinPage } from '.'

function WelcomePage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [link, setLink] = useState(searchParams.get("invite"))
    const challengeLink = searchParams.get("challenge");
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(!!link)

    useEffect(() => {
        if (link) {
            getInviteDetails(link)
                .then(res => {
                    setName(res.data?.from)
                    setLoading(false)
                })
                .catch(e => {
                    console.log(e)
                    setLoading(false)
                    setLink("")
                    toast("Invitation link is not valid", {
                        position: "bottom-center",
                        autoClose: 3500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        onClose: () => {
                            navigate(pathname)
                        }
                    });
                })
        }

        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="page welcome fl-col just-center align-center">
                <div className="container fl-col just-center align-center">
                    <img src={banner} alt="" className="main-banner" />
                    {link && (
                        <>
                            <p className="welcome__text">
                                Welcome and Gong Xi Fa Cai! Your loved one {name} wants to play the Family
                                Reunion Trivia Challenge with you.
                            </p>
                            <p className="welcome__text">
                                Please answer the trivia for your loved one to play.
                            </p>
                        </>
                    )}
                    <div className="fl-col">
                        {challengeLink ? (

                            <Link to={challengeLink ? `login?challenge=${challengeLink}` : "login"} state={{ via: 'CHALLENGE', challengeId: challengeLink }} className="img-btn img-btn--large fl-row just-center align-center">
                                Start now
                            </Link>) : (

                            link ? (
                                <Link to={link ? `login?invite=${link}` : "login"} state={{ via: 'LINK', linkId: link }} className="img-btn fl-row just-center align-center">
                                    Start now
                                </Link>
                            ) : (
                                <>
                                    <Link to={link ? `login?invite=${link}` : "login"} state={{ via: 'NORMAL' }} className="img-btn img-btn--large fl-row just-center align-center">
                                        Get challenged
                                    </Link>
                                    <Link to={link ? `login?invite=${link}` : "login"} state={{ via: 'TOGETHER' }} className="img-btn img-btn--large fl-row just-center align-center">
                                        Play together now!
                                    </Link>
                                </>
                            )
                        )
                        }
                    </div>
                    <div className="temp-imgs">
                        <img src={grandpa} alt="" className="tiger__img" />
                        <img src={grandma} alt="" className="tiger__img" />
                        <img src={father} alt="" className="tiger__img" />
                        <img src={mother} alt="" className="tiger__img" />
                        <img src={sister} alt="" className="tiger__img" />
                        <img src={brother} alt="" className="tiger__img" />
                    </div>
                </div>
                <Popup open={loading} className="login-popup" closeOnDocumentClick={false} onClose={() => setLoading(false)}>
                    <div className="modal">
                        <Loader
                            type="TailSpin"
                            color="#FEFEFE"
                            height={40}
                            width={40}
                        />
                        <span className="modal__text">Loading</span>
                    </div>
                </Popup>
                <ToastContainer autoClose={4500} theme="dark" transition={Slide} />
                {/* <img src={flower} alt="" className="floating-img floating-img--1" /> */}
                <img src={flower} alt="" className="floating-img floating-img--2" />
                {/* <img src={flower} alt="" className="floating-img floating-img--3" /> */}
                <img src={flower} alt="" className="floating-img floating-img--4" />
                <img src={flower} alt="" className="floating-img floating-img--5" />
                <img src={flower} alt="" className="floating-img floating-img--6" />
                <img src={flame1} alt="" className="floating-img floating-img--7" />
                <img src={flame2} alt="" className="floating-img floating-img--8" />

            </div>
            <ParticipationPage />
            <ShareToWinPage />
        </>
    )
}

export default WelcomePage
