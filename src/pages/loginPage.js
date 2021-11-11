import React, { useLayoutEffect, useState } from 'react'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import FirebaseApp from '../Firebase'
import flower from '../assets/img/flower.png'
import flame1 from '../assets/img/flame-1.png'
import banner from '../assets/img/banner-full.png'
import { useNavigate } from 'react-router-dom'
import Loader from "react-loader-spinner";
import Popup from 'reactjs-popup';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'reactjs-popup/dist/index.css';

const auth = getAuth(FirebaseApp);

function LoginPage() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [errors, setErrors] = useState({})
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    let navigate = useNavigate()

    useLayoutEffect(() => {
        const page = document.querySelector('.page');
        page.style.minHeight = window.innerHeight + 'px'
    }, [])

    useLayoutEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSubmitHandler();
            }
        }, auth);
        return () => {
            window.recaptchaVerifier = null;
        }
        //eslint-disable-next-line
    }, [])

    return (
        <div className="page login fl-col just-center align-center">
            <div className="img-container fl-col just-center align-center">
                <img src={banner} alt="" className="main-banner" />
            </div>
            <form onSubmit={onSubmitHandler} className="form fl-col just-center align-center">
                <h2 className="form__header">Enter your details</h2>
                <div className="form__group">
                    <label htmlFor="" className="form__label">NAME:</label>
                    <input onChange={e => setName(e.target.value)} type="text" value={name} className="form__input" />
                </div>
                <span className="form__error">{errors["name"]}</span>
                <div className="form__group">
                    <label htmlFor="" className="form__label">MOBILE NO:</label>
                    <input onChange={e => setPhone(e.target.value)} type="tel" value={phone} className="form__input" />
                </div>
                <span className="form__error">{errors["phone"]}</span>
                {/* {!loading && ()} */}
                    <button id="sign-in-button" type="submit" className="img-btn form__btn">
                        Send
                    </button>
                {/* {!loading && (
                )} */}
                {/* {loading && (
                    <Loader
                        type="ThreeDots"
                        color="#FEFEFE"
                        height={50}
                        width={50} //3 secs
                    />
                )} */}
            </form>

            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div className="modal">
                    <Loader
                        type="TailSpin"
                        color="#FEFEFE"
                        height={40}
                        width={40} //3 secs
                    />
                    <span className="modal__text">Logging in</span>
                </div>
            </Popup>
            <ToastContainer theme="dark" transition={Slide} />

            <img src={flower} alt="" className="floating-img floating-img--1" />
            <img src={flower} alt="" className="floating-img floating-img--2" />
            <img src={flower} alt="" className="floating-img floating-img--3" />
            <img src={flower} alt="" className="floating-img floating-img--4" />
            <img src={flower} alt="" className="floating-img floating-img--5" />
            <img src={flame1} alt="" className="floating-img floating-img--6" />
        </div>
    )

    function handleValidation() {
        let fields = { name, phone };
        let errs = {};
        let formIsValid = true;

        // Name
        if (!fields["name"]) {
            formIsValid = false;
            errs["name"] = "Name cannot be empty";
        }
        // Phone
        if (!fields["phone"]) {
            formIsValid = false;
            errs["phone"] = "Phone cannot be empty";
        }

        setErrors(errs)
        return formIsValid;
    }

    function onSubmitHandler(e) {
        e.preventDefault()
        // navigate("/players")

        if (!handleValidation()) {
            return
        }
        setOpen(true)
        console.log("submitting")
        signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
            .then((confirmationResult) => {
                console.log(confirmationResult)
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                navigate("/players")
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                error = new Error(error).toString().toLowerCase()
                console.log(error)
                let errorMsg = "Couldn't log you in"
                if(error.includes('invalid format')) {
                    errorMsg = "Invalid phone number. Check your input."
                }
                closeModal()
                toast(errorMsg, {
                    position: "bottom-center",
                    autoClose: 4500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    });

                // ...
            });
    }
}

export default LoginPage
