import Logo from '../../assets/images/logo.webp';
import '../../assets/css/Auth/Auth.css';
import ForgotForm from './components/ForgotForm';

const Forgot = () => {
  return (
    <section className="sorath-auth" data-aos="fade-left">
      <div className="container">
        <a href="/" className="sorath-auth-logo" aria-label="Go to homepage">
          <img src={Logo} alt="IDBook" />
        </a>
        <ForgotForm />
      </div>
    </section>
  );
};

export default Forgot;
