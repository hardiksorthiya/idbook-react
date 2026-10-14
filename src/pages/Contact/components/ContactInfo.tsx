import ContactImage from '../../../assets/images/contact/contact-img-1.png';

const ContactInfo = () => {
  return (
    <div className="sorath-contact-info">
      <div className="sorath-contact-support">
        <span>Support</span>
        <a href="mailto:support@example.com">support@example.com</a>
      </div>
      <div className="sorath-contact-image">
        <img src={ContactImage} alt="Contact" />
      </div>
    </div>
  );
};

export default ContactInfo;
