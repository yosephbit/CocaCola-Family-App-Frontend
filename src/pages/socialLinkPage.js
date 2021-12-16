import React, { useEffect, useState } from 'react'
import flower from '../assets/img/flower.png'
import link1 from '../assets/img/link-1.png'
import link2 from '../assets/img/link-2.png'
import flame1 from '../assets/img/flame-1.png'
import banner from '../assets/img/banner-full.png'
import { ToastContainer, toast } from 'react-toastify';
import Loader from "react-loader-spinner";
import Popup from 'reactjs-popup';
import { useLocation, useNavigate } from 'react-router-dom'
// import * as TinyURL from 'tinyurl';

function SocialLinkPage() {
    let navigate = useNavigate()
    let { state } = useLocation()

    const [link, setLink] = useState(state?.link)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!link) {
            navigate(`/players`)
        } else {
            setLink(link)
            // TinyURL.shorten(link).then((res) => {
            //     if(res === 'Error') {
            //         setLink(link)
            //         setLoading(false)
            //     } else {
            //         setLink(res);
            //         setLoading(false)
            //     }
            // }, () => {
            //     setLink(link)
            //     setLoading(false)
            // })
            // .catch(e => {
            //     setLink(link)
            //     setLoading(false)
            // })
        }
        // eslint-disable-next-line
    }, [])

    let linkText = `Gong Xi Fa Chai! Your loved one wants to play the Coca-cola Family Reunion Trivia Challenge with you. Please click this link to participate ${link}`
    return (
        <div className="page social fl-col align-center">
            <div className="img-container fl-col just-center align-center">
                <img src={banner} alt="" className="main-banner" />
            </div>
            <div className="link-container">
                <h2 className="social__header">SEND/SHARE THE LINK TO START!</h2>
                <div className="fl-row just-center">
                    <div onClick={() => copyLinkToClipboard(link)} className="link">
                        <img src={link1} alt="" className="link-img" />
                    </div>
                    <a href={`whatsapp://send?text=${linkText}`} data-action="share/whatsapp/share" target="_blank"
                        rel="noreferrer" className="link">
                        <img src={link2} alt="" className="link-img" />
                    </a>
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
                    <span className="modal__text">Creating link</span>
                </div>
            </Popup>
            <ToastContainer theme="dark" />

            <img src={flower} alt="" className="floating-img floating-img--1" />
            <img src={flower} alt="" className="floating-img floating-img--2" />
            <img src={flower} alt="" className="floating-img floating-img--3" />
            <img src={flower} alt="" className="floating-img floating-img--4" />
            <img src={flower} alt="" className="floating-img floating-img--5" />
            <img src={flame1} alt="" className="floating-img floating-img--6" />
        </div>
    )

    function copyLinkToClipboard(link) {
        // navigate("/links")
        if (!navigator.clipboard) {
            return;
        }
        navigator.clipboard.writeText(link)
        toast("Link copied to clipboard", {
            position: "bottom-center",
            autoClose: 4500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
        });
    }
}

export default SocialLinkPage
