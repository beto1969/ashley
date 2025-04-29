import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import BodyModelPage from './BodyModelPage';

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
