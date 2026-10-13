import { FaCompassDrafting } from 'react-icons/fa6';
import '../../assets/css/Common/DesignFloatButton.css';

const DesignFloatButton = () => {
  return (
    <a
      href="/contact"
      className="sorath-design-float"
      aria-label="Design With Us"
    >
      <span className="sorath-design-float-icon">
        <FaCompassDrafting />
      </span>

      <span className="sorath-design-float-label">
        Design With Us
      </span>
    </a>
  );
};

export default DesignFloatButton;