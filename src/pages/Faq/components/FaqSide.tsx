import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import FaqImage from '../../../assets/images/faq/faq-img.png';

const FaqSide = () => {
  return (
    <aside className="sorath-faq-side">
      <div className="sorath-faq-card">
        <img src={FaqImage} alt="FAQ" />
        <h3>Didn't find the answer you were looking for?</h3>
        <p>Fill out a quick contact form and we will respond as quickly as possible.</p>
        <Link to="/contact" className="sorath-primary-btn sorath-faq-btn">
          <span>Contact Us</span>
          <span><FiArrowRight /></span>
        </Link>
      </div>

      <div className="sorath-faq-card sorath-faq-card-dark">
        <h3>Ready to get started? Become a member!</h3>
        <p>Join the IDbook community and start buying designs for your next project.</p>
        <Link to="/register" className="sorath-primary-btn sorath-faq-light">
          <span>Register Now</span>
          <span><FiArrowRight /></span>
        </Link>
      </div>
    </aside>
  );
};

export default FaqSide;
