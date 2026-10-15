import { useEffect, useRef } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AppRoutes from '../routes/AppRoutes';
import Loader from './components/Loader/Loader';
import ScrollTop from './pages/Common/ScrollTop';

function Reveal() {
  const { pathname } = useLocation();
  const started = useRef(false);

  useEffect(() => {
    const start = () => {
      AOS.init({
        duration: 750,
        once: true,
        offset: 70,
        easing: 'ease-out-cubic',
      });
    };

    if (!started.current) {
      started.current = true;
      const timer = window.setTimeout(start, 2400);
      return () => window.clearTimeout(timer);
    }

    start();
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Loader />
      <Reveal />
      <AppRoutes />
      <ScrollTop />
    </BrowserRouter>
  );
}

export default App;