import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import { FaCompassDrafting } from 'react-icons/fa6';
import '../../../assets/css/Home/Hero.css';
import Logo from '../../../assets/images/logo.webp';
import visul from '../../../assets/images/3dvisual.webp';
import CAD from '../../../assets/images/cad.webp';

const letterize = (text: string, accent: boolean, startIndex: number) => {
  const letters: ReactNode[] = [];
  let wordStart = true;
  let index = startIndex;

  for (const char of text) {
    if (char === ' ') {
      letters.push(<span key={`space-${index}`}>{' '}</span>);
      wordStart = true;
      continue;
    }

    const shown = wordStart ? char.toLocaleUpperCase() : char;
    wordStart = false;

    letters.push(
      <span
        key={`letter-${index}`}
        className={`sorath-hero-letter${accent ? ' is-accent' : ''}`}
        style={{ animationDelay: `${index * 0.06}s` }}
      >
        {shown}
      </span>,
    );
    index += 1;
  }

  return { letters, nextIndex: index };
};

const Hero = () => {
  const line1 = letterize('The First Digital Hub for ', false, 0);
  const line2 = letterize('Ready-to-Build CAD & 3D Visuals.', true, line1.nextIndex);

  return (
    <section className="sorath-hero">
      <div className="sorath-hero-overlay" />
      <div className="container-fluid position-relative sorath-hero-content sorath-container-fluid">
        <div className="row align-items-end">
          <div className="col-xl-8 col-lg-6">
            <div
              className="sorath-hero-logo mb-4"
              data-aos="fade-down"
              data-aos-delay="100"
            >
              <img src={Logo} alt="IDBook" className="img-fluid" />
            </div>

            <div
              className="sorath-hero-badge mb-4 position-relative d-inline-flex align-items-center gap-2 overflow-hidden"
              data-aos="fade-down"
              data-aos-delay="220"
            >
              <span className="sorath-hero-badge-dot" />
              ALL ABOUT YOU
              <span className="sorath-hero-badge-rectangle" />
            </div>

            <h1 className="sorath-hero-title mb-4">
              {line1.letters}
              <br />
              {line2.letters}
            </h1>

            <p
              className="sorath-hero-description mb-4"
              data-aos="fade-up"
              data-aos-delay="380"
            >
              Whether it’s your home or office project,
              <br />
              Start simply search & buy
              <br />
              Whats you need & as per your size.
            </p>

            <div className="sorath-hero-actions">
              <Link to="/contact" className="sorath-hero-compass" aria-label="Design With Us">
                <span className="design-float-icon">
                  <FaCompassDrafting />
                </span>
                <span className="design-float-label">Design With Us</span>
              </Link>

              <Link
                to="/shop"
                className="sorath-primary-btn sorath-hero-shop-btn"
                data-aos="fade-up"
                data-aos-delay="520"
              >
                <span>Shop Now</span>
                <span className="sorath-hero-shop-arrow">
                  <FaArrowUp />
                </span>
              </Link>
            </div>
          </div>

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
