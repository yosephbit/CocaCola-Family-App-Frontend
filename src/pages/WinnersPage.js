import React, { useEffect, useState } from 'react'

function WinnersPage() {
    const [selectedWeek, setSelectedWeek] = useState(1)

    useEffect(() => {
        
    }, [selectedWeek])
    
    return (
        <div className="page winners fl-col align-center just-center">
            <div className="winners__header fl-row align-center">
                <div className="line"></div>
                <p className="text">Winners Page</p>
                <div className="line"></div>
            </div>
            <div className="winners__weeks fl-row just-center">
                <button onClick={() => setSelectedWeek(1)} className="img-btn img-btn--small">WEEK 1</button>
                <button onClick={() => setSelectedWeek(2)} className="img-btn img-btn--small">WEEK 2</button>
                <button onClick={() => setSelectedWeek(3)} className="img-btn img-btn--small">WEEK 3</button>
                <button onClick={() => setSelectedWeek(4)} className="img-btn img-btn--small">WEEK 4</button>
            </div>

            <div className="winners__content fl-col">
                <h5 className="header">WEEK {selectedWeek}</h5>
                <h5 className="sub-header">GrabFood Codes</h5>
                <div className="table">
                    <div className="table__row table__header">
                        <div className="table__cell">NAME</div>
                        <div className="table__cell">Participation Code</div>
                    </div>
                    <div className="table__row">
                        <div className="table__cell">Nicholas</div>
                        <div className="table__cell">12344</div>
                    </div>
                    <div className="table__row">
                        <div className="table__cell">Cayden</div>
                        <div className="table__cell">12346</div>
                    </div>
                </div>

                <h5 className="sub-header">GrabFood Codes</h5>
                <div className="table">
                    <div className="table__row table__header">
                        <div className="table__cell">NAME</div>
                        <div className="table__cell">Participation Code</div>
                    </div>
                    <div className="table__row">
                        <div className="table__cell">Cayden</div>
                        <div className="table__cell">12346</div>
                    </div>
                    <div className="table__row">
                        <div className="table__cell">Cayden</div>
                        <div className="table__cell">12346</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WinnersPage
