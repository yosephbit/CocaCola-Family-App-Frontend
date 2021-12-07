import React, { useContext, useEffect, useState } from 'react'
import banner from '../assets/img/banner-full.png'
import cocacan from '../assets/img/coca-can.png'
import cocashade from '../assets/img/coca-shade.png'
import flower from '../assets/img/flower.png'
import bottle from '../assets/img/bottle.png'
import flame1 from '../assets/img/flame-1.png'
import { FaFacebook } from 'react-icons/fa'
import RouteContext from '../_helpers/routeContext';
import { Link, useParams } from 'react-router-dom'
import { getScoreById } from '../_helpers/cloudFunctions'

function ScorePage() {
    const { hostname } = window.location
    const hostArr = hostname.split('.')
    const countryCode = hostArr[hostArr.length - 1]?.toUpperCase()
    const { path } = useContext(RouteContext)
    const { id } = useParams()
    const [videos, setVideos] = useState([
        // "https://file-examples-com.github.io/uploads/2020/03/file_example_WEBM_480_900KB.webm",
        // "https://file-examples-com.github.io/uploads/2020/03/file_example_WEBM_480_900KB.webm"
    ])
    const [percentage, setPercentage] = useState(0)
    const [shareCode, setShareCode] = useState('')

    useEffect(() => {
        getScoreById(id.replace('/','')).then((res) => {
            const data = res.data;
            const vids = data.videos?.map(vd => vd?.replace("http://localhost:9199/","https://d7baf04cb52966.localhost.run/"))
            setVideos(vids || [])
            setShareCode(data.shareCode || '');
            setPercentage((data.percentage || 0).toFixed(0));
        }).catch(err => {
            //TODO: toast here (or redirect to 404)
        })
    }, [])

    

    return (
        <div className="page score">
            <h2 className="score__header">
                WE SCORED <span className="score__value" title={`${percentage}%`}>{percentage}%</span> IN
            </h2>
            <div className="score__body">
                <img src={banner} alt="" className="score__logo" />
                {/* <CameraPage /> */}
                {/* <img src={path?.img} alt="" className="score__img" /> */}
                <div className="media">
                    {!videos?.length ? <div className='score__video'/> :  videos.map((vid, i) => (
                        <video key={i} src={vid} className={videos.length > 1 ? 'score__video split' : 'score__video'} muted loop autoPlay />
                    )) }
                </div>
                <img src={flower} alt="" className="floating-img floating-img--1" />
                <img src={bottle} alt="" className="floating-img floating-img--2" />
                <img src={flower} alt="" className="floating-img floating-img--3" />
                <img src={flower} alt="" className="floating-img floating-img--4" />
            </div>

            <div className="score__footer fl-col align-center">
                <p className="grad text large">Your Participation Code: #{shareCode}</p>
                <a href={`https://www.facebook.com/share.php?u=${encodeURIComponent(window?.location?.origin)}&quote=` + encodeURIComponent(`My ${'family'} and I scored ${percentage}% in the Coca-Cola Reunion Trivia Challenge! Think you can do better? challenge yourself at ${window?.location?.origin} and check out my video at ${window.location.href} \n\n#CokeReunion${countryCode || ''} \n #${shareCode || ''}`)} data-action="share/facebook/share" target="_blank"

                    rel="noreferrer" className="link">
                    <FaFacebook size={28} color="white" />
                </a>
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
                <Link to="/terms" className="grad text med">Find out more at Terms and Conditions</Link>

                <img src={flame1} alt="" className="floating-img floating-img--5" />
                <img src={flower} alt="" className="floating-img floating-img--6" />
            </div>
        </div>
    )
}

export default ScorePage
