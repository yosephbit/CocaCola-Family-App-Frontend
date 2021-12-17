import React from 'react'
import Popup from 'reactjs-popup';
import Loader from "react-loader-spinner";

function PopupPortal() {
    if (!isOpen) return null
    return ReactDOM.createPortal(
        <Popup open={isOpen} className="next-popup" transparent={true} closeOnDocumentClick={false}>
            <div className="modal">
                <Loader
                    type="ThreeDots"
                    color="white"
                    height={80}
                    width={80}
                />
            </div>
        </Popup>,
        document.body
    )
}

export default PopupPortal
