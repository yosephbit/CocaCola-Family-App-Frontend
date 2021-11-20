import './assets/scss/main.scss';
import { LoginPage, WelcomePage } from './pages';
import { Routes, Route } from 'react-router-dom';
import UserContext from './_helpers/userContext';
import RouteContext from './_helpers/routeContext';
import { useState } from 'react';
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
      pathData ={}
  }
  const [user, setUser] = useState(userData)
  const [path, setPath] = useState(pathData)
  
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
}

export default App;