import React from 'react'
import QuestionOverlay from '../components/questionOverlay'
import Webcam from 'react-webcam'

function CameraPage() {
    // const [width, setWidth] = useState("100%")
    // const [height, setHeight] = useState("100%")
    
    // useLayoutEffect(() => {
    //     let w = (window.innerWidth < 768 ? window.innerWidth : 768) + 'px'
    //     let h = window.innerHeight + 'px'
    //     setWidth(w)
    //     setHeight(h)
    // }, [])

    const videoContraints = {
        facingMode: "user",
        aspectRatio: window.innerHeight / window.innerWidth
    }
    return (
        <div className="camera">
            <Webcam className="video-tag"
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
