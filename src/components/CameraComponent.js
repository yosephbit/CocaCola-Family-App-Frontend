import React from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import { ToastContainer, Slide, toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import Loader from "react-loader-spinner";
import RouteContext from '../_helpers/routeContext'

var len = 10;
var answerBuffer = [];


var promiseResolve;
var promise = new Promise(function (resolve) {
    promiseResolve = resolve;
})
class CameraComponent extends React.Component {
    static contextType = RouteContext
    constructor(props) {
        super(props);
        this.state = {
            open: true
        }
        this.webcamRef = React.createRef(null);
        this.canvasRef = React.createRef(null);
        this.camera = null;
        this.videoContraints = {
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


    onResults = (results) => {
        const path = this.context?.path;
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

            if (results.multiFaceLandmarks.length === 2) {
                if (this.displayError === 1) {
                    promiseResolve();
                }
                this.displayError = 2;
                var angle, angle1
                for (let x in results.multiFaceLandmarks) {
                    // eslint-disable-next-line eqeqeq

                    if (x === "0" && results.multiFaceLandmarks[0].length === 468) {
                        var slope = (results.multiFaceLandmarks[x][152].y * canvasElement.height - results.multiFaceLandmarks[x][10].y * canvasElement.height) / (results.multiFaceLandmarks[x][152].x * canvasElement.width - results.multiFaceLandmarks[x][10].x * canvasElement.width)
                        angle = (Math.atan(slope) * 180) / Math.PI;
                    }
                    if (x === "1" && results.multiFaceLandmarks[1].length === 468) {
                        var slope1 = (results.multiFaceLandmarks[x][152].y * canvasElement.height - results.multiFaceLandmarks[x][10].y * canvasElement.height) / (results.multiFaceLandmarks[x][152].x * canvasElement.width - results.multiFaceLandmarks[x][10].x * canvasElement.width)
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
            else if (results.multiFaceLandmarks.length === 1 && path.via !== 'TOGETHER') {


                for (let x in results.multiFaceLandmarks) {
                    // eslint-disable-next-line eqeqeq

                    if (x === "0" && results.multiFaceLandmarks[0].length === 468) {
                        slope = (results.multiFaceLandmarks[x][152].y * canvasElement.height - results.multiFaceLandmarks[x][10].y * canvasElement.height) / (results.multiFaceLandmarks[x][152].x * canvasElement.width - results.multiFaceLandmarks[x][10].x * canvasElement.width)
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

                if(this.displayError===2){
                    this.displayError=0;
                }
                if (this.displayError === 0) {

                    toast.promise(
                        promise,
                        {
                            pending: 'Waiting for second player',
                            success: 'Second player Detected 👌',
                            error: 'Something went wrong 🤯'
                        },
                        {
                          position: toast.POSITION.TOP_CENTER,
                        }
                    );
                    this.displayError = 1
                }


            }
            canvasCtx.restore();
        }
    }

    readAngle() {
        const faceMesh = new FaceMesh({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            },
        });

        faceMesh.setOptions({
            maxNumFaces: 2,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.7,
        });

        faceMesh.onResults(this.onResults);

        if (
            typeof this.webcamRef.current !== "undefined" &&
            this.webcamRef.current !== null
        ) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            this.camera = new cam.Camera(this.webcamRef?.current?.video, {
                onFrame: async () => {
                    await faceMesh.send({ image: this.webcamRef?.current?.video });
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

    Deferred() {
        var self = this;
        this.promise = new Promise(function (resolve, reject) {
            self.resolve = resolve;
            self.reject = reject;
        })

    }

    checkAnswer(buffer, canvasCtx, canvasElement) {
        let msg = "Please go back to up right position to answer next question."

        if (buffer.length === len) {
            var ans = buffer.join("-");
            if (ans === "Yes-Yes-Yes-Yes-Yes-Yes-Yes-Yes-Yes-Yes") {
                answerBuffer = [];
                this.wentBackToUpRight = false;
                this.props.onChoiceMade(1)

                toast(msg, {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
            }
            else if (ans === "No-No-No-No-No-No-No-No-No-No") {
                answerBuffer = [];
                this.wentBackToUpRight = false;
                this.props.onChoiceMade(-1)

                toast(msg, {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
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

                <Popup open={!this.state.open && (!this.props?.readyToAnswer || this.props?.quizEnd)} className="next-popup" transparent={true} closeOnDocumentClick={false} onClose={() => this.toggleModal(false)}>
                    <div className="modal">
                        <Loader
                            type="ThreeDots"
                            color="white"
                            height={80}
                            width={80}
                        />
                    </div>
                </Popup>
                <ToastContainer autoClose={false} theme="dark" transition={Slide} />
            </div>


        );
    }

    onMediaError(e) {
        alert("could not start camera")
    }
}


export default CameraComponent
