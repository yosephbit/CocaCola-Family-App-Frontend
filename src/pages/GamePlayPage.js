import React, { useState, useContext, useEffect, useLayoutEffect } from 'react'
import { CameraComponent, GameStartOverlay, QuestionOverlay } from '../components'
import { useNavigate, useLocation } from 'react-router-dom'
import { getQuiz, getChallenge } from '../_helpers/cloudFunctions';
import { ToastContainer, toast, Slide } from 'react-toastify';
import RouteContext from '../_helpers/routeContext';
import UserContext from '../_helpers/userContext';
import { createChallengeInstance, addChallenge, onChallengeCreated, answerQuestion, getScore, addScoreForPlayTogether } from '../_helpers/cloudFunctions'
import Acknowledge from '../components/Acknowledge'
import Loader from "react-loader-spinner";
import Popup from 'reactjs-popup';
import html2canvas from 'html2canvas';

let { TweenLite, TweenMax, Linear, Sine } = window;

function GamePlayPage() {
    let { state } = useLocation()
    const [gameStared, setGameStared] = useState(false)
    const [questions, setQuestions] = useState([])
    const [screenshot, setScreenshot] = useState(null)
    const { path } = useContext(RouteContext)
    const { user } = useContext(UserContext);
    const { storePath } = useContext(RouteContext)
    const [questoionsIndex, setQuestionsIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [challengeAnswers, setChallengeAnswers] = useState([])
    const [loading, setLoading] = useState(false)
    const [readyToAnswer, setReadyToAnswer] = useState(true)
    const [choice, setChoice] = useState(null);
    const [quizEnd, setQuizEnd] = useState(false)
    const [lastQuestion, setLastQuestion] = useState(false)
    const [images, setImages] = useState([])

    const [wentBackToUpRight, setWentBackToRight] = useState(true)

    let navigate = useNavigate();

    useLayoutEffect(() => {
        if (!TweenLite || !TweenMax || !Linear || !Sine) return;
        TweenLite.set("#container", { perspective: 600 })
        // TweenLite.set("img", { xPercent: "-50%", yPercent: "-50%" })

        var total = 4;
        var warp = document.getElementById("container"), w = window.innerWidth, h = window.innerHeight;

        for (let i = 0; i < total; i++) {
            var Div = document.createElement('div');
            if(i % 2 === 0) {
                TweenLite.set(Div, { attr: { class: 'dot' }, x: R(0, w), y: R(-200, -150), z: R(-200, 200), zIndex: 10 });
            } else {
                TweenLite.set(Div, { attr: { class: 'dot-cork' }, x: R(0, w), y: R(-200, -150), z: R(-200, 200), zIndex: 10 });
            }
            warp.prepend(Div);
            animm(Div);
        }

        function animm(elm) {
            TweenMax.to(elm, R(6, 15), { y: h + 100, ease: Linear.easeNone, repeat: -1, delay: -15 });
            // TweenMax.to(elm, R(4, 8), { x: '+=100', rotationZ: R(0, 180), repeat: -1, yoyo: true, ease: Sine.easeInOut });
            TweenMax.to(elm, R(2, 8), { rotationX: R(0, 360), rotationY: R(0, 360), repeat: -1, yoyo: true, ease: Sine.easeInOut, delay: -5 });
        };

        function R(min, max) { return min + Math.random() * (max - min) };

        return () => {
            const dots = [...Array.from(document.querySelectorAll('.dot')), ...Array.from(document.querySelectorAll('.dot-cork'))]
            dots.forEach(dot => dot.remove())
        }
    }, [])

    useEffect(() => {
        if (path?.via === 'TOGETHER' && !state?.relation) {
            navigate(`/players`)
            return;
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (questoionsIndex === questions.length && gameStared && questoionsIndex !== 0 && !quizEnd) {

            setReadyToAnswer(false)
            setQuizEnd(true);
            setLastQuestion(false)
            // if (path?.via === "CHALLENGE") {
            //     uploadAnswerAndRedirectToScore(path?.challengeId)
            // }
            // else if (path?.via === "TOGETHER") {
            //     console.log("HERE2")
            //     calculateAndUploadScore()
            // }
            // else {
            //     uploadChallangeAndSendSms(challengeAnswers)
            // }
        } else if (questoionsIndex === questions.length - 2) {
            setLastQuestion(true)
        }
        //eslint-disable-next-line
    }, [challengeAnswers, questoionsIndex])

    useEffect(() => {
        var singleChallenge;
        var result = choice
        if (result !== null && !readyToAnswer && !quizEnd && wentBackToUpRight) {
            if (path?.via === "TOGETHER") {
                if (result != null) {

                    if (result === 1) {
                        if (gameStared === false) {
                            startGame()
                            return
                        }

                    } else if (result === 0) {
                        if (gameStared === false) {
                            navigate("/")
                            return
                        }

                    }
                    singleChallenge = {
                        "questionId": currentQuestion?.question?.questionId,
                        "choiceId": currentQuestion?.answers?.choice1?.choiceId,
                        "result": result === 0 ? 1 : result
                    }
                }
            } else {
                if (result === -1) {
                    if (gameStared === false) {

                        startGame()
                        return
                    }
                    singleChallenge = {
                        "questionId": currentQuestion?.question?.questionId,
                        "choiceId": currentQuestion?.answers?.choice2?.choiceId
                    }
                } else if (result === 1) {
                    if (gameStared === false) {
                        navigate("/")
                        return
                    }
                    singleChallenge = {
                        "questionId": currentQuestion?.question?.questionId,
                        "choiceId": currentQuestion?.answers?.choice1?.choiceId
                    }
                }
            }
            if (!checkIsQuestionAnswered(singleChallenge?.questionId)) {
                setChallengeAnswers((oldArray => {
                    oldArray[questoionsIndex] = singleChallenge;
                    return oldArray;
                }))
            }

            if (questions.length - 1 > questoionsIndex) {
                setCurrentQuestion(questions[questoionsIndex + 1])
                setQuestionsIndex(questoionsIndex + 1);

            } else {
                setQuestionsIndex(questoionsIndex + 1);
            }
            setWentBackToRight(false)
        }

        setTimeout(() => {
            setReadyToAnswer(true);
        }, 1500)
        //eslint-disable-next-line 
    }, [readyToAnswer, choice])

    useEffect(() => {
        let interval;
        if (gameStared && questions.length > 0 && !quizEnd) {
            console.log("things happening")
            const ele = document.querySelector('.gamepage')
            interval = setInterval(async () => {
                // if(images.length <= 3) {
                    const canvas = await html2canvas(ele, {scale: 1, logging: false});
                    const img = new Image()
                    const data = canvas.toDataURL("image/jpeg");
                    // console.log(data)
                    img.src = data;
                    setImages(prevImages => [...prevImages, img]);
                // }
            }, 800)
        }
        if(quizEnd) {
            setLoading(true)
            clearInterval(interval)
        }
        return () => {
            clearInterval(interval)
        }
    }, [gameStared, questions, quizEnd])
    return (
        <>
            <div className="gamepage">
                <CameraComponent onChoiceMade={onChoiceMade} readyToAnswer={readyToAnswer} gameStared={gameStared} images={images}
                    quizEnd={quizEnd} uploadAnswerAndRedirectToScore={uploadAnswerAndRedirectToScore} uploadChallangeAndSendSms={uploadChallangeAndSendSms}
                    isLastQuestion={lastQuestion} calculateAndUploadScore={calculateAndUploadScore} childSetWentRightBack={setWentBackToRight} />
                {
                    !quizEnd || path?.via === "TOGETHER" || path?.via === "CHALLENGE" ? gameStared ? <QuestionOverlay currentQuestion={currentQuestion} /> : <GameStartOverlay startGame={startGame} /> : <Acknowledge />
                }
            </div>
            <Popup open={loading} className="login-popup" closeOnDocumentClick={false} onClose={() => setLoading(false)}>
                <div className="modal">
                    <Loader
                        type="TailSpin"
                        color="#FEFEFE"
                        height={40}
                        width={40}
                    />
                    <span className="modal__text">{quizEnd ? "Submitting..." : "Loading..."}</span>
                </div>
            </Popup>
            <ToastContainer autoClose={4500} theme="dark" transition={Slide} />

        </>
    )
    function onChoiceMade(result) {
        setChoice(result);
        setReadyToAnswer(false)
    }

    function startGame() {
        setLoading(true)
        if (path?.via === "CHALLENGE") {
            var challengeInstanceId = path?.challengeId;
            getChallenge(challengeInstanceId)
                .then(response => {
                    console.log(response.data)
                    setQuestions(response.data.questions)
                    setGameStared(true);
                    setLoading(false)
                    setCurrentQuestion(response.data.questions[0])
                    setGameStared(true);
                    console.log(response.data.questions)
                }).catch(e => {
                    console.log(e.response?.data?.msg?.detail)
                    setLoading(false)
                    toast(e.response?.data?.msg?.detail || 'Error has occured.', {
                        position: "bottom-center",
                        autoClose: 4500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                })
        } else if (path?.via === "TOGETHER") {
            getQuiz("TOGETHER:" + state?.relation)
                .then(response => {
                    setQuestions(response.data.questions)
                    setCurrentQuestion(response.data.questions[0])
                    setLoading(false)
                    setGameStared(true);
                }).catch(e => {
                    setLoading(false)
                    console.log(e.response?.data?.msg?.detail)
                    toast(e.response?.data?.msg?.detail || 'Error has occured.', {
                        position: "bottom-center",
                        autoClose: 4500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                })
        } else {
            getQuiz(path?.linkId)
                .then(response => {
                    setQuestions(response.data.questions)
                    setCurrentQuestion(response.data.questions[0])
                    setLoading(false)
                    setGameStared(true);
                }).catch(e => {
                    console.log(e.response?.data?.msg?.detail)
                    setLoading(false)
                    toast(e.response?.data?.msg?.detail || 'Error has occured.', {
                        position: "bottom-center",
                        autoClose: 4500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                })
        }
    }
    async function uploadAnswerAndRedirectToScore(video) {
        if (!screenshot) {
            try {

                setScreenshot(video);
                setLoading(true)
                let promise = []
                for (const challenge of challengeAnswers) {
                    var singleAnswer = {
                        challangeId: path?.challengeId,
                        respondentId: user,
                        questionId: challenge?.questionId,
                        questionChoiceId: challenge?.choiceId
                    }
                    promise.push(answerQuestion(singleAnswer.respondentId, singleAnswer.challangeId, singleAnswer.questionId, singleAnswer.questionChoiceId))
                    
                }
                await Promise.all(promise)
                
                getScore(path?.challengeId, user, video)
                .then(res => {
                    storePath({ "SCORE": res?.data })
                    navigate(`/score/${res?.data?.scoreId}`)
                })
            } catch(e) {
                setLoading(false);
                console.log(e);
            }
        }
    }
    function uploadChallangeAndSendSms(video) {
        // var challengerId = user;
        let invitationId = path?.linkId;
        if (!screenshot) {
            setScreenshot(video);
            setLoading(true)
            createChallengeInstance(invitationId, video)
                .then(async res => {
                    var challangeInstanceId = res?.data?.challangeInstanceId
                    let promise = []
                    for (const challenge of challengeAnswers) {
                        var singleChallenge = {
                            questionId: challenge?.questionId,
                            challangeInstanceId: challangeInstanceId,
                            answerId: challenge?.choiceId,
                        }
                        promise.push(addChallenge(singleChallenge.questionId, singleChallenge.challangeInstanceId, singleChallenge.answerId))
                    }
                    await Promise.all(promise)
                    onChallengeCreated(challangeInstanceId)
                        .then(res => {
                            setLoading(false)
                        }).catch(err => {
                            console.log(err)
                        })

                }).catch(err => {
                    console.log(err)
                    setLoading(false)
                })
        }
    }

    function calculateAndUploadScore(video) {
        if (!screenshot) {
            setLoading(true)
            setScreenshot(video);
            var score = 0;
            var percentage = 0
            console.log(challengeAnswers);
            for (const challenge of challengeAnswers) {
                if (challenge?.result === 1) {
                    score = score + 1;
                }
            }
            const totalQuestions = challengeAnswers.length;
            percentage = (score / totalQuestions) * 100;
            addScoreForPlayTogether(user, score, percentage, video)
                .then(res => {
                    setLoading(false)
                    storePath({ "via": path?.via, "SCORE": res?.data })
                    navigate(`/score/${res?.data?.scoreId}`)
                }).catch(err => {
                    setLoading(false)
                })
        }
    }

    function checkIsQuestionAnswered(questionId) {
        let isAlreadyAnswered = false;
        for (const challenge of challengeAnswers) {
            if (questionId === challenge?.questionId) {
                isAlreadyAnswered = true;
                break;
            }
        }
        return isAlreadyAnswered;
    }
}

export default GamePlayPage