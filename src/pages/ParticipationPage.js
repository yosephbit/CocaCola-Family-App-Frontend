import React from 'react'
import { FaFacebook, FaMobileAlt } from "react-icons/fa";
import { BsShare } from "react-icons/bs";

function ParticipationPage() {
    const iconstyle = { margin: "8px 0" }
    return (
        <div className="page guide-container">
            <div className="guide">
                <div className="guide__header fl-row align-center">
                    <div className="line"></div>
                    <p className="text">Test your knowledge</p>
                    <div className="line"></div>
                </div>
                <div className="guide__body fl-row">
                    <div className="guide-item">
                        <p className="title">Step 1</p>
                        <p className="desc">Pick a family memeber you think you know best!</p>
                    </div>
                    <div className="guide-item">
                        <p className="title">Step 2</p>
                        <BsShare color="#f31d24" style={iconstyle} size={22} />
                        <p className="desc">Send/Share the link to the family member to start.</p>
                    </div>
                    <div className="guide-item">
                        <p className="title">Step 3</p>
                        <FaMobileAlt color="#f31d24" style={iconstyle} size={22} />
                        <p className="desc">Receive a link to test yourself once questions answered.</p>
                    </div>
                    <div className="guide-item">
                        <p className="title">Step 4</p>
                        <p className="desc">Check your score and see how well you fare!</p>
                    </div>
                    <div className="guide-item">
                        <p className="title">Step 5</p>
                        <FaFacebook color="#f31d24" style={iconstyle} size={25} />
                        <p className="desc">Share your score on Facebook! Don't forget to enter participation code!</p>
                    </div>
                </div>
            </div>

            <div className="guide">
                <div className="guide__header fl-row align-center">
                    <div className="line"></div>
                    <p className="text">Play together now</p>
                    <div className="line"></div>
                </div>
                <div className="guide__body">
                    <div className="guide-item">
                        <p className="title">Step 1</p>
                        <p className="desc">Get your family memeber to play with you!</p>
                    </div>
                    <div className="guide-item">
                        <p className="title">Step 2</p>
                        <p className="desc">Challenge yourself to see how well you know them.</p>
                    </div>
                    <div className="guide-item">
                        <p className="title">Step 3</p>
                        <p className="desc">Check your score and see how well you fare!</p>
                    </div>
                    <div className="guide-item">
                        <p className="title">Step 4</p>
                        <FaFacebook color="#f31d24" style={iconstyle} size={25} />
                        <p className="desc">Share your score on Facebook! Don't forget to enter participation code!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParticipationPage
