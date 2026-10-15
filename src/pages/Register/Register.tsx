import Logo from '../../assets/images/logo.webp';
import '../../assets/css/Auth/Auth.css';
import RegisterForm from './components/RegisterForm';

const Register = () => {
  return (
    <section className="sorath-auth" data-aos="fade-right">
      <div className="container">
        <a href="/" className="sorath-auth-logo" aria-label="Go to homepage">
          <img src={Logo} alt="IDBook" />
        </a>
        <RegisterForm />
      </div>
    </section>
  );
};

export default Register;
