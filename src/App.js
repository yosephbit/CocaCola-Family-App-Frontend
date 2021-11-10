import './assets/scss/main.scss';
import { LoginPage, PlayersPage, SocialLinkPage, WelcomePage } from './pages';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="players" element={<PlayersPage />} />
        <Route path="links" element={<SocialLinkPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
