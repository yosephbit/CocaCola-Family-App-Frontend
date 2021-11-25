
import { FaceMesh } from "@mediapipe/face_mesh";
import React, { useRef, useEffect, useState } from "react";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";

var readForAnswer = true;
var i = 1, len = 10;
var answerBuffer = [];


var elem =
    document.compatMode === 'CSS1Compat'
        ? document.documentElement
        : document.body;

function CameraComponent(props) {
    useEffect(() => {
        readAngle();
    }, []);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    var camera = null;
    function onResults(results) {
        if (readForAnswer) {
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const canvasElement = canvasRef.current;
            const canvasCtx = canvasElement.getContext("2d");
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

            if (results.multiFaceLandmarks.length === 2) {

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
                    checkAnswer(answerBuffer, canvasCtx, canvasElement);
                }
                else if (angle > -70 && angle < 0 && angle1 > -70 && angle1 < 0) {
                    if (answerBuffer.length < len) {
                        answerBuffer.push("Yes");
                    }
                    else {
                        answerBuffer.shift();
                        answerBuffer.push("Yes");
                    }
                    checkAnswer(answerBuffer, canvasCtx, canvasElement);
                }
                else if (angle > -70 && angle < 0 && angle1 < 70 && angle1 > 0) {
                    if (answerBuffer.length < len) {
                        answerBuffer.push("No");
                    }
                    else {
                        answerBuffer.shift();
                        answerBuffer.push("No");
                    }
                    checkAnswer(answerBuffer, canvasCtx, canvasElement);
                }
                else if (angle < 70 && angle > 0 && angle1 > -70 && angle1 < 0) {
                    if (answerBuffer.length < len) {
                        answerBuffer.push("No");
                    }
                    else {
                        answerBuffer.shift();
                        answerBuffer.push("No");
                    }
                    checkAnswer(answerBuffer, canvasCtx, canvasElement);
                }
                else if ((angle < 70 && angle > 0) || (angle > -70 && angle < 0)) {
                    if (answerBuffer.length < len) {
                        answerBuffer.push("No");
                    }
                    else {
                        answerBuffer.shift();
                        answerBuffer.push("No");
                    }
                    checkAnswer(answerBuffer, canvasCtx, canvasElement);
                }
                else if ((angle1 < 70 && angle1 > 0) || (angle1 > -70 && angle1 < 0)) {
                    if (answerBuffer.length < len) {
                        answerBuffer.push("No");
                    }
                    else {
                        answerBuffer.shift();
                        answerBuffer.push("No");
                    }
                    checkAnswer(answerBuffer, canvasCtx, canvasElement);
                }
            }
            else if (results.multiFaceLandmarks.length === 1) {

                var angle
                for (let x in results.multiFaceLandmarks) {
                    // eslint-disable-next-line eqeqeq

                    if (x === "0" && results.multiFaceLandmarks[0].length === 468) {
                        var slope = (results.multiFaceLandmarks[x][152].y * canvasElement.height - results.multiFaceLandmarks[x][10].y * canvasElement.height) / (results.multiFaceLandmarks[x][152].x * canvasElement.width - results.multiFaceLandmarks[x][10].x * canvasElement.width)
                        angle = (Math.atan(slope) * 180) / Math.PI;
                    }

                }
                if (angle < 70 && angle > 0) {
                    answerBuffer.push("No");
                    checkAnswer(answerBuffer, canvasCtx, canvasElement);
                } else if (angle > -70 && angle < 0) {
                    answerBuffer.push("Yes");

                    checkAnswer(answerBuffer, canvasCtx, canvasElement);

                }
            }

            else {
                canvasCtx.font = '25px serif';
                canvasCtx.fillText('Need 2 person to answer this Questions.', (elem.clientWidth / 2) - 150, 90);
            }
            canvasCtx.restore();
        }
    }


    function readAngle() {
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

        faceMesh.onResults(onResults);

        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null
        ) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async () => {
                    await faceMesh.send({ image: webcamRef.current.video });
                },
                width: 1000,
                height: 1000,
            });
            camera.start();
        }
    }



    function checkAnswer(buffer, canvasCtx, canvasElement) {
        if (buffer.length === len) {
            var ans = buffer.join("-");
            if (ans === "Yes-Yes-Yes-Yes-Yes-Yes-Yes-Yes-Yes-Yes") {
                readForAnswer = true;
                answerBuffer = [];
                props.onChoiceMade(1)

            }
            else if (ans === "No-No-No-No-No-No-No-No-No-No") {
                readForAnswer = true;
                answerBuffer = [];
                props.onChoiceMade(-1)
            }
            answerBuffer = [];
        }
    }

    useEffect(() => {
        readAngle();
    }, []);

    const videoContraints = {
        facingMode: "user",
        aspectRatio: window.innerHeight / window.innerWidth
    }
    return (
        <div className="camera">
            <Webcam
                ref={webcamRef}

                videoConstraints={videoContraints} mirrored={true}
                audio={false} onUserMediaError={onMediaError}
                className="video-tag"
            />{" "}
            <canvas
                ref={canvasRef}
                className="output_canvas"
            ></canvas>
        </div>


    );


    function onMediaError(e) {
        alert("could not start camera")
    }
}


export default CameraComponent
