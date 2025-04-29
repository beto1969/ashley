import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {BrowserRouter} from "react-router-dom";  // you can add your own CSS

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter basename={import.meta.env.BASE_URL}>
  <React.StrictMode>

            <App />

  </React.StrictMode>,
    </BrowserRouter>
);
