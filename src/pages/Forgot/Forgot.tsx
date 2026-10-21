import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.webp';
import '../../assets/css/Auth/Auth.css';
import ForgotForm from './components/ForgotForm';

const Forgot = () => {
  return (
    <section className="sorath-auth">
      <div className="container">
        <Link to="/" className="sorath-auth-logo" aria-label="Go to homepage">
          <img src={Logo} alt="IDBook" />
        </Link>
        <ForgotForm />
      </div>
    </section>
  );
};

export default Forgot;
