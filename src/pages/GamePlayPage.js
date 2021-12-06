import React, { useState, useContext, useEffect } from 'react'
import { CameraComponent, GameStartOverlay, QuestionOverlay } from '../components'
import { useNavigate } from 'react-router-dom'
import { getQuiz, getChallenge } from '../_helpers/cloudFunctions';
import { ToastContainer, toast, Slide } from 'react-toastify';
import RouteContext from '../_helpers/routeContext';
import UserContext from '../_helpers/userContext';
import { createChallengeInstance, addChallenge, onChallengeCreated, answerQuestion, getScore, addScoreForPlayTogether } from '../_helpers/cloudFunctions'
import Acknowledge from '../components/Acknowledge'

function GamePlayPage() {
    const [gameStared, setGameStared] = useState(false)
    const [questions, setQuestions] = useState([])
    const [screenshot, setScreenshot] = useState(null)
    const { path } = useContext(RouteContext)
    const { user } = useContext(UserContext);
    const { storePath } = useContext(RouteContext)
    const [questoionsIndex, setQuestionsIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState({})
    const [challengeAnswers, setChallengeAnswers] = useState([])
    const [readyToAnswer, setReadyToAnswer] = useState(true)
    const [choice, setChoice] = useState(null);
    const [quizEnd, setQuizEnd] = useState(false)
    const [lastQuestion, setLastQuestion] = useState(false)
    let navigate = useNavigate();

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
        } else if(questoionsIndex === questions.length -1) {
            setLastQuestion(true)
        }
        //eslint-disable-next-line
    }, [challengeAnswers, questoionsIndex])

    useEffect(() => {
        var singleChallenge;
        var result = choice
        if (result !== null && !readyToAnswer) {
            if (path?.via === "TOGETHER") {
                if (result != null) {

                    if (gameStared === false) {
                        startGame()
                        return
                    }
                    singleChallenge = result;
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
                        navigate(-1)
                        return
                    }
                    singleChallenge = {
                        "questionId": currentQuestion?.question?.questionId,
                        "choiceId": currentQuestion?.answers?.choice1?.choiceId
                    }
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

        setTimeout(() => {
            setReadyToAnswer(true);
        }, 1000)
        //eslint-disable-next-line 
    }, [readyToAnswer, choice])

    return (
        <>
            <CameraComponent onChoiceMade={onChoiceMade} readyToAnswer={readyToAnswer} 
                quizEnd={quizEnd} uploadAnswerAndRedirectToScore={uploadAnswerAndRedirectToScore} uploadChallangeAndSendSms={uploadChallangeAndSendSms} isLastQuestion={lastQuestion} calculateAndUploadScore={calculateAndUploadScore}/>
            {
                !quizEnd || path?.via === "TOGETHER" || path?.via === "CHALLENGE" ?  gameStared ? <QuestionOverlay currentQuestion={currentQuestion} /> : <GameStartOverlay startGame={startGame} />  : <Acknowledge/>
            }
            <ToastContainer autoClose={4500} theme="dark" transition={Slide} />
          
        </>
    )
    function onChoiceMade(result) {
        setReadyToAnswer(false)
        setChoice(result);
    }

    function startGame() {
        setGameStared(true);
        if (path?.via === "CHALLENGE") {
            var challengeInstanceId = path?.challengeId;
            getChallenge(challengeInstanceId)
                .then(response => {
                    console.log(response.data)
                    setQuestions(response.data.questions)

                    setCurrentQuestion(response.data.questions[0])
                    setGameStared(true);
                    console.log(response.data.questions)
                }).catch(e => {
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
            getQuiz(2)
                .then(response => {
                    setQuestions(response.data.questions)
                    setCurrentQuestion(response.data.questions[0])
                    setGameStared(true);
                }).catch(e => {
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
        }
    }
    function uploadAnswerAndRedirectToScore(video) {
        console.log(video)
        if(!screenshot) {
            setScreenshot(video);
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
                }).catch(err => {
                    console.error(err)
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
        if(!screenshot) {
        setScreenshot(video);
        console.log(video)
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
                    }).catch(err => {
                        console.log(err)
                    })

            }).catch(err => {
                console.log(err)

            })
        }
    }
    function calculateAndUploadScore(video) {
        console.log(video)
        if(!screenshot) {
            console.log(challengeAnswers)
            setScreenshot(video);
            var score =0;
            var percentage=0
            for (const challenge of challengeAnswers){
                if (challenge===1){
                    score=score+1;
                }
            }
            const totalQuestions = challengeAnswers.length;
            percentage = (score / totalQuestions) * 100;
            addScoreForPlayTogether(user, score, percentage, video)
            .then(res => {
                storePath({ "via": path?.via, "SCORE": res?.data })
                navigate(`/score/${res?.data?.scoreId}`)
            }).catch(err => {})
        }
        //TODO: add endpoint to score for challenge
    }
}

export default GamePlayPage