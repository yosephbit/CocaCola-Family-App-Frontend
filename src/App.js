import { useState } from 'react';
import './assets/scss/main.scss';
import { AdminLogin, AdminPage, AdminScore, AdminUsers, LoginPage, ParticipationPage, PrizesPage, ShareToWinPage, TermsPage, WelcomePage, WinnersPage } from './pages';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserContext from './_helpers/userContext';
import RouteContext from './_helpers/routeContext';
import { Footer, NavBar, ProtectedLinksPage, ProtectedPlayersPage } from './components';
import ProtectedGamePlayPage from './components/ProtectedGamePlayPage';
import ProtectedScorePage from './components/ProtectedScorePage';

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

  return (
    <div className="app">
      <NavBar />
      <UserContext.Provider value={{ user, storeUser }}>
        <RouteContext.Provider value={{ path, storePath }}>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="players" element={<ProtectedPlayersPage />} />
            <Route path="links" element={<ProtectedLinksPage />} />
            <Route path="game" element={<ProtectedGamePlayPage />} />
            <Route path="howto" element={<ParticipationPage />} />
            <Route path="sharetowin" element={<ShareToWinPage />} />
            <Route path="winners" element={<WinnersPage />} />
            <Route path="prizes" element={<PrizesPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="score" element={<ProtectedScorePage />} />
            <Route path="admin" element={<AdminPage />}>
              <Route path="login" element={<AdminLogin />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="scores" element={<AdminScore />} />
              <Route path="*" element={<Navigate to="/admin" />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </RouteContext.Provider>        
      </UserContext.Provider>
      <Footer />
    </div>
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
}

export default App;