import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import BodyModelPage from './components/BodyModelPage';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/body" element={<BodyModelPage />} />
      </Routes>
    </BrowserRouter>
  );
}
