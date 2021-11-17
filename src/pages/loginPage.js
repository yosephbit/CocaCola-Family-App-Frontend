import React, { useState, useLayoutEffect, useEffect } from 'react'
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
import { useLocation } from 'react-router';

const auth = getAuth(FirebaseApp);

// export class LoginPage extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             name: '',
//             phone: '+251',
//             errors: {},
//             loginSuccess: false,
//             open: false,
//             selected: 'SG',
//             prefix: '+251',
//             countries: ["SG", "MY"]
//         }
//     }

//     componentDidCatch() {
//         console.log("Error has been caught")
//     }

//     componentDidMount() {
//         const page = document.querySelector('.page');
//         page.style.minHeight = window.innerHeight + 'px'
//         window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
//             'size': 'invisible',
//             'callback': (response) => {
//                 // reCAPTCHA solved, allow signInWithPhoneNumber.
//                 this.onSubmitHandler();
//             }
//         }, auth)
//     }
    
//     toggleModal = (state) => this.setState({open: state});

//     handleValidation = () => {
//         let fields = { name: this.state.name, phone: this.state.phone };
//         let errs = {};
//         let formIsValid = true;

//         // Name
//         if (!fields["name"]) {
//             formIsValid = false;
//             errs["name"] = "Name cannot be empty";
//         }
//         // Phone
//         if (!fields["phone"]) {
//             formIsValid = false;
//             errs["phone"] = "Phone cannot be empty";
//         }

//         // Phone
//         if (fields["phone"].length > 2 && fields["phone"].length < 7) {
//             formIsValid = false;
//             errs["phone"] = "Phone does not have enough digits";
//         }

//         this.setState({errors: errs})
//         return formIsValid;
//     }

//     updatePhone = (val) => {
//         if(val.length > 14) return
//         let newVal = val.slice(this.state.prefix.length)
//         const { prefix } = this.state
//         this.setState({phone: prefix + newVal})
//     }

//     onCountrySelect = (code) => {
//         const prefix = code === "SG" ? '+251' : '+60'
//         this.setState({prefix, selected: code, phone: prefix})
//     }

//     onSubmitHandler = (e) => {
//         e.preventDefault()
//         // navigate("/players")

//         if (!this.handleValidation()) {
//             return
//         }
//         this.toggleModal(true)
//         console.log("submitting")
//         signInWithPhoneNumber(auth, this.state.phone, window.recaptchaVerifier)
//             .then((confirmationResult) => {
//                 console.log(confirmationResult)
//                 window.confirmationResult = confirmationResult
//                 this.toggleModal(false)
//                 this.setState({loginSuccess: true})
//                 // ...
//             }).catch((error) => {
//                 console.log(error)
//                 const recaptchaVerifier = window.recaptchaVerifier
//                 console.log(recaptchaVerifier)
//                 window.recaptchaVerifier.render().then(widgetId => {
//                     window.recaptchaVerifier.recaptcha.reset(widgetId);
//                   });
//                 error = new Error(error).toString().toLowerCase()
//                 let errorMsg = "Couldn't log you in"
//                 if (error.includes('invalid format')) {
//                     errorMsg = "Invalid phone number. Check your input."
//                 }
//                 this.toggleModal(false)
//                 toast(errorMsg, {
//                     position: "bottom-center",
//                     autoClose: 4500,
//                     hideProgressBar: true,
//                     closeOnClick: true,
//                     pauseOnHover: false,
//                     draggable: false,
//                     progress: undefined,
//                 });

//                 // ...
//             });
//     }

