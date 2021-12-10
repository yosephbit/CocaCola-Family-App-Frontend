import React, { useState, useContext, useEffect } from 'react'
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
    let navigate = useNavigate();

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
        if (result !== null && !readyToAnswer && !quizEnd) {
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
        }

        setTimeout(() => {
            setReadyToAnswer(true);
        }, 1500)
        //eslint-disable-next-line 
    }, [readyToAnswer, choice])

    return (
        <>
            <CameraComponent onChoiceMade={onChoiceMade} readyToAnswer={readyToAnswer} gameStared={gameStared}
                quizEnd={quizEnd} uploadAnswerAndRedirectToScore={uploadAnswerAndRedirectToScore} uploadChallangeAndSendSms={uploadChallangeAndSendSms} isLastQuestion={lastQuestion} calculateAndUploadScore={calculateAndUploadScore} />
            {
                !quizEnd || path?.via === "TOGETHER" || path?.via === "CHALLENGE" ? gameStared ? <QuestionOverlay currentQuestion={currentQuestion} /> : <GameStartOverlay startGame={startGame} /> : <Acknowledge />
            }
            <Popup open={loading} className="login-popup" closeOnDocumentClick={false} onClose={() => setLoading(false)}>
                <div className="modal">
                    <Loader
                        type="TailSpin"
                        color="#FEFEFE"
                        height={40}
                        width={40}
                    />
                    <span className="modal__text">{ quizEnd ? "Calculating..." : "Loading..."}</span>
                </div>
            </Popup>
            <ToastContainer autoClose={4500} theme="dark" transition={Slide} />

        </>
    )
    function onChoiceMade(result) {
        setReadyToAnswer(false)
        setChoice(result);
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
    function uploadAnswerAndRedirectToScore(video) {
        if (!screenshot) {
            setScreenshot(video);
            setLoading(true)
            for (const challenge of challengeAnswers) {
                var singleAnswer = {
                    challangeId: path?.challengeId,
                    respondentId: user,
                    questionId: challenge?.questionId,
                    questionChoiceId: challenge?.choiceId
                }
                answerQuestion(singleAnswer.respondentId, singleAnswer.challangeId, singleAnswer.questionId, singleAnswer.questionChoiceId)
                    .then(res => {
                        console.log(res)
                        setLoading(false)
                    }).catch(err => {
                        console.error(err)
                        setLoading(false)
                    })
            }

            getScore(path?.challengeId, user, video)
                .then(res => {
                    storePath({ "SCORE": res?.data })

                    navigate(`/score/${res?.data?.scoreId}`)
                }).catch(err => {
                    console.log(err)
                })
        }
    }
    function uploadChallangeAndSendSms(video) {
        var challengerId = user;
        let invitationId = path?.linkId;
        if (!screenshot) {
            setScreenshot(video);
            setLoading(true)
             createChallengeInstance(challengerId, invitationId, video)
                .then(async res => {
                    var challangeInstanceId = res?.data?.challangeInstanceId

                    for (const challenge of challengeAnswers) {
                        var singleChallenge = {
                            questionId: challenge?.questionId,
                            challangeInstanceId: challangeInstanceId,
                            answerId: challenge?.choiceId,
                        }
                        await addChallenge(singleChallenge.questionId, singleChallenge.challangeInstanceId, singleChallenge.answerId)
                    }
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