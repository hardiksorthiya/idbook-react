import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App.tsx'
import './assets/css/Common/Theme.css';
import './assets/css/Common/Animation.css';
import './assets/css/Common/fontawesome.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
