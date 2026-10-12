import { FaArrowUp } from "react-icons/fa";


import "../../../assets/css/Home/CTA.css";

import CTAImage from "../../../assets/images/step1.webp";
import CTABackground from "../../../assets/images/step1.webp";

const CTA = () => {
  return (
    <section
      className="sorath-cta"
      style={{ backgroundImage: `url(${CTABackground})` }}
    >
      <div className="sorath-cta-overlay">
        <div className="container-fluid sorath-container-fluid">
          <div className="row align-items-center g-4">
            <div className="col-lg-4">
              <div className="sorath-cta-image">
                <img src={CTAImage} alt="Modern interior design" />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="sorath-cta-content">
                <h2>
                  Transform Your Space
                  <br />
                  With Us
                </h2>

                <p>
                  Let's Discover Your Style, Curate Unique Designs, and Create
                  a Home You'll Love to Live In.
                </p>
              </div>
            </div>

            <div className="col-lg-2 text-lg-end">
              <a href="/shop" className="sorath-primary-btn sorath-hero-shop-btn">
                              <span>Design With Us</span>
              
                              <span className="sorath-hero-shop-arrow">
                                <FaArrowUp />
                              </span>
                            </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;