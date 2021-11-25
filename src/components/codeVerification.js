import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import UserContext from '../_helpers/userContext'
import { toast } from 'react-toastify';
import RouteContext from '../_helpers/routeContext';
import { onInvitationLink, verifyToken } from '../_helpers/cloudFunctions';

function CodeVerification(props) {
    const [code, setCode] = useState("")
    const [errors, setErrors] = useState({})
    const { storeUser } = useContext(UserContext)
    const { path } = useContext(RouteContext)
    let navigate = useNavigate()

    
    useEffect(() => {
        const { uid } = props.userData;
        if (uid !== '') {
            saveUserAndNavigate(uid);
            return;
        }
    })
    
    return (
        <form onSubmit={onSubmitHandler} className="form fl-col just-center align-center">
            <h2 className="form__header">Enter verification code</h2>
            <div className="form__group form__group--code">
                <label htmlFor="" className="form__label form__label--code">CODE:</label>
                <input onChange={e => setCode(e.target.value)} type="number" name="code" value={code} className="form__input" />
            </div>
            <span className="form__error">{errors["phone"]}</span>
            {/* {!loading && ()} */}
            <button type="submit" className="img-btn form__btn">
                Enter
            </button>
        </form>
    )

    function handleValidation() {
        let fields = { code };
        let errs = {};
        let formIsValid = true;

        // Name
        if (!fields["code"]) {
            formIsValid = false;
            errs["code"] = "Code cannot be empty";
        }

        setErrors(errs)
        return formIsValid;
    }
    function saveUserAndNavigate(user) {
        storeUser(user)
        if (path?.via === "LINK") {
            onInvitationLink(path?.linkId, user)
                .then(() => {
                    //storePath({})
                    navigate(`/game`)
                })
                .catch(e => {
                    props.toggleModal(false)
                    console.log(e)
                    //storePath({})
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
        }else if (path?.via === "CHALLENGE"){
            navigate(`/game`)
        }else {
            navigate(`/players`, { replace: true })
        }
    }
    function onSubmitHandler(e) {
        e.preventDefault()
        // navigate("/players")

        if (!handleValidation()) {
            return
        }
        props.toggleModal(true)
        const { verificationId } = props.userData;

        //checking if user is already signed and verfied 
        
        verifyToken(verificationId, code)
            .then(response => {
                props.toggleModal(false);
                var user = response.data.uid;
                saveUserAndNavigate(user)
            }).catch(error => {
                console.error(error)
                error = new Error(error).toString().toLowerCase()
                props.toggleModal(false)
                toast("could not verify code. Try again.", {
                    position: "bottom-center",
                    autoClose: 4500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
            })
        // const phoneConfirmation = window.confirmationResult
        // phoneConfirmation.confirm(code)
        //     .then((result) => {
        //         // User signed in successfully.
        //         const user = result.user;
        //         // await registerUser();
        //         const { name, phone } = props.userData;
        //         signUpUser(name, phone)
        //             .then(res => {
        //                 storeUser({...user, ...res.data})
        //                 if(path?.via === "LINK") {
        //                     onInvitationLink(path?.linkId, res.data.uid)
        //                         .then(() => {
        //                             navigate(`/${rootUrl ? rootUrl+'/' : ''}game`)
        //                         })
        //                         .catch(e => {
        //                             props.toggleModal(false)
        //                             toast(e.response?.data?.msg?.detail || 'Error has occured.', {
        //                                 position: "bottom-center",
        //                                 autoClose: 4500,
        //                                 hideProgressBar: true,
        //                                 closeOnClick: true,
        //                                 pauseOnHover: false,
        //                                 draggable: false,
        //                                 progress: undefined,
        //                             });
        //                         })
        //                 } else {
        //                     navigate(`/${rootUrl ? rootUrl+'/' : ''}players`, {replace: true})
        //                 }
        //             })
        //             .catch(e => {
        //                 console.log(e)
        //                 props.toggleModal(false)
        //                 toast("Error occured. Please try again.", {
        //                     position: "bottom-center",
        //                     autoClose: 4500,
        //                     hideProgressBar: true,
        //                     closeOnClick: true,
        //                     pauseOnHover: false,
        //                     draggable: false,
        //                     progress: undefined,
        //                 });
        //             })

        //         // ...
        //     }).catch((error) => {
        //         // User couldn't sign in (bad verification code?)
        //         error = new Error(error).toString().toLowerCase()
        //         props.toggleModal(false)
        //         console.log(error)
        //         toast("could not verify code. Try again.", {
        //             position: "bottom-center",
        //             autoClose: 4500,
        //             hideProgressBar: true,
        //             closeOnClick: true,
        //             pauseOnHover: false,
        //             draggable: false,
        //             progress: undefined,
        //         });
        //     });
    }
}

export default CodeVerification
