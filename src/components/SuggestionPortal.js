import React from 'react'
import ReactDOM from 'react-dom';
import Autosuggest from 'react-autosuggest';

function SuggestionPortal({isOpen}) {
    if (!isOpen) return null
    return ReactDOM.createPortal(
        <div className="sugg">
            <Autosuggest
                suggestions={[]}
                onSuggestionsFetchRequested={() => {}}
                onSuggestionsClearRequested={() => {}}
                getSuggestionValue={() => {}}
                renderSuggestion={() => {}}
                inputProps={() => {}}
            />
        </div>,
        document.body
    )
}

export default SuggestionPortal
