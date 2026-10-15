import Logo from '../../assets/images/logo.webp';
import '../../assets/css/Auth/Auth.css';
import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <section className="sorath-auth" data-aos="zoom-in">
      <div className="container">
        <a href="/" className="sorath-auth-logo" aria-label="Go to homepage">
          <img src={Logo} alt="IDBook" />
        </a>
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
