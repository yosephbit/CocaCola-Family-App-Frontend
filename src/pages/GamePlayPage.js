import React, { useState, useContext, useEffect } from 'react'
import { CameraComponent, GameStartOverlay, QuestionOverlay } from '../components'
import Popup from 'reactjs-popup';
import Loader from "react-loader-spinner";
import { useNavigate } from 'react-router-dom'
import { getQuiz, getChallenge } from '../_helpers/cloudFunctions';
import { ToastContainer, toast, Slide } from 'react-toastify';
import RouteContext from '../_helpers/routeContext';
import UserContext from '../_helpers/userContext';
import { createChallengeInstance, addChallenge, onChallengeCreated, answerQuestion, getScore } from '../_helpers/cloudFunctions'

function GamePlayPage() {
    const [gameStared, setGameStared] = useState(false)
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(false)
    const { path } = useContext(RouteContext)
    const { user } = useContext(UserContext);
    const { storePath } = useContext(RouteContext)
    const [questoionsIndex, setQuestionsIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [challengeAnswers, setChallengeAnswers] = useState([])
    let navigate = useNavigate();

    useEffect(() => {
        if (questoionsIndex === questions.length && gameStared) {
            if (path?.via === "CHALLENGE") {
                uploadAnswerAndRedirectToScore(path?.challengeId)
            } else {
                uploadChallangeAndSendSms(challengeAnswers)
            }
        }
        //eslint-disable-next-line
    }, [challengeAnswers, questoionsIndex])

    return (
        <>
            <CameraComponent onChoiceMade={onChoiceMade} />
            {
                gameStared ? <QuestionOverlay currentQuestion={currentQuestion} /> : <GameStartOverlay startGame={startGame} />
            }

            <ToastContainer autoClose={4500} theme="dark" transition={Slide} />
            <Popup open={loading} lockScroll={true} className="login-popup" closeOnDocumentClick={false}>
                <div className="modal">
                    <Loader
                        type="TailSpin"
                        color="#FEFEFE"
                        height={40}
                        width={40}
                    />
                    <span className="modal__text">Starting quiz...</span>
                </div>
            </Popup>
        </>
    )

    function onChoiceMade(result) {
        if (result === -1) {
            if (gameStared === false) {
                startGame()
                return
            }
            var singleChallenge = {
                "questionId": currentQuestion?.question?.questionId,
                "choiceId": currentQuestion?.answers?.choice2?.choiceId
            }
        } else if (result === 1) {
            if (gameStared === false) {
                navigate(-1)
                return
            }
            singleChallenge = {
                "questionId": currentQuestion?.question?.questionId,
                "choiceId": currentQuestion?.answers?.choice2?.choiceId
            }
        }

        setChallengeAnswers((oldArray => [...oldArray, singleChallenge]))
        if (questions.length - 1 > questoionsIndex) {

            setCurrentQuestion(questions[questoionsIndex + 1])
            setQuestionsIndex(questoionsIndex + 1);

        } else {
            setQuestionsIndex(questoionsIndex + 1);
        }
    }

    function startGame() {
        setLoading(true)
        if (path?.via === "CHALLENGE") {
            var challengeInstanceId = path?.challengeId;
            getChallenge(challengeInstanceId)
                .then(response => {
                    setQuestions(response.data.questions)
                    setCurrentQuestion(questions[0])
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
        } else {
            getQuiz(2)
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

    function uploadAnswerAndRedirectToScore(challengeInstanceId) {

        for (const challenge of challengeAnswers) {
            var singleAnswer = {
                challangeId: challengeInstanceId,
                respondentId: user,
                questionId: challenge?.questionId,
                questionChoiceId: challenge?.choiceId
            }
            answerQuestion(singleAnswer.respondentId, singleAnswer.challangeId, singleAnswer.questionId, singleAnswer.questionChoiceId)
                .then(res => {
                    console.log(res)
                }).catch(err => {
                    console.error(err)
                })
        }

        getScore(challengeInstanceId, user)
            .then(res => {
                storePath({ "SCORE": res?.data?.percentage })
                navigate(`/score`)
            }).catch(err => {
                console.log(err)
            })
    }

    function uploadChallangeAndSendSms(challengeAnswers) {
        var challengerId = user;
        createChallengeInstance(challengerId)
            .then(res => {
                var challangeInstanceId = res?.data?.challangeInstanceId

                for (const challenge of challengeAnswers) {
                    var singleChallenge = {
                        questionId: challenge?.questionId,
                        challangeInstanceId: challangeInstanceId,
                        answerId: challenge?.choiceId
                    }
                    addChallenge(singleChallenge.questionId, singleChallenge.challangeInstanceId, singleChallenge.answerId)
                        .then(res => {
                            console.log(res.data)
                        }).catch(err => {
                            console.log(err)
                        })
                }
                onChallengeCreated(challangeInstanceId)
                    .then(res => {
                    }).catch(err => {
                        console.log(err)
                    })

            }).catch(err => {
                console.log(err)

            })


    }
}

export default GamePlayPage