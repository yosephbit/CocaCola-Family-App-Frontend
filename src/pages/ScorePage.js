import React, { useEffect, useLayoutEffect, useState } from 'react'
import banner from '../assets/img/banner-full.png'
import cocacan from '../assets/img/coca-can.png'
import cocashade from '../assets/img/coca-shade.png'
import flower from '../assets/img/flower.png'
import bottle from '../assets/img/bottle.png'
import flame1 from '../assets/img/flame-1.png'
import { FaFacebook } from 'react-icons/fa'
import Loader from "react-loader-spinner";
import Popup from 'reactjs-popup';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { Link, useParams } from 'react-router-dom'
import { getScoreById, upload } from '../_helpers/cloudFunctions'
import html2canvas from 'html2canvas';

function ScorePage() {
    const { hostname } = window.location
    const hostArr = hostname.split('.')
    const countryCode = hostArr[hostArr.length - 1]?.toUpperCase()
    // const { path } = useContext(RouteContext)
    const { id } = useParams()
    const [videos, setVideos] = useState([
        // "https://file-examples-com.github.io/uploads/2020/03/file_example_WEBM_480_900KB.webm",
        // "https://file-examples-com.github.io/uploads/2020/03/file_example_WEBM_480_900KB.webm"
    ])
    const [images] = useState([
        `data:image/jpeg;base64,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`,
        `data:image/jpeg;base64,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`
    ])
    const [percentage, setPercentage] = useState(null)
    const [shareCode, setShareCode] = useState('')
    const [thumb, setThumb] = useState('')
    const [open, setOpen] = useState(true)

    useEffect(() => {
        getScoreById(id.replace('/', '')).then((res) => {
            const data = res.data;
            const vids = data.videos?.map(vd => vd?.replace("http://localhost:9199/", "https://d7baf04cb52966.localhost.run/"))

            setVideos(vids || [])
            setShareCode(data.shareCode || '');
            setPercentage((data.percentage || 0).toFixed(0));
        }).catch(err => {
            setOpen(false)
            let errorMsg = "Score not found"
            toast(errorMsg, {
                position: "bottom-center",
                autoClose: 4500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        })
    }, [id])

    useLayoutEffect(() => {
        // if (percentage !== null)
        if (percentage !== null) {
            
            console.log("screen shooting...")
            const ele = document.querySelector('.ht2can')
            const mediaEle = document.querySelector('.media')
            // const vids = [...mediaEle.children]
            const footers = document.querySelectorAll('.grad')
            const header = document.querySelector('.score__header')
            footers.forEach(toggleStyleForCanvas);
            toggleStyleForCanvas(header);
            // mediaEle.replaceChildren(...imgNodes)
            html2canvas(ele, {
                allowTaint: true,
                useCORS: true
            }).then(function (canvas) {
                ele.classList.remove('ht2can-bg')
                footers.forEach(toggleStyleForCanvas)
                toggleStyleForCanvas(header)
                // document.body.appendChild(canvas)
                const dt = canvas.toDataURL("image/jpg");
                const blob = b64toBlob(dt)
                let file = new File([blob], `score-share.jpg`)
                upload(file).then(({data}) => {
                    console.log(data)
                    setThumb(data?.link)
                    setOpen(false)
                }).catch(e => {
                    console.log(e)
                    setOpen(false)
                })

            }).catch(e => {
                ele.classList.remove('ht2can-bg')
                footers.forEach(toggleStyleForCanvas)
                toggleStyleForCanvas(header)
            })
        }
    }, [percentage])

    return (
        <div className="page score">
            <div className="ht2can ht2can-bg fl-col align-center">
                {percentage !== null ? (<h2 className="score__header">
                    WE SCORED <span className="score__value" title={`${percentage}%`}>{percentage}%</span> IN
                </h2>) : (
                    <p className="score__header"></p>
                )}
                <div className="score__body">
                    <img src={banner} alt="" className="score__logo" />
                    {/* <CameraPage /> */}
                    {/* <img src={path?.img} alt="" className="score__img" /> */}
                    <div className="media">
                        {!videos?.length ? <div className='score__video' /> : videos.map((vid, i) => {
                            if (vid.endsWith('.gif') || vid.endsWith('.png')) {
                                return <img key={i} src={vid} alt="" className="score__img" />
                            } else {
                                return <video key={i} src={vid} className={videos.length > 1 ? 'score__video split' : 'score__video'} muted loop autoPlay />
                            }
                        })}
                    </div>
                    <img src={flower} alt="" className="floating-img floating-img--1" />
                    <img src={bottle} alt="" className="floating-img floating-img--2" />
                    <img src={flower} alt="" className="floating-img floating-img--3" />
                    <img src={flower} alt="" className="floating-img floating-img--4" />
                </div>
            </div>

            <div className="score__footer fl-col align-center">
                {percentage !== null && (
                    <>
                        <p className="grad text large">Your Participation Code: #{shareCode}</p>
                        <a href={`https://www.facebook.com/share.php?u=${thumb}&quote=` + encodeURIComponent(`My ${'family'} and I scored ${percentage}% in the Coca-Cola Reunion Trivia Challenge! Think you can do better? challenge yourself at ${window?.location?.origin} and check out my video at ${window.location.href} \n\n#CokeReunion${countryCode || ''} \n #${shareCode || ''}`)}
                            data-action="share/facebook/share" target="_blank" rel="noreferrer" className="link">
                            <FaFacebook size={28} color="white" />
                        </a>
                        <p className="grad text x-large">SHARE YOUR RESULTS NOW</p>
                        <p className="text small">include hashtag #CokeReunionSG and your participation code (eg. #12345)</p>
                        <p className="grad text med">Share the video and tell us who do you want to share a Coke with this CNY and why.</p>
                        <p className="grad text med">Most creative entries will stand to win weekly prizes!</p>
                    </>
                )}

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
                <Link to="/terms" className="grad text med">Find out more at Terms and Conditions</Link>

                <img src={flame1} alt="" className="floating-img floating-img--5" />
                <img src={flower} alt="" className="floating-img floating-img--6" />
            </div>

            <Popup open={open} className="login-popup" lockScroll={true} closeOnDocumentClick={false} onClose={() => setOpen(false)}>
                <div className="modal">
                    <Loader
                        type="TailSpin"
                        color="#FEFEFE"
                        height={40}
                        width={40}
                    />
                    <span className="modal__text">Loading...</span>
                </div>
            </Popup>
            <ToastContainer autoClose={4500} theme="dark" transition={Slide} />
        </div>
    )

    function b64toBlob(b64Data, contentType = 'image/png', sliceSize = 512) {
        let data = b64Data.split(',')[1]
        const byteCharacters = atob(data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    function toggleStyleForCanvas(ele) {
        ele.style.background = ele.style.background ? '' : 'none';
        ele.style.color = ele.style.color ? '' : '#ECD473';
    }
}

export default ScorePage
