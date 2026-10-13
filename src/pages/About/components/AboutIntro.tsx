import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FaHandPaper,  FaArrowUp  } from "react-icons/fa";

import "../../../assets/css/About/AboutIntro.css";
import AboutImage from "../../../assets/images/virtual-tours.png";

const AboutIntro = () => {
  const [showHint, setShowHint] = useState(true);

  return (
    <section className="sorath-about-intro">
      <div className="container-fluid sorath-container-fluid">
        <div className="row align-items-center gy-5">
          <div className="col-lg-6">
            <div className="sorath-section-badge">
              <span />
              About IDBOOK
            </div>

            <h2 className="sorath-about-title">
              An Online Interior Designer For{" "}
              <span>Every Home</span> And Every Budget
            </h2>

            <p className="sorath-about-lead">
              IDBOOK is a platform for every homeowner, from everyday homes to
              larger ones, who wants to remodel without hiring an interior
              designer. IDBOOK itself is your online interior designer and home
              professional, giving you every detail needed to complete the
              interior of your space.
            </p>

            <p className="sorath-about-description">
              Whether the home is modest or generous, small or large, the idea
              is the same: beautiful design should stay within reach, with the
              plans, models, and guidance to finish the work yourself.
            </p>

             <a href="/shop" className="sorath-primary-btn sorath-hero-shop-btn primary-btn-2">
                        <span>Explore Designs</span>
        
                        <span className="sorath-hero-shop-arrow">
                          <FaArrowUp />
                        </span>
                      </a>
          </div>

          <div className="col-lg-6">
            <div
              className="sorath-about-visual"
              onMouseEnter={() => setShowHint(false)}
              onMouseLeave={() => setShowHint(true)}
            >
              <img src={AboutImage} alt="Modern interior bedroom design" />

              {showHint && (
                <div className="sorath-about-move-hint">
                  <FiArrowLeft />
                  <FaHandPaper />
                  <FiArrowRight />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;