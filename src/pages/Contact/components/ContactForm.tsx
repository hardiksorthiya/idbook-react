import { FiArrowRight } from 'react-icons/fi';

const ContactForm = () => {
  return (
    <form className="sorath-contact-form" onSubmit={(event) => event.preventDefault()}>
      <label>
        Full Name *
        <input type="text" name="name" placeholder="Designer" required />
      </label>

      <div className="row">
        <div className="col-md-6">
          <label>
            Email Address *
            <input type="email" name="email" placeholder="support@example.com" required />
          </label>
        </div>
        <div className="col-md-6">
          <label>
            Services *
            <input type="text" name="service" placeholder="I want to" required />
          </label>
        </div>
      </div>

      <label>
        Write Message *
        <textarea name="message" rows={5} placeholder="Your message.." required />
      </label>

      <button type="submit" className="sorath-primary-btn primary-btn-2">
        <span>Send Message</span>
        <span>
          <FiArrowRight />
        </span>
      </button>
    </form>
  );
};

export default ContactForm;
