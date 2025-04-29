import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import BodyModelPage from './components/BodyModelPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/body" element={<BodyModelPage />} />
      </Routes>
    </HashRouter>
  );
}