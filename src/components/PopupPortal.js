import ReactDOM from 'react-dom';

function PopupPortal({isOpen, children}) {
    if (!isOpen) return null
    return ReactDOM.createPortal(
        {children},
        document.body
    )
}

export default PopupPortal
