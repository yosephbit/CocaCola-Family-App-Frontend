import React, { useEffect, useState } from 'react'
import banner from '../assets/img/banner-full.png'
import flower from '../assets/img/flower.png'
import flame1 from '../assets/img/flame-1.png'
import flame2 from '../assets/img/flame-2.png'
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useSearchParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { getInviteDetails } from '../_helpers/cloudFunctions'

function WelcomePage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [link, setLink] = useState(searchParams.get("invite"))
    const challengeLink = searchParams.get("challenge");
    const [name, setName] = useState('')

    useEffect(() => {
        if (link) {
            getInviteDetails(link)
                .then(res => {
                    setName(res.data?.from)
                })
                .catch(e => {
                    console.log(e)
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
                                    Test your knowledge
                                </Link>
                                <Link to={link ? `login?invite=${link}` : "login"} state={{ via: 'TOGETHER' }} className="img-btn img-btn--large fl-row just-center align-center">
                                    Play together now!
                                </Link>
                            </>
                        )
                    )
                    }
                </div>

            </div>
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
    )
}

export default WelcomePage
