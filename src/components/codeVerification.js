import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import UserContext from '../_helpers/userContext'

function CodeVerification(props) {
    const [code, setCode] = useState("")
    const [errors, setErrors] = useState({})
    const {user, storeUser} = useContext(UserContext)
    let navigate = useNavigate()
    console.log(user)

    return (
        <form onSubmit={onSubmitHandler} className="form fl-col just-center align-center">
            <h2 className="form__header">Enter verification code</h2>
            <div className="form__group">
                <label htmlFor="" className="form__label">CODE:</label>
                <input onChange={e => setCode(e.target.value)} type="number" value={code} className="form__input" />
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

    function onSubmitHandler(e) {
        e.preventDefault()
        // navigate("/players")

        if (!handleValidation()) {
            return
        }
        props.toggleModal(true)
        const phoneConfirmation =  window.confirmationResult 
        phoneConfirmation.confirm(code)
            .then((result) => {
                // User signed in successfully.
                const user = result.user;
                storeUser(user)
                navigate("/players", {replace: true})
                // ...
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                error = new Error(error).toString().toLowerCase()
                props.toggleModal(false)
                console.log(error)
            });
    }
}

export default CodeVerification