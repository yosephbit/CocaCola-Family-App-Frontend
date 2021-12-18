import React, { useState, useEffect, useContext } from 'react'
import coca from '../assets/img/coca.png'
import UseAnimations from 'react-useanimations'
import volume from 'react-useanimations/lib/volume'
import soundfile from '../assets/audio/chinese_new_year.mp3'
import Popup from 'reactjs-popup'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa";
import UserContext from '../_helpers/userContext'
// import { isIOS } from 'react-device-detect';

function NavBar() {
    const [audio] = useState(new Audio(soundfile));
    const [playing, setPlaying] = useState(false)
    const [volClass, setVolClass] = useState('icon-wrapper')
    const { user, storeUser } = useContext(UserContext)
    const navigate = useNavigate();

    const handleInteract = () => {
        const wrapper = document.querySelector('.icon-wrapper')
        wrapper?.click()
        document.removeEventListener("mousedown", handleInteract);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleInteract, false);
        // console.log(isIOS, "is ios")
        // if(!isIOS) {
        //     document.addEventListener("mousedown", handleInteract, false);
        // }
        setTimeout(() => {
            setVolClass(volClass + ' bounce')
        }, 5000);
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (playing) {
            setVolClass('')
            try {
                // audio.load()
                audio.volume = 0.1
                audio.loop = true
                audio.play()
            } catch (e) {
                console.log(e)
            }
        } else {
            try {
                audio.pause()
            } catch (e) {
                console.log(e, "pause")
            }
        }
        //eslint-disable-next-line
    }, [playing])

    return (
        <div className="navbar fl-row just-between align-center">
            <img src={coca} alt="" className="navbar__logo" />
            <div className="navbar__actions fl-row align-center">
                <UseAnimations className={volClass} animation={volume} size={40} reverse={!playing}
                    onClick={() => setPlaying(!playing)} strokeColor="white" />
                <Popup className="menu-popup" trigger={open => open
                    ? (<div style={{ cursor: "pointer" }}><FaTimes color="white" size={23} style={{ marginLeft: '3px' }} /></div>)
                    : (<div style={{ cursor: "pointer" }}><FaBars color="white" size={23} style={{ marginLeft: '3px' }} /></div>)}
                    position="bottom right">
                    {close => (
                        user?.token ? (
                            <div className="menu fl-col just-start">
                                <Link onClick={close} to="/admin/dashboard" className="menu__item">Home</Link>
                                <Link onClick={close} to="/admin/users" className="menu__item">Users</Link>
                                <Link onClick={close} to="/admin/questions" className="menu__item">Questions</Link>
                                <span onClick={() => {logout(); close();}} className="menu__item">Logout</span>
                            </div>
                        ) : (
                            <div className="menu fl-col just-start">
                                <Link onClick={close} to="/" className="menu__item">Home</Link>
                                <Link onClick={close} to="howto" className="menu__item">How to Participate</Link>
                                <Link onClick={close} to="prizes" className="menu__item">Prizes</Link>
                                <Link onClick={close} to="winners" className="menu__item">Winner List</Link>
                                <Link onClick={close} to="terms" className="menu__item">Terms & Conditions</Link>
                            </div>
                        )
                    )}
                </Popup>
            </div>
        </div>
    )

    function logout() {
        storeUser(null)
        navigate('/')
    }
}

export default NavBar
