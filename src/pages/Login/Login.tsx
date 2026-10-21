import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.webp';
import '../../assets/css/Auth/Auth.css';
import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <section className="sorath-auth">
      <div className="container">
        <Link to="/" className="sorath-auth-logo" aria-label="Go to homepage">
          <img src={Logo} alt="IDBook" />
        </Link>
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
