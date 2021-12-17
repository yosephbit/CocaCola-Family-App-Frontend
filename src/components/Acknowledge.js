import React, { useEffect } from 'react'

function Acknowledge() {
    useEffect(() => {
        document.addEventListener('mousedown', function() {
            window.location.pathname = '/'
        })
    }, [])
    return (
        <div className="main-overlay">
            <div className="ackno">
                <div className="ackno__inner">
                    <p>Thank you for participating!</p>
                    <p>Your quiz is sent to your loved one.</p>
                </div>
            </div>
        </div>
    )
}

export default Acknowledge
