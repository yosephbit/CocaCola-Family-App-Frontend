import React, { useState } from 'react'

function AdminWinners() {
    const [selectedWeek, setSelectedWeek] = useState(1)
    const [foodWinners] = useState([])
    const [cocaWinners] = useState([])

    return (
        <div className="users">
            <div className="users__header fl-row align-center">
                <div className="line"></div>
                <p className="text">Winners List</p>
                <div className="line"></div>
            </div>
            <div className="users__weeks fl-row just-between">
                <button onClick={() => setSelectedWeek(1)} className="img-btn img-btn--medium">WEEK 1</button>
                <button onClick={() => setSelectedWeek(2)} className="img-btn img-btn--medium">WEEK 2</button>
                <button onClick={() => setSelectedWeek(3)} className="img-btn img-btn--medium">WEEK 3</button>
                <button onClick={() => setSelectedWeek(4)} className="img-btn img-btn--medium">WEEK 4</button>
            </div>

            <div className="users__content fl-col">
                <h5 className="header">WEEK {selectedWeek}</h5>
                <h5 className="sub-header">GrabFood Codes</h5>
                {(foodWinners && foodWinners.length > 0) 
                    ? (<div className="table">
                        <div className="table__row table__header">
                            <div className="table__cell">NAME</div>
                            <div className="table__cell">Participation Code</div>
                        </div>
                        <div className="table__row">
                            <div className="table__cell">To be announced</div>
                            <div className="table__cell">To be announced</div>
                        </div>
                        <div className="table__row">
                            <div className="table__cell">to be announced</div>
                            <div className="table__cell">To be announced</div>
                        </div>
                    </div>)
                    : (
                        <h4 className="nowinners">No winners added</h4>
                    )}

                <button className="add-btn self-end">+ Add Winner</button>

                <h5 className="sub-header">1-Year supply of Coca-Cola</h5>
                {(cocaWinners && cocaWinners.length > 0) 
                    ? (<div className="table">
                        <div className="table__row table__header">
                            <div className="table__cell">NAME</div>
                            <div className="table__cell">Participation Code</div>
                        </div>
                        <div className="table__row">
                            <div className="table__cell">To be announced</div>
                            <div className="table__cell">To be announced</div>
                        </div>
                        <div className="table__row">
                            <div className="table__cell">to be announced</div>
                            <div className="table__cell">To be announced</div>
                        </div>
                    </div>)
                    : (
                        <h4 className="nowinners">No winners added</h4>
                    )}
                <button className="add-btn self-end">+ Add Winner</button>

            </div>
        </div>
    )
}

export default AdminWinners
