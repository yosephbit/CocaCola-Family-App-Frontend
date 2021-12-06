import { useState } from 'react';
import './assets/scss/main.scss';
import { AdminDashboard, AdminLogin, AdminPage, AdminQuestions, AdminScore, AdminUsers, LoginPage, ParticipationPage, PrizesPage, ScorePage, ShareToWinPage, TermsPage, WelcomePage, WinnersPage } from './pages';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserContext from './_helpers/userContext';
import RouteContext from './_helpers/routeContext';
import { Footer, NavBar, ProtectedAdmin, ProtectedLinksPage, ProtectedPlayersPage } from './components';
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

  return (
    <div className="app">
      <UserContext.Provider value={{ user, storeUser }}>
      <NavBar />
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
            <Route path="score/:id" element={<ScorePage />} />
            <Route path="admin" element={<AdminPage />}>
              <Route path="login" element={<AdminLogin />} />
              <Route path="dashboard" element={
                <ProtectedAdmin>
                  <AdminDashboard />
                </ProtectedAdmin>
              } />
              <Route path="users" element={
                <ProtectedAdmin>
                  <AdminUsers />
                </ProtectedAdmin>
              } />
              <Route path="scores" element={
                <ProtectedAdmin>
                  <AdminScore />
                </ProtectedAdmin>
              } />
              <Route path="questions" element={
                <ProtectedAdmin>
                  <AdminQuestions />
                </ProtectedAdmin>
              } />
              <Route path="*" element={<Navigate to="/admin/dashboard" />} />
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