//     render() {
//         return (
//             <div className="page login fl-col just-center align-center">
//                 <div className="img-container fl-col just-center align-center">
//                     <img src={banner} alt="" className="main-banner" />
//                 </div>
//                 {!this.state.loginSuccess ?
//                     (<form onSubmit={this.onSubmitHandler} className="form fl-col just-center align-center">
//                         <h2 className="form__header">Enter your details</h2>
//                         <div className="form__group">
//                             <label htmlFor="" className="form__label">NAME:</label>
//                             <input onChange={e => this.setState({name: e.target.value})} name="name" type="text" value={this.state.name} className="form__input" />
//                         </div>
//                         <span className="form__error">{this.state.errors["name"]}</span>
//                         <div className="form__group">
//                             <label htmlFor="" className="form__label form__label--phone">MOBILE NO:</label>
//                             <div className="form__container fl-row align-center">
//                                 <ReactFlagsSelect 
//                                     fullWidth={false}
//                                     showSelectedLabel={false}
//                                     className="menu-flags"
//                                     selectButtonClassName="menu-flags-button"
//                                     selected={this.state.selected} countries={this.state.countries} 
//                                     onSelect={this.onCountrySelect} />
//                                 <input onChange={e => this.updatePhone(e.target.value)} name="phone" type="tel" value={this.state.phone} className=" form__input--phone" />
//                             </div>
//                         </div>
//                         <span className="form__error">{this.state.errors["phone"]}</span>
//                         <button id="sign-in-button" type="submit" className="img-btn form__btn">
//                             Send
//                         </button>
//                     </form>) :
//                     (<CodeVerification toggleModal={this.toggleModal} />)
//                 }
    
//                 <Popup closeOnDocumentClick={false} closeOnEscape={false} open={this.state.open} onClose={() => this.toggleModal(false)}>
//                     <div className="modal">
//                         <Loader
//                             type="TailSpin"
//                             color="#FEFEFE"
//                             height={40}
//                             width={40} //3 secs
//                         />
//                         <span className="modal__text">Logging in</span>
//                     </div>
//                 </Popup>
//                 <ToastContainer theme="dark" transition={Slide} />
    
//                 <img src={flower} alt="" className="floating-img floating-img--1" />
//                 <img src={flower} alt="" className="floating-img floating-img--2" />
//                 <img src={flower} alt="" className="floating-img floating-img--3" />
//                 <img src={flower} alt="" className="floating-img floating-img--4" />
//                 <img src={flower} alt="" className="floating-img floating-img--5" />
//                 <img src={flame1} alt="" className="floating-img floating-img--6" />
//             </div>
//         )
//     }
// }

// export default LoginPage


function LoginPage() {
    const [name, setName] = useState('')
    const [prefix, setPrefix] = useState('+65')
    const [countries, setCountries] = useState(["SG", "MY"])
    const [phone, setPhone] = useState('+65')
    const [selected, setSelected] = useState('SG')
    const [errors, setErrors] = useState({})
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [open, setOpen] = useState(false);
    let {pathname} = useLocation()

    const toggleModal = (state) => setOpen(state);

    useEffect(() => {
        if(pathname.includes('/my')) {
            setCountries(["MY"])
            setSelected('MY')
            setPrefix('+60')
            setPhone('+60')
        } else if(pathname.includes('/sg')) {
            setCountries(["SG"])
        }
    }, [pathname])
    
    useLayoutEffect(() => {
        const page = document.querySelector('.page');
        page.style.minHeight = window.innerHeight + 'px'
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
                    (<CodeVerification toggleModal={toggleModal} />)
                }

            <Popup open={open} closeOnDocumentClick onClose={() => toggleModal(false)}>
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

    function onCountrySelect(code) {
        const pre = code === "SG" ? '+251' : '+60'
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

    function updatePhone(val) {
        if(val.length > 14) return
        let newVal = val.slice(prefix.length)
        setPhone(prefix + newVal)
    }

    function onSubmitHandler(e) {
        e.preventDefault()
        // navigate("/players")

        if (!handleValidation()) {
            return
        }
        toggleModal(true)
        console.log("submitting")
        signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
            .then((confirmationResult) => {
                console.log(confirmationResult)
                window.confirmationResult = confirmationResult
                toggleModal(false)
                setLoginSuccess(true)
                // ...
            }).catch((error) => {
                console.log(error)
                const recaptchaVerifier = window.recaptchaVerifier
                console.log(recaptchaVerifier)
                window.recaptchaVerifier.render().then(widgetId => {
                    window.recaptchaVerifier.recaptcha.reset(widgetId);
                  });
                error = new Error(error).toString().toLowerCase()
                let errorMsg = "Couldn't log you in"
                if (error.includes('invalid format')) {
                    errorMsg = "Invalid phone number. Check your input."
                }
                toggleModal(false)
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
