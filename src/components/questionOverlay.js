import React,{useEffect,useState} from 'react'
import flower from '../assets/img/flower.png'
import bottle from '../assets/img/bottle.png'
import cork from '../assets/img/cork.png'
import flame1 from '../assets/img/flame-1.png'
import Loader from "react-loader-spinner";
import Popup from 'reactjs-popup';

function QuestionOverlay(props) {
    const [questoionsIndex, setQuestionsIndex]=useState(0)
    const [currentQuestion, setCurrentQuestion]=useState({})
    const [answers]= useState([])
    const [open, setOpen] = useState(false);
    const toggleModal = (state) => setOpen(state);
    useEffect(() =>{
        loadQuestion();
    },[]);
    return (
        <div className="main-overlay ">
            <h2 className="question">{(currentQuestion?.question?.questionText?.toString())}</h2>
            <div className="btn-group">
                <button className="img-btn img-btn--small" onClick={onChoiceMade} id={(currentQuestion?.answers?.choice1?.choiceId?.toString())}>
                <span className="img-btn__text" id={(currentQuestion?.answers?.choice1?.choiceId?.toString())}>
                        {(currentQuestion?.answers?.choice1?.choiceText?.toString())}
                    </span>
                </button>
                <button className="img-btn img-btn--small" onClick={onChoiceMade} id={(currentQuestion?.answers?.choice2?.choiceId?.toString())}>
                    <span className="img-btn__text" id={(currentQuestion?.answers?.choice2?.choiceId?.toString())}>   
                    {(currentQuestion?.answers?.choice2?.choiceText?.toString())}
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

            <Popup open={open} closeOnDocumentClick={false} onClose={() => toggleModal(false)}>
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
        </div>
        
    )
    function loadQuestion(){
        const {questions}=props.questions;
        setCurrentQuestion(questions[questoionsIndex])
    }
    function onChoiceMade(event) {
        const {questions}=props.questions;
      
        if(questions.length-1>questoionsIndex){
            setCurrentQuestion(questions[questoionsIndex+1])
            setQuestionsIndex(questoionsIndex+1);
            
        }else{
            setOpen(true)
        }
    }
}


export default QuestionOverlay
