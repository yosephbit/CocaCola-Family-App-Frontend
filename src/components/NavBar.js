import React, { useState, useEffect } from 'react'
// import { useLocation } from 'react-router'
import coca from '../assets/img/coca.png'
import UseAnimations from 'react-useanimations'
import menu2 from 'react-useanimations/lib/menu2'
import volume from 'react-useanimations/lib/volume'
import soundfile from '../assets/audio/chinese_new_year.ogg'

function NavBar() {
    const [audio] = useState(new Audio(soundfile));
    // const {pathname} = useLocation()
    const [opened, setOpened] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [volClass, setVolClass] = useState('icon-wrapper')

    const handleInteract = () => {
        const wrapper = document.querySelector('.icon-wrapper')
        wrapper?.click()
        window.removeEventListener("mousedown", handleInteract);
    };

    useEffect(() => {
        window.addEventListener("mousedown", handleInteract, false);
        setTimeout(() => {
            setVolClass(volClass + ' bounce')
        }, 5000);
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (playing) {
            setVolClass('')
            audio.volume = 0.1
            audio.loop = true
            audio.play()
        } else {
            console.log('pause')
            audio.pause()
        }
        //eslint-disable-next-line
    }, [playing])

    useEffect(() => {
        if(opened) {
            // document.addEventListener("click", function () {
            //     document.getElementById("menu-btn").click()
            // })
        }
    }, [opened])

    return (
        <div className="navbar fl-row just-between align-center">
            <img src={coca} alt="" className="navbar__logo" />
            <div className="navbar__actions fl-row align-center">
                <UseAnimations className={volClass} animation={volume} size={40} reverse={!playing} onClick={() => setPlaying(!playing)} strokeColor="white" />
                <UseAnimations id="menu-btn" animation={menu2} size={40} reverse={opened} style={{ animationDuration: '.1s' }} onClick={() => setOpened(!opened)} strokeColor="white" />
            </div>
            {opened && (
                    <div className="menu fl-col just-start">
                        <span className="menu__item">Home</span>
                        <span className="menu__item">How to Participate</span>
                        <span className="menu__item">Prizes</span>
                        <span className="menu__item">Winner List</span>
                        <span className="menu__item">Terms & Conditions</span>
                    </div>
            )}
        </div>
    )

    // function toggleMenu() {

    // }
}

export default NavBar
