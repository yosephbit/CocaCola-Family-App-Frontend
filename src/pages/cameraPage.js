import React from 'react'
import Webcam from 'react-webcam'

function CameraPage() {
    const videoContraints = {
        facingMode: "user",
        aspectRatio: 3 / 4
    }
    return (
        <div className="simple-camera">
            <Webcam style={{maxWidth: "100%"}}
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
