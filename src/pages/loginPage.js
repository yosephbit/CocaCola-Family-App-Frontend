import React, { useEffect, useState } from 'react'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import FirebaseApp from '../Firebase'
import flower from '../assets/img/flower.png'
import flame1 from '../assets/img/flame-1.png'
import { useNavigate } from 'react-router-dom'

const auth = getAuth(FirebaseApp);

function LoginPage() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    let navigate = useNavigate()

    useEffect(() => {
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
    }, [])

    return (
        <div className="page login fl-col just-center align-center">
            <img src="" alt="" className="main-img" />
            <form onSubmit={onSubmitHandler} className="form fl-col justify-center align-center">
                <h2 className="form__header">Enter your details</h2>
                <div className="form__group">
                    <label htmlFor="" className="form__label">NAME:</label>
                    <input onChange={e => setName(e.target.value)} type="text" value={name} className="form__input" />
                </div>
                <div className="form__group">
                    <label htmlFor="" className="form__label">MOBILE NO:</label>
                    <input onChange={e => setPhone(e.target.value)} type="tel" value={phone} className="form__input" />
                </div>
                <button id="sign-in-button" type="submit" className="img-btn form__btn">
                    Send
                </button>
            </form>

            <img src={flower} alt="" className="floating-img floating-img--1" />
            <img src={flower} alt="" className="floating-img floating-img--2" />
            <img src={flower} alt="" className="floating-img floating-img--3" />
            <img src={flower} alt="" className="floating-img floating-img--4" />
            <img src={flower} alt="" className="floating-img floating-img--5" />
            <img src={flame1} alt="" className="floating-img floating-img--6" />
        </div>
    )

    function onSubmitHandler(e) {
        e.preventDefault()
        if(!name || !phone) {
            return
        }
        // console.log("submitting")
        signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
            .then((confirmationResult) => {
                console.log(confirmationResult)
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                navigate("/players")
                // ...
            }).catch((error) => {
                console.log(error)
                navigate("/players")
                // Error; SMS not sent

                // ...
            });
    }
}

export default LoginPage
