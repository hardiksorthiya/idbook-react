import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa';

import '../../../assets/css/Home/CTA.css';

import CTAImage from '../../../assets/images/designwithus.jpg';
import CTABackground from '../../../assets/images/about-bg.png';

const CTA = () => {
  const viewRef = useRef<HTMLSpanElement>(null);

  const moveView = (event: React.MouseEvent<HTMLElement>) => {
    const view = viewRef.current;
    if (!view) return;

    const rect = event.currentTarget.getBoundingClientRect();
    view.style.left = `${event.clientX - rect.left}px`;
    view.style.top = `${event.clientY - rect.top}px`;
  };

  return (
    <section
      className="sorath-cta"
      style={{ backgroundImage: `url(${CTABackground})` }}
      onMouseMove={moveView}
    >
      <span ref={viewRef} className="sorath-cta-view" aria-hidden="true">
        Design With Us
      </span>

      <div className="sorath-cta-overlay">
        <div className="container-fluid sorath-container-fluid">
          <div className="row align-items-center g-4">
            <div className="col-lg-4">
              <Link to="/contact" className="sorath-cta-image" aria-label="Design With Us">
                <span className="sorath-cta-frame" aria-hidden="true" />
                <span className="sorath-cta-photo">
                  <img src={CTAImage} alt="Modern interior design" />
                </span>
              </Link>
            </div>

            <div className="col-lg-4">
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

            <div className="col-lg-4 text-lg-end">
              <Link to="/contact" className="sorath-primary-btn sorath-hero-shop-btn">
                <span>Design With Us</span>
                <span className="sorath-hero-shop-arrow">
                  <FaArrowUp />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
