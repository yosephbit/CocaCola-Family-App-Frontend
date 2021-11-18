import React, { useLayoutEffect, useState } from 'react'
import QuestionOverlay from '../components/questionOverlay'
import Webcam from 'react-webcam'

function CameraPage() {
    const [width, setWidth] = useState("100%")
    const [height, setHeight] = useState("100%")
    useLayoutEffect(() => {
        let w = window.innerWidth + 'px'
        let h = window.innerHeight + 'px'
        setWidth(w)
        setHeight(h)
        console.log(w, h)
    }, [])

    const videoContraints = {
        facingMode: "user",
        aspectRatio: 0.5625
    }
    return (
        <div className="camera">
            <Webcam width={width} height={height}
                videoConstraints={videoContraints} mirrored={true}
                audio={false} onUserMediaError={onMediaError} />
            <QuestionOverlay />
        </div>
    )

    function onMediaError(e) {
        console.log(e);
        alert("could not start camera")
    }
}

export default CameraPage
