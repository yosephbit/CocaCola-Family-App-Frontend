import React from 'react'
import Webcam from 'react-webcam'

function CameraComponent() {
    const videoContraints = {
        facingMode: "user",
        aspectRatio: window.innerHeight / window.innerWidth
    }
    return (
        <div className="camera">
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

export default CameraComponent
