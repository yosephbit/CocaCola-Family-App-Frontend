import React, { useState, useLayoutEffect, useEffect, useRef, useContext } from 'react'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import FirebaseApp from '../_helpers/Firebase'
import flower from '../assets/img/flower.png'
import flame1 from '../assets/img/flame-1.png'
import banner from '../assets/img/banner-full.png'
import Loader from "react-loader-spinner";
import Popup from 'reactjs-popup';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'reactjs-popup/dist/index.css';
import CodeVerification from '../components/codeVerification';
import ReactFlagsSelect from 'react-flags-select';
import { useLocation } from 'react-router-dom';
import RouteContext from '../_helpers/routeContext';
const auth = getAuth(FirebaseApp);

function LoginPage() {
    const [name, setName] = useState('')
    const [prefix, setPrefix] = useState('+65')
    const [countries, setCountries] = useState(["SG", "MY"])
    const [phone, setPhone] = useState('+65')
    const [selected, setSelected] = useState('SG')
    const [errors, setErrors] = useState({})
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [open, setOpen] = useState(false);
    let { pathname, state } = useLocation()
    const {storePath} = useContext(RouteContext)
    const containerRef = useRef(null);
    
    const toggleModal = (state) => setOpen(state);

    useEffect(() => {
        if (pathname.toLowerCase().includes('/my')) {
            setCountries(["MY"])
            setSelected('MY')
            setPrefix('+60')
            setPhone('+60')
        } else if (pathname.toLowerCase().includes('/sg')) {
            setCountries(["SG"])
        }
    }, [pathname])

    useEffect(() => {
        if(state) {
            const {via, linkId} = state
            storePath({via, linkId})
        }
        //eslint-disable-next-line
    }, [])

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
            <div ref={containerRef}>
                <div id="recaptcha-container"></div>
            </div>
            {!loginSuccess ?
                (<form onSubmit={onSubmitHandler} className="form fl-col just-center align-center">
                    <h2 className="form__header">Enter your details</h2>
                    <div className="form__group">
                        <label htmlFor="" className="form__label">NAME:</label>
                        <input onChange={e => setName(e.target.value)} name="name" type="text" value={name} className="form__input" />
                    </div>
                    <span className="form__error">{errors["name"]}</span>
                    <div className="form__group">
                        <label htmlFor="" className="form__label form__label--phone">MOBILE NO:</label>
                        <div className="form__container fl-row align-center">
                            <ReactFlagsSelect
                                fullWidth={false}
                                showSelectedLabel={false}
                                className="menu-flags"
                                selectButtonClassName="menu-flags-button"
                                selected={selected} countries={countries}
                                onSelect={onCountrySelect} />
                            <input onChange={e => updatePhone(e.target.value)} name="phone" type="tel" value={phone} className="form__input--phone" />
                        </div>
                    </div>
                    <span className="form__error">{errors["phone"]}</span>
                    <button id="sign-in-button" type="submit" className="img-btn form__btn">
                        Send
                    </button>
                </form>) :
                (<CodeVerification userData={{name, phone}} nextPage={state} toggleModal={toggleModal} />)
            }

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

    function onCountrySelect(code) {
        const pre = code === "SG" ? '+65' : '+60'
        setPrefix(pre)
        setSelected(code)
        setPhone(pre)
    }

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

        // Phone
        if (fields["phone"].length > 2 && fields["phone"].length < 7) {
            formIsValid = false;
            errs["phone"] = "Phone does not have enough digits";
        }

        setErrors(errs)
        return formIsValid;
    }

    function setupRecaptcha() {
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSubmitHandler()
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
                recaptchaVerifier.clear()
                containerRef.current.innerHTML = `<div id="recaptcha-container"></div>`
                toast("Recaptcha expired. Try again", {
                    position: "bottom-center",
                    autoClose: 4500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
            }
        }, auth);
        return recaptchaVerifier
    }

    function updatePhone(val) {
        if (val.length > 14) return
        let newVal = val.slice(prefix.length)
        setPhone(prefix + newVal)
    }

    function onSubmitHandler(e) {
        console.log("submitting")
        e.preventDefault()
        // navigate("/players")

        if (!handleValidation()) {
            return
        }
        toggleModal(true)
        const recaptchaVerifier = setupRecaptcha()

        signInWithPhoneNumber(auth, phone, recaptchaVerifier)
            .then((confirmationResult) => {
                toggleModal(false)
                setLoginSuccess(true)
                window.confirmationResult = confirmationResult
                containerRef.current.innerHTML = `<div id="recaptcha-container"></div>`
                // ...
            }).catch((error) => {
                toggleModal(false)
                console.log(error)
                recaptchaVerifier.clear()
                containerRef.current.innerHTML = `<div id="recaptcha-container"></div>`
                error = new Error(error).toString().toLowerCase()
                let errorMsg = "Couldn't log you in"
                if (error.includes('invalid format')) {
                    errorMsg = "Invalid phone number. Check your input."
                }
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