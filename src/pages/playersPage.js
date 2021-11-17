import React from 'react'
import coca from '../assets/img/coca.png'
import grandpa from '../assets/img/tiger-1.png'
import grandma from '../assets/img/tiger-2.png'
import father from '../assets/img/tiger-3.png'
import mother from '../assets/img/tiger-4.png'
import sister from '../assets/img/tiger-5.png'
import brother from '../assets/img/tiger-6.png'
import flower from '../assets/img/flower.png'
import flame1 from '../assets/img/flame-1.png'
import flame2 from '../assets/img/flame-2.png'
import { useNavigate } from 'react-router-dom'
// import { generateInviteLink } from '../_helpers/cloudFunctions'

function PlayersPage() {
    let navigate = useNavigate()

    return (
        <div className="page players fl-col align-center">
            <img src={coca} alt="" className="coca-img" />
            <h2 className="players__header">Pick a loved one to play!</h2>
            <div className="fl-col align-center w-full round-table">
                <div className="row row--1">
                    <div onClick={tempRoute} className="tiger tiger--1">
                        <img src={grandpa} alt="" className="tiger__img" />
                    </div>
                    <div onClick={tempRoute} className="tiger tiger--2">
                        <img src={grandma} alt="" className="tiger__img" />
                    </div>
                </div>
                <div className="row row--2">
                    <div onClick={tempRoute} className="tiger tiger--3">
                        <img src={father} alt="" className="tiger__img" />
                    </div>
                    <div onClick={tempRoute} className="tiger tiger--4">
                        <img src={mother} alt="" className="tiger__img" />
                    </div>
                </div>
                <div className="row row--3">
                    <div onClick={tempRoute} className="tiger tiger--5">
                        <img src={sister} alt="" className="tiger__img" />
                    </div>
                    <div onClick={tempRoute} className="tiger tiger--6">
                        <img src={brother} alt="" className="tiger__img" />
                    </div>
                </div>
            </div>
            <img src={flower} alt="" className="floating-img floating-img--1" />
            <img src={flower} alt="" className="floating-img floating-img--2" />
            <img src={flower} alt="" className="floating-img floating-img--3" />
            <img src={flower} alt="" className="floating-img floating-img--4" />
            <img src={flame1} alt="" className="floating-img floating-img--5" />
            <img src={flame2} alt="" className="floating-img floating-img--6" />
        </div>
    )

    function tempRoute() {
        // generateInviteLink({ userId: "12" })
        //     .then((result) => {
        //         // Read result of the Cloud Function.
        //         /** @type {any} */
        //         const data = result.data;
        //         const sanitizedMessage = data.text;
        //         console.log(sanitizedMessage)
        //     });
        const link = "https://ar-filter-demo.netlify.app/?invite=AxreS35xs"

        navigate("/links", {
            state: {
                link
            }
        })
    }
}

export default PlayersPage
