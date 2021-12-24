import React, { useEffect } from 'react'

function UserLinksModal({ user, close }) {
    useEffect(() => {
        if (user) {
            console.log(user.links)
            console.log(user.scores)
        }
    }, [user])

    if (user.links.length === 0 && user?.scores?.length === 0) {
        return (
            <>
                <div onClick={close} className="modal__close">x</div>
                <h2>No links for this user</h2>
            </>
        )
    }
    return (
        <div>
            <div onClick={close} className="modal__close">x</div>
            <h4 style={{ marginBottom: "15px" }}>Links by <code>{user.name}</code></h4>
            <div className="table">
                <div className="table__row table__header">
                    <div className="table__cell">Link</div>
                    <div className="table__cell">Link Created Date</div>
                    <div className="table__cell">For</div>
                    <div className="table__cell">Score</div>
                    <div className="table__cell">Participation Code</div>
                    <div className="table__cell">Participation Date</div>
                </div>
                {user.links.map(([linkId, link]) => {
                    const score = getScoreForLink(linkId)
                    console.log(score, 'score')
                    if(score === false) {
                        return(
                            <div key={linkId} className="table__row">
                                <div className="table__cell">{linkId}</div>
                                <div className="table__cell">{(new Date(link.timeStamp)).toLocaleString()}</div>
                                <div className="table__cell">{link.relation}</div>
                                <div className="table__cell">Link not used</div>
                                <div className="table__cell">-</div>
                                <div className="table__cell">-</div>
                            </div>
                        )
                    } else {
                        return(
                            <div key={linkId} className="table__row">
                                <div className="table__cell">{linkId}</div> 
                                <div className="table__cell">{(new Date(link.timeStamp)).toLocaleString()}</div>
                                <div className="table__cell">{link.relation}</div>
                                <div className="table__cell">{score?.percentage?.toFixed(0)} %</div>
                                <div className="table__cell">{score?.shareCode}</div>
                                <div className="table__cell">{(new Date(score?.timeStamp)).toLocaleString()}</div>
                            </div>
                        )

                    }
                })
            }
            {user?.scores?.map(([challegeId, challenge]) => {
                    if(!challenge.challangeId) {

                        return(
                            <div key={challegeId} className="table__row">
                                <div className="table__cell">Play Together</div>
                                <div className="table__cell">-</div>
                                <div className="table__cell">{challenge?.relation}</div>
                                <div className="table__cell">{challenge?.percentage?.toFixed(0)} %</div>
                                <div className="table__cell">{challenge.shareCode}</div>
                                <div className="table__cell">{(new Date(challenge.timeStamp)).toLocaleString()}</div>
                            </div>
                        )
                    } return ''
                })
            }
            </div>
        </div>
    )


    function getScoreForLink(linkId) {
        const score = user.scores.filter(([scoreId, score]) => score.invitationId === linkId)
        if(score.length === 0) {
            return false
        }
        return score.pop()[1]
    }
}

export default UserLinksModal
