import { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AppRoutes from '../routes/AppRoutes';
import Loader from './components/Loader/Loader';
import ScrollTop from './pages/Common/ScrollTop';

function Reveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 40,
      easing: 'ease-out-cubic',
    });
    AOS.refresh();
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
