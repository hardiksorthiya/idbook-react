import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

import "../../assets/css/Common/Newsletter.css";

import NewsletterBg from "../../assets/images/shapes/newsletter-shape.png";
import { subscribeNewsletter } from "../../../services/newsletter";

const Newsletter = () => {
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "");

    setBusy(true);
    setNote("");

    subscribeNewsletter(email)
      .then((data) => {
        form.reset();
        setNote(data.message || "Thank you for subscribing.");
      })
      .catch((error) => {
        setNote(error instanceof Error ? error.message : "Could not subscribe.");
      })
      .finally(() => setBusy(false));
  };

  return (
    <section
      className="sorath-newsletter"
      data-aos="zoom-in"
      style={{ backgroundImage: `url(${NewsletterBg})` }}
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
              name="email"
              placeholder="Email address..."
              aria-label="Email address"
              required
            />

            <button type="submit" aria-label="Subscribe to newsletter" disabled={busy}>
              <FiArrowUpRight />
            </button>
          </form>
          {note ? <p className="sorath-newsletter-note">{note}</p> : null}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
