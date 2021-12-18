import React, { useState, useContext } from 'react'
import { addFullQuestion, deleteQuestion, editChoice, editQuestion } from '../_helpers/cloudFunctions';
import UserContext from '../_helpers/userContext';
import Loader from 'react-loader-spinner'

function QuestionModal({ selectedQuestion: item, close, deleting }) {
    const editting = !!item;
    const [question, setQuestion] = useState(item?.question || '')
    const [choice1, setChoice1] = useState(item?.choice1 || '')
    const [choice2, setChoice2] = useState(item?.choice2 || '')
    const [loading, setLoading] = useState(false)
    const { user } = useContext(UserContext)

    return (
        <div className="ques-modal">
            {
                deleting ? (
                    <h2 className="header">
                        Delete this question?
                    </h2>
                ) : (
                    <h2 className="header">
                        {editting ? "Edit Question" : "Add Question"}
                    </h2>
                )
            }
            {
                deleting ? (
                    <form onSubmit={deleteHandler} className="fl-col">
                        <p className="text">{item?.question}</p>
                        <div className="actions fl-row just-end align-center">
                            <span className="cancel" onClick={() => close(false)}>Cancel</span>
                            <button className="actions__btn">
                                Delete!
                            </button>
                        </div>
                    </form>
                )
                    : (
                        <form onSubmit={submitHandler} className="fl-col">
                            <input type="text" className="input que-input" name="question"
                                value={question} onChange={(e) => setQuestion(e.target.value)}
                                placeholder={editting ? "Edit Question" : "Add Question"} />
                            <div className="choices fl-row just-between">
                                <input type="text" className="input que-choice" name="choice1"
                                    value={choice1} onChange={(e) => setChoice1(e.target.value)}
                                    placeholder={editting ? "Edit Choice" : "Add Choice"} />
                                <input type="text" className="input que-choice" name="choice2"
                                    value={choice2} onChange={(e) => setChoice2(e.target.value)}
                                    placeholder={editting ? "Edit Choice" : "Add Choice"} />
                            </div>
                            <div className="actions fl-row just-end align-center">
                                <span className="cancel" onClick={() => close(false)}>Cancel</span>
                                <button disabled={loading} className="actions__btn">
                                    {
                                        loading ? (
                                            <Loader
                                                type="ThreeDots"
                                                color="#2b2a2a"
                                                height={15}
                                                width={40}
                                            />
                                        )
                                            : (editting ? 'Save' : 'ADD')
                                    }
                                </button>
                            </div>
                        </form>
                    )
            }
        </div>
    )

    function submitHandler(e) {
        e.preventDefault()
        setLoading(true)
        if (editting) {
            Promise.all([
                editQuestion(item.questionId, question, user?.user, user?.token),
                editChoice(item.choice1Id, choice1, user?.user, user?.token),
                editChoice(item.choice2Id, choice2, user?.user, user?.token)
            ]).then((values) => {
                console.log(values);
                setLoading(false)
            })
                .catch(e => {
                    console.log(e)
                    setLoading(false)
                })
        } else {
            const ques = {
                question: {
                    questionText: question,
                },
                answers: {
                    choice1: {
                        choiceText: choice1
                    },
                    choice2: {
                        choiceText: choice2
                    }
                }
            }

            addFullQuestion(ques)
                .then(res => {
                    console.log(res.data)
                    setLoading(false)
                })
                .catch(e => {
                    console.log(e)
                    setLoading(false)
                })
        }
    }

    function deleteHandler(e) {
        e.preventDefault()
        setLoading(true)
        deleteQuestion(item?.questionId, user?.user, user?.token)
            .then(res => {
                console.log(res.data)
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
                setLoading(false)
            })
    }
}

export default QuestionModal
