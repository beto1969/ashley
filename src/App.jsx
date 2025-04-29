import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import BodyModelPage from './components/BodyModelPage';

export default function App() {
  return (
    <BrowserRouter basename={"/ashley/"}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/body" element={<BodyModelPage />} />
      </Routes>
    </BrowserRouter>
  );
}
