import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '../routes/AppRoutes';
import Loader from './components/Loader/Loader';

function App() {
  return (
    <BrowserRouter>
    <Loader />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;