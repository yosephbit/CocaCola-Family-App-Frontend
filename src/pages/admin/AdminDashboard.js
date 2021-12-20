import React, { useContext, useEffect, useState } from 'react'
import { getStats } from '../../_helpers/cloudFunctions';
import UserContext from '../../_helpers/userContext';
import Loader from "react-loader-spinner";

function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null)
    const { user } = useContext(UserContext);

    useEffect(() => {
        getStats(user.user, user.token)
            .then(res => {
                setLoading(false)
                setStats(res.data)
            })
            .catch(e => {
                console.log(e)
                setLoading(false)
            })
        // eslint-disable-next-line
    }, [])

    return (
        <div className="dash">
            <h1 className="dash__header">Admin Dashboard</h1>
            <div className="dash__body">
                {loading
                    ? (<div>
                        <Loader
                            type="TailSpin"
                            color="#FEFEFE"
                            height={40}
                            width={40}
                            
                        />
                    </div>)
                    : (
                        !stats
                            ? <h3 className="error">Could not fetch stats</h3>
                            : (
                                <>
                                    <div className="card card--1">
                                        <p className="card__value">{stats.noUsers}</p>
                                        <p className="card__title">Users</p>
                                        <div className="card__svg"></div>
                                    </div>
                                    <div className="card card--2">
                                        <p className="card__value">{stats.noLinks}</p>
                                        <p className="card__title">Links</p>
                                        <div className="card__svg"></div>
                                    </div>
                                    <div className="card card--3">
                                        <p className="card__value">{stats.noClickedLinks}</p>
                                        <p className="card__title">Clicked Links</p>
                                        <div className="card__svg"></div>
                                    </div>
                                    <div className="card card--4">
                                        <p className="card__value">{stats.noChallenges}</p>
                                        <p className="card__title">Challenges</p>
                                        <div className="card__svg"></div>
                                    </div>
                                </>
                            )
                    )
                }
            </div>
        </div>
    )
}

export default AdminDashboard
