import React, { useState, useLayoutEffect, useContext } from 'react'
import flower from '../../assets/img/flower.png'
import flame1 from '../../assets/img/flame-1.png'
import banner from '../../assets/img/banner-full.png'
import Loader from "react-loader-spinner";
import Popup from 'reactjs-popup';
import { ToastContainer, Slide } from 'react-toastify';
import { adminLogin } from '../../_helpers/cloudFunctions';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../_helpers/userContext';

function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [fail, setFail] = useState("")
    const [open, setOpen] = useState(false)
    const toggleModal = (state) => setOpen(state);
    const navigate = useNavigate();
    const { storeUser } = useContext(UserContext)

    useLayoutEffect(() => {
        const page = document.querySelector('.page');
        page.style.minHeight = window.innerHeight + 'px'
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
                <h2 className="form__header">Admin Login</h2>
                <p className="form__error">{fail}</p>
                <div className="form__group">
                    <label htmlFor="" className="form__label">UserName</label>
                    <input onChange={e => setEmail(e.target.value)} name="email" type="text" value={email} className="form__input" />
                </div>
                <span className="form__error">{errors["email"]}</span>
                <div className="form__group">
                    <label htmlFor="" className="form__label">Password</label>
                    <input onChange={e => setPassword(e.target.value)} name="password" type="password" value={password} className="form__input" />
                </div>
                <span className="form__error">{errors["password"]}</span>
                <button id="sign-in-button" type="submit" className="img-btn form__btn">
                    Login
                </button>
            </form>

            <Popup open={open} className="login-popup" closeOnDocumentClick={false} onClose={() => toggleModal(false)}>
                <div className="modal">
                    <Loader
                        type="TailSpin"
                        color="#FEFEFE"
                        height={40}
                        width={40}
                    />
                    <span className="modal__text">Logging in</span>
                </div>
            </Popup>
            <ToastContainer autoClose={4500} theme="dark" transition={Slide} />

            <img src={flower} alt="" className="floating-img floating-img--1" />
            <img src={flower} alt="" className="floating-img floating-img--2" />
            <img src={flower} alt="" className="floating-img floating-img--3" />
            <img src={flower} alt="" className="floating-img floating-img--4" />
            <img src={flower} alt="" className="floating-img floating-img--5" />
            <img src={flame1} alt="" className="floating-img floating-img--6" />
        </div>
    )

    function handleValidation() {
        let fields = { email, password };
        let errs = {};
        let formIsValid = true;

        // Email
        if (!fields["email"]) {
            formIsValid = false;
            errs["email"] = "Email cannot be empty";
        }

        // Password
        if (!fields["password"]) {
            formIsValid = false;
            errs["password"] = "Password cannot be empty";
        }

        setErrors(errs)
        return formIsValid;
    }

    function onSubmitHandler(e) {
        e.preventDefault()
        if (!handleValidation()) {
            return
        }
        toggleModal(true)

        adminLogin(email, password)
            .then(res => {
                const uid = res.data
                if (uid) {
                    storeUser(uid)
                    navigate("/admin/dashboard")
                }
            })
            .catch(e => {
                const {data} = e.response
                setFail(data.msg)
                toggleModal(false)
            })
    }
}

export default AdminLogin
