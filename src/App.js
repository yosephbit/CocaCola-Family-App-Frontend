import './assets/scss/main.scss';
import { LoginPage, WelcomePage } from './pages';
import { Routes, Route } from 'react-router-dom';
import UserContext from './_helpers/userContext';
import RouteContext from './_helpers/routeContext';
import soundfile from './assets/audio/chinese_new_year.ogg'
// import Sound from 'react-sound'
import Popup from 'reactjs-popup';
import { useLayoutEffect, useState } from 'react';
import { ProtectedLinksPage, ProtectedPlayersPage } from './components';
import ProtectedGamePlayPage from './components/ProtectedGamePlayPage';

function App() {
  const pathStr = localStorage.getItem('_path')
  const userStr = localStorage.getItem('_user')
  let userData;
  try {
    userData = JSON.parse(userStr)
  } catch (e) {
    userData = null
  }
  let pathData;
  try {
    pathData = JSON.parse(pathStr)
  } catch (e) {
    pathData = {}
  }
  const [user, setUser] = useState(userData)
  const [path, setPath] = useState(pathData)
  const [open, setOpen] = useState(false);
  const toggleModal = (state) => setOpen(state);

  useLayoutEffect(() => {
    setTimeout(() => {
      toggleModal(true)
    }, 4500);
  }, [])

  return (
    <UserContext.Provider value={{ user, storeUser }}>
      <RouteContext.Provider value={{ path, storePath }}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="players" element={<ProtectedPlayersPage />} />
          <Route path="links" element={<ProtectedLinksPage />} />
          <Route path="game" element={<ProtectedGamePlayPage />} />
          <Route path="sg" element={<WelcomePage />} />
          <Route path="sg/login" element={<LoginPage />} />
          <Route path="sg/players" element={<ProtectedPlayersPage />} />
          <Route path="sg/links" element={<ProtectedLinksPage />} />
          <Route path="sg/game" element={<ProtectedGamePlayPage />} />
          <Route path="my" element={<WelcomePage />} />
          <Route path="my/login" element={<LoginPage />} />
          <Route path="my/players" element={<ProtectedPlayersPage />} />
          <Route path="my/links" element={<ProtectedLinksPage />} />
          <Route path="my/game" element={<ProtectedGamePlayPage />} />
        </Routes>
      </RouteContext.Provider>
      {/* <Sound
        url={soundfile}
        playStatus={Sound.status.PLAYING}
        autoLoad={true}
        loop={true}
      /> */}
      <Popup contentStyle={{width: '70%'}} open={open} closeOnDocumentClick={false} onClose={() => toggleModal(false)} position="bottom center">
        <div className="modal modal--audio">
          <div className="content">
            {' '}
            How about a music as you play?
          </div>
          <div className="actions">
            <button className="button" onClick={() => toggleModal(false)}>
              No
            </button>
            <button className="button" onClick={playSound}>
              Yes
            </button>
          </div>
        </div>
      </Popup>
      <audio id="audio" src={soundfile}></audio>
    </UserContext.Provider>
  );

  function storeUser(user) {
    setUser(user)
    const userStr = JSON.stringify(user)
    localStorage.setItem("_user", userStr)
  }

  function storePath(path) {
    setPath(path)
    const pathStr = JSON.stringify(path)
    localStorage.setItem("_path", pathStr)
  }

  function playSound() {
    toggleModal(false)
    const audio = document.getElementById('audio')
    audio.volume = 0.5
    audio.play()
  }
}

export default App;