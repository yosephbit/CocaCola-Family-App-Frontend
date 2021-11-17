import './assets/scss/main.scss';
import { LoginPage, PlayersPage, SocialLinkPage, WelcomePage } from './pages';
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