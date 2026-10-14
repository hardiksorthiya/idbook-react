import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../routes/AppRoutes';
import Loader from './components/Loader/Loader';
import ScrollTop from './pages/Common/ScrollTop';

function App() {
  return (
    <BrowserRouter>
    <Loader />
      <AppRoutes />
      <ScrollTop />
    </BrowserRouter>
  );
}

export default App;