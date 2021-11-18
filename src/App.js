import './assets/scss/main.scss';
import { CameraPage, LoginPage, PlayersPage, SocialLinkPage, WelcomePage } from './pages';
import { Routes, Route } from 'react-router-dom';
import UserContext from './_helpers/userContext';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{user, storeUser}}>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="players" element={<PlayersPage />} />
        <Route path="links" element={<SocialLinkPage />} />
        <Route path="game" element={<CameraPage />} />
        <Route path="sg" element={<WelcomePage />} />
        <Route path="sg/login" element={<LoginPage />} />
        <Route path="sg/players" element={<PlayersPage />} />
        <Route path="sg/links" element={<SocialLinkPage />} />
        <Route path="my" element={<WelcomePage />} />
        <Route path="my/login" element={<LoginPage />} />
        <Route path="my/players" element={<PlayersPage />} />
        <Route path="my/links" element={<SocialLinkPage />} />
      </Routes>
    </UserContext.Provider>
  );

  function storeUser(user) {
    setUser(user)
    const userStr = JSON.stringify(user)
    localStorage.setItem("_user", userStr)
  }
}

export default App;