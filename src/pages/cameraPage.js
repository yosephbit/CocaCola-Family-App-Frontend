import React from 'react'
import Webcam from 'react-webcam'

function CameraPage() {
    const videoContraints = {
        facingMode: "user",
        aspectRatio: 19 / 9
    }
    return (
        <div className="">
            <Webcam className="video-tag"
                videoConstraints={videoContraints} mirrored={true}
                audio={false} onUserMediaError={onMediaError} />
        </div>
    )

    function onMediaError(e) {
        console.log(e);
        alert("could not start camera")
    }
}

export default CameraPage
