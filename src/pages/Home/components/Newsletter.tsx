import { FiArrowUpRight } from "react-icons/fi";

import "../../../assets/css/Home/Newsletter.css";

// import NewsletterBg from "../../../assets/images/newsletter-bg.webp";

const Newsletter = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Connect your newsletter API here.
  };

  return (
    <section
      className="sorath-newsletter"
      //   style={{ backgroundImage: `url(${NewsletterBg})` }}
    >
      <div className="container-fluid sorath-container-fluid">
        <div className="sorath-newsletter-content">
          <div className="row sorath-section-heading">
            <div className="col-lg-12">
              <div className="sorath-section-badge">
                <span />
                Subscribe to the newsletter
              </div>
            </div>
          </div>

          <h2>
            Join <span>Our Newsletter</span>
            <br />
            <span>Stay</span> Up To Date
          </h2>

          <p>
            Join our newsletter. Learn something new, gain access to exclusive
            content, and stay informed with the latest updates in the industry.
          </p>

          <form className="sorath-newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address..."
              aria-label="Email address"
              required
            />

            <button type="submit" aria-label="Subscribe to newsletter">
              <FiArrowUpRight />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
