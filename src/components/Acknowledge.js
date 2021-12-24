import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Acknowledge() {
    useEffect(() => {
        document.addEventListener('mousedown', function () {
            window.location.pathname = '/'
        })
    }, [])
    return (
        <>
            <div className="main-overlay">
                <div className="ackno">
                    <div className="ackno__inner">
                        <p>Thank you for participating!</p>
                        <p>Your quiz is sent to your loved one.</p>
                    </div>
                </div>
                <div className='ackno-back'>
                    <Link to={`/`} className="img-btn img-btn--large fl-row just-center align-center">

                        Back to Home
                    </Link>)
                </div>
            </div>

        </>
    )
}

export default Acknowledge
