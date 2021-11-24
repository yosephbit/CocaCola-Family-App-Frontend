import React, { useState, useContext } from 'react'
import Popup from 'reactjs-popup';
import Loader from "react-loader-spinner";
import { useNavigate } from 'react-router-dom'
import { getQuiz, getChallenge } from '../_helpers/cloudFunctions';
import { ToastContainer, toast, Slide } from 'react-toastify';
import RouteContext from '../_helpers/routeContext';
import UserContext from '../_helpers/userContext';
import { createChallengeInstance, addChallenge, onChallengeCreated, answerQuestion, getScore } from '../_helpers/cloudFunctions'

import { getQuiz, getChallenge } from '../_helpers/cloudFunctions';
import { ToastContainer, toast, Slide } from 'react-toastify';
import RouteContext from '../_helpers/routeContext';
function GamePlayPage() {
    const [gameStared, setGameStared] = useState(false)
    const [questions, setQuestions] = useState([])
    const { path } = useContext(RouteContext)
    return (
        <>
            <CameraComponent onChoiceMade={onChoiceMade} />
            {
                gameStared ? <QuestionOverlay questions={{ questions }} /> : <GameStartOverlay startGame={startGame} />
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
            <ToastContainer autoClose={4500} theme="dark" transition={Slide} />

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
        if (path?.via === "CHALLENGE") {
            var challengeInstanceId=path?.challengeId;
            getChallenge(challengeInstanceId)
                .then(response =>{

                    setQuestions(response.data.questions)

                    setGameStared(true);
                }).catch(e =>{
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
}

export default GamePlayPage