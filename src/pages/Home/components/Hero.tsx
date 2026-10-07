import { FaArrowUp } from "react-icons/fa";
import "../../../assets/css/Home/Hero.css";
import Logo from "../../../assets/images/logo.webp";
import visul from "../../../assets/images/3dvisual.webp";
import CAD from "../../../assets/images/cad.webp";

const Hero = () => {
  return (
    <section className="sorath-hero">
      <div className="sorath-hero-overlay"></div>
      <div className="container-fluid position-relative sorath-hero-content sorath-container-fluid">
        <div className="row align-items-end">
          {/* Left Content */}
          <div className="col-xl-8 col-lg-6">
            <div className="sorath-hero-logo mb-4">
              <img src={Logo} alt="IDBook" className="img-fluid" />
            </div>

            <div className="sorath-hero-badge mb-4 position-relative d-inline-flex align-items-center gap-2 overflow-hidden">
              <span className="sorath-hero-badge-dot"></span>
              ALL ABOUT YOU
              <span className="sorath-hero-badge-rectangle"></span>
            </div>

            <h1 className="sorath-hero-title mb-4">
              The First Digital Hub for{" "}<br></br>
              <strong>Ready-to-Build CAD & 3D Visuals.</strong>
            </h1>

            <p className="sorath-hero-description mb-4">
              Whether it’s your home or office project,
              <br />
              Start simply search & buy
              <br />
              Whats you need & as per your size.
            </p>

            {/* Bottom CTA */}
            <div className="d-flex align-items-center gap-3">
              {/* Compass */}
              <a href="contact.html" className="sorath-hero-compass" aria-label="Design With Us" >
                <span className="design-float-icon">
                  <i className="fa-regular fa-compass-drafting"></i>
                </span>
                <span className="design-float-label">Design With Us</span>
              </a>

              {/* Shop Button */}
              <a href="/shop" className="sorath-primary-btn sorath-hero-shop-btn">
                <span>Shop Now</span>

                <span className="sorath-hero-shop-arrow">
                  <FaArrowUp />
                </span>
              </a>
            </div>
          </div>

          {/* Right Images */}
          <div className="col-xl-4 col-lg-6">
            <div className="d-flex align-items-center justify-content-center gap-3 sorath-hero-images">
              <div className="sorath-hero-image">
                <img src={visul} alt="Interior Design" className="img-fluid" />
              </div>

              <div className="sorath-hero-image">
                <img src={CAD} alt="CAD Design" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
