import React from "react";
import { FaceDetection } from "@mediapipe/face_detection";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { ToastContainer, Slide, toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import Loader from "react-loader-spinner";
import RouteContext from '../_helpers/routeContext'

var len = 6;
var answerBuffer = [];

const toastList = new Set();
const msgToastList = new Set();

var promiseResolve;
class CameraComponent extends React.Component {
    static contextType = RouteContext
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            quizEnd: this.props?.quizEnd,
            capturing: false,
            recordedChunks: [],
            isLastQuestion: this.props.isLastQuestion
        }
        this.webcamRef = React.createRef(null);
        this.canvasRef = React.createRef(null);
        this.mediaRecorderRef = React.createRef(null);

        this.camera = null;
        this.videoContraints = {
            screenshotQuality: 1,
            facingMode: "user",
            // aspectRatio: window.innerHeight / window.innerWidth
        }
        this.displayError = 0;
        this.wentBackToUpRight = true;
        //   this.path=useContext(RouteContext)
    }
    componentDidMount() {
        this.readAngle();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.isLastQuestion === false && this.state.isLastQuestion) {
            this.handleStartCaptureClick();
            console.log("recording...")
        }
        if(prevProps.isLastQuestion === true && this.state.isLastQuestion === false ) {
            console.log("stopping")
            this.handleStopCaptureClick()
        }
    }

    handleStartCaptureClick = () => {
        // this.setState({capturing: true});
        this.mediaRecorderRef.current = new MediaRecorder(this.webcamRef.current.stream, {
          mimeType: "video/webm"
        });
        console.log("adding event listener...")
        console.log(this.mediaRecorderRef)
        this.mediaRecorderRef.current.addEventListener(
          "dataavailable",
          this.handleDataAvailable
        );
        this.mediaRecorderRef.current.start();
    }
    
    handleDataAvailable = ({ data }) => {
        console.log("data is available outside if", data);
        if (data.size > 0) {
            console.log("data is available");
            this.setState((state) => {
                console.log(state.recordedChunks)
                console.log(data)
                return { recordedChunks: [...state.recordedChunks, data] };
            });
        }
    }

    handleStopCaptureClick = () => {
        this.mediaRecorderRef.current.stop();
        this.setState({capturing: false});
    }

    handleDownload = () => {
        if (this.state.recordedChunks.length) {
          const blob = new Blob(this.state.recordedChunks, {
            type: "video/webm"
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = url;
          a.download = "react-webcam-stream-capture.webm";
          a.click();
          window.URL.revokeObjectURL(url);
          this.setState({recordedChunks: []});
        }
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.quizEnd !== this.state.quizEnd) {
          this.setState({ quizEnd: nextProps.quizEnd });
        }
        if (nextProps.isLastQuestion !== this.state.isLastQuestion) {
            this.setState({ isLastQuestion: nextProps.isLastQuestion });
        }
    }

    onResults = (results) => {
        const path = this.context?.path;
        if (this.state?.quizEnd === true && this.state.recordedChunks?.length > 0) {
            // const img = this.webcamRef.current.getScreenshot({height: 280})
            if(path?.via === 'TOGETHER') {
                this.props.calculateAndUploadScore(new Blob(this.state.recordedChunks, {
                    type: "video/webm"
                  }))
            } else if(path?.via === "CHALLENGE") {
                this.props.uploadAnswerAndRedirectToScore(new Blob(this.state.recordedChunks, {
                    type: "video/webm"
                  }))
            } else {
                this.props.uploadChallangeAndSendSms(new Blob(this.state.recordedChunks, {
                    type: "video/webm"
                  }))
            }
            return;
        }
        if (this.state.open) this.toggleModal(false);

        if (this.props?.readyToAnswer) {
            const videoWidth = this.webcamRef.current.video.videoWidth;
            const videoHeight = this.webcamRef.current.video.videoHeight;

            this.canvasRef.current.width = videoWidth;
            this.canvasRef.current.height = videoHeight;

            const canvasElement = this.canvasRef.current;
            const canvasCtx = canvasElement.getContext("2d");
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

            if (results.detections.length === 2 && path?.via === 'TOGETHER') {
                if (this.displayError === 1) {
                    promiseResolve();
                }
                this.displayError = 2;
                var angle, angle1
                for (let x in results.detections) {
                    // eslint-disable-next-line eqeqeq

                    if (x == "0") {
                        let eyeX = (results.detections[x].landmarks[0].x + results.detections[x].landmarks[1].x) /2
                        let eyeY = (results.detections[x].landmarks[0].y + results.detections[x].landmarks[1].y) /2
                        var slope = -1 * (eyeY * canvasElement.height - results.detections[x].landmarks[3].y * canvasElement.height) / (eyeX * canvasElement.width - results.detections[x].landmarks[3].x * canvasElement.width)
                        angle = (Math.atan(slope) * 180) / Math.PI;
                    }
                    if (x == "1" ) {
                        let eyeX = (results.detections[x].landmarks[0].x + results.detections[x].landmarks[1].x) /2
                        let eyeY = (results.detections[x].landmarks[0].y + results.detections[x].landmarks[1].y) /2
                        var slope1 = -1 * (eyeY * canvasElement.height - results.detections[x].landmarks[3].y * canvasElement.height) / (eyeX * canvasElement.width - results.detections[x].landmarks[3].x * canvasElement.width)
                        angle1 = (Math.atan(slope1) * 180) / Math.PI;
                    }
                }
                if (angle < 70 && angle > 0 && angle1 < 70 && angle1 > 0) {
                    if (answerBuffer.length < len) {
                        answerBuffer.push("Yes");
                    }
                    else {
                        answerBuffer.shift();
                        answerBuffer.push("Yes");
                    }
                    this.checkAnswer(answerBuffer, canvasCtx, canvasElement);
                }
                else if (angle > -70 && angle < 0 && angle1 > -70 && angle1 < 0) {
                    if (answerBuffer.length < len) {
                        answerBuffer.push("Yes");
                    }
                    else {
                        answerBuffer.shift();
                        answerBuffer.push("Yes");
                    }
                    this.checkAnswer(answerBuffer, canvasCtx, canvasElement);
                }
                else if (angle > -70 && angle < 0 && angle1 < 70 && angle1 > 0) {
                    if (answerBuffer.length < len) {
                        answerBuffer.push("No");
                    }
                    else {
                        answerBuffer.shift();
                        answerBuffer.push("No");
                    }
                    this.checkAnswer(answerBuffer, canvasCtx, canvasElement);
                }
                else if (angle < 70 && angle > 0 && angle1 > -70 && angle1 < 0) {
                    if (answerBuffer.length < len) {
                        answerBuffer.push("No");
                    }
                    else {
                        answerBuffer.shift();
                        answerBuffer.push("No");
                    }
                    this.checkAnswer(answerBuffer, canvasCtx, canvasElement);
                }
                else if ((angle < 70 && angle > 0) || (angle > -70 && angle < 0)) {
                    if (answerBuffer.length < len) {
                        answerBuffer.push("No");
                    }
                    else {
                        answerBuffer.shift();
                        answerBuffer.push("No");
                    }
                    this.checkAnswer(answerBuffer, canvasCtx, canvasElement);
                }
                else if ((angle1 < 70 && angle1 > 0) || (angle1 > -70 && angle1 < 0)) {
                    if (answerBuffer.length < len) {
                        answerBuffer.push("No");
                    }
                    else {
                        answerBuffer.shift();
                        answerBuffer.push("No");
                    }
                    this.checkAnswer(answerBuffer, canvasCtx, canvasElement);
                }
            }
            else if (results.detections.length === 1 && path?.via !== 'TOGETHER') {
                if (this.displayError === 1) {
                    promiseResolve();
                }
                this.displayError = 2;

                for (let x in results.detections) {
                    // eslint-disable-next-line eqeqeq

                    if (x == "0") {
                        let eyeX = (results.detections[x].landmarks[0].x + results.detections[x].landmarks[1].x) /2
                        let eyeY = (results.detections[x].landmarks[0].y + results.detections[x].landmarks[1].y) /2
                        var slope = -1 * (eyeY * canvasElement.height - results.detections[x].landmarks[3].y * canvasElement.height) / (eyeX * canvasElement.width - results.detections[x].landmarks[3].x * canvasElement.width)
                        angle = (Math.atan(slope) * 180) / Math.PI;
                    }

                }
                if (angle < 70 && angle > 0 && this.wentBackToUpRight) {
                    answerBuffer.push("No");
                    this.checkAnswer(answerBuffer, canvasCtx, canvasElement);
                } else if (angle > -70 && angle < 0 && this.wentBackToUpRight) {
                    answerBuffer.push("Yes");
                    this.checkAnswer(answerBuffer, canvasCtx, canvasElement);

                } else if (angle > 70 || angle < -70) {
                    this.wentBackToUpRight = true
                }
            }

            else {

                if (path?.via === "TOGETHER") {
                    if (this.displayError === 0) {

                        toast.promise(
                            new Promise((resolve, reject) => {
                                promiseResolve = resolve;
                            }),
                            {
                                pending: 'Waiting for second player',
                                success: 'Second player Detected 👌',
                                error: 'Something went wrong 🤯'
                            },
                            {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 1000,
                            }
                        );
                        this.displayError = 1
                    }
                } else if (results.detections.length === 2) {
                    if (this.displayError === 2) {
                        this.displayError = 0
                    }
                    if (this.displayError != null && this.displayError === 0) {
                        if (toastList.size < 1) {
                            const id = toast.promise(
                                new Promise((resolve, reject) => {
                                    promiseResolve = resolve;
                                }),
                                {
                                    pending: 'More than one player detected, only one player is allowed',
                                    success: 'You can continue now 👌',
                                    error: 'Something went wrong 🤯'
                                },
                                {
                                    position: toast.POSITION.TOP_CENTER,
                                    autoClose: 1000,
                                    onClose: () => { toastList.delete(id) }
                                }
                            );
                            toastList.add(id);
                        }

                        this.displayError = 1
                    }
                }

            }
            canvasCtx.restore();
        }
    }

    toastMessage(msg) {
        if (msgToastList.size < 1) {
           const id= toast(msg, {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClose: ()=>{msgToastList.delete(id)}
            });
            msgToastList.add(id);
        }
    }

    readAngle() {
        const facedetection = new FaceDetection({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`;
            },
        });

        facedetection.setOptions({
            minDetectionConfidence: 0.7,
            selfieMode: true,
            model: "short"
        });

        facedetection.onResults(this.onResults);

        if (
            typeof this.webcamRef.current !== "undefined" &&
            this.webcamRef.current !== null
        ) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            this.camera = new cam.Camera(this.webcamRef?.current?.video, {
                onFrame: async () => {
                    await facedetection.send({ image: this.webcamRef?.current?.video });
                },
                // width: 1000,
                // height: this.screenHeight,
            });
            this.camera.start();
        }
    }

    toggleModal(toggle) {
        this.setState({ open: toggle });
    }
 
    checkAnswer(buffer) {
        let msg = "Please go back to up right position to answer next question."

        if (buffer.length === len) {
            var ans = buffer.join("-");
            if (ans === "Yes-Yes-Yes-Yes-Yes-Yes") {
                answerBuffer = [];
                this.wentBackToUpRight = false;
                this.props.onChoiceMade(1)
                this.toastMessage(msg)

            }
            else if (ans === "No-No-No-No-No-No") {
                answerBuffer = [];
                this.wentBackToUpRight = false;
                this.props.onChoiceMade(-1)
                this.toastMessage(msg)
            }
            answerBuffer = [];
        }
    }

    render() {
        return (
            <div className="camera">
                <Webcam
                    ref={this.webcamRef}
                    videoConstraints={this.videoContraints} mirrored={true}
                    audio={false} onUserMediaError={this.onMediaError}
                    className="video-tag" 
                />{" "}
                <canvas
                    ref={this.canvasRef}
                    className="output_canvas"
                ></canvas>
                <Popup open={this.state.open} className="login-popup" closeOnDocumentClick={false} onClose={() => this.toggleModal(false)}>
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

                <Popup open={!this.state.open && (!this.props?.readyToAnswer && !this.state?.quizEnd)} className="next-popup" transparent={true} closeOnDocumentClick={false} onClose={() => this.toggleModal(false)}>
                    <div className="modal">
                        <Loader
                            type="ThreeDots"
                            color="white"
                            height={80}
                            width={80}
                        />
                    </div>
                </Popup>
                <ToastContainer limit={1} theme="dark" transition={Slide} />
            </div>
        );
    }

    onMediaError(e) {
        alert("could not start camera")
    }
}


export default CameraComponent
