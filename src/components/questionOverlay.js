import React from 'react'
import flower from '../assets/img/flower.png'
import bottle from '../assets/img/bottle.png'
import cork from '../assets/img/cork.png'
import flame1 from '../assets/img/flame-1.png'

function QuestionOverlay(props) {
    const { choice1, choice2 } = props?.currentQuestion?.answers
    const { questionText } = props?.currentQuestion?.question

    return (
        <div className="main-overlay ">
            <h2 className="question" title={questionText?.toString()}>{questionText?.toString()}</h2>
            <div className="btn-group">
                <button className="img-btn img-btn--fixed" >
                    <span style={{fontSize: getFontSize(choice1?.choiceText)}} className="img-btn__text" >
                        {choice1?.choiceText}
                    </span>
                </button>
                <button className="img-btn img-btn--fixed">
                    <span style={{fontSize: getFontSize(choice2?.choiceText)}} className="img-btn__text" >
                        {choice2?.choiceText}
                    </span>
                </button>
            </div>
            <img src={flower} alt="" className="floating-img floating-img--1" />
            <img src={flower} alt="" className="floating-img floating-img--2" />
            <img src={flower} alt="" className="floating-img floating-img--3" />
            <img src={flame1} alt="" className="floating-img floating-img--4" />
            <img src={bottle} alt="" className="floating-img floating-img--5" />
            <img src={flower} alt="" className="floating-img floating-img--6" />
            <img src={cork} alt="" className="floating-img floating-img--7" />
        </div>

    )

    function getFontSize(txt) {
        let len = txt.length
        if(len < 9) {
            return 'larger'
        }
        if(len < 12) {
            return '24px'
        }
        if(len < 19) {
            return '20px'
        }
        if(len < 32) {
            return '16px'
        }
        return '14px'
    }
}

export default QuestionOverlay
