import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

import '../../../assets/css/Home/Process.css';

import Step1Image1 from '../../../assets/images/step1.webp';
import Step1Image2 from '../../../assets/images/step1b.webp';

import Step2Image1 from '../../../assets/images/step2a.webp';
import Step2Image2 from '../../../assets/images/step2b.webp';
import Step2Image3 from '../../../assets/images/step2c.webp';
import Step2Image4 from '../../../assets/images/step2d.webp';

const HowItWorks = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const wheelLock = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const titles = [
    'Welcome to iDBook',
    'Browse & Select',
    'Cart & Payment',
    'Package & Send',
    'Complete Design Package',
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (event: WheelEvent) => {
      const swiper = swiperRef.current;
      if (!swiper) return;
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;

      const top = section.getBoundingClientRect().top;
      const down = event.deltaY > 0;
      const aligned = top <= 2 && top >= -2;

      // If an upward scroll nudged the section down, pull it back
      // and move to the previous slide.
      if (!aligned) {
        if (down || swiper.isBeginning || top <= 2 || top > 160) return;
        event.preventDefault();
        window.scrollTo({ top: window.scrollY + top });
        if (wheelLock.current) return;
        wheelLock.current = true;
        swiper.slidePrev();
        window.setTimeout(() => {
          wheelLock.current = false;
        }, 800);
        return;
      }

      if ((down && swiper.isEnd) || (!down && swiper.isBeginning)) return;

      event.preventDefault();
      if (wheelLock.current) return;

      wheelLock.current = true;
      if (down) swiper.slideNext();
      else swiper.slidePrev();
      window.setTimeout(() => {
        wheelLock.current = false;
      }, 800);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sorath-process"
    >
      {/* Background */}
      <div className="sorath-process-grid" />
      <div className="sorath-process-vignette" />

      {/* Top HUD */}
      <div className="sorath-process-hud">
        <div className="container-fluid sorath-container-fluid d-flex align-items-center justify-content-between gap-3">
          <span className="sorath-process-kicker">
            How iDBook works
          </span>

          <div className="sorath-process-counter d-flex align-items-center gap-3">
            <div className="sorath-cube-scene">
              <div className="sorath-cube">
                <div className="sorath-cube-face sorath-cube-front">
                  <span
                    className="sorath-cube-fill"
                    style={{
                      height: `${((activeIndex + 1) / 5) * 100}%`,
                    }}
                  />
                  <b>{String(activeIndex + 1).padStart(2, '0')}</b>
                </div>

                <div className="sorath-cube-face sorath-cube-back">
                  3D
                </div>

                <div className="sorath-cube-face sorath-cube-right">
                  CAD
                </div>

                <div className="sorath-cube-face sorath-cube-left">
                  PDF
                </div>

                <div className="sorath-cube-face sorath-cube-top">
                  PLAN
                </div>

                <div className="sorath-cube-face sorath-cube-bottom">
                  BUILD
                </div>
              </div>
            </div>

            <span>/ 05</span>

            <div className="sorath-process-line">
              <i
                style={{
                  transform: `scaleX(${(activeIndex + 1) / 5})`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right dots */}
      <div className="sorath-process-dots d-none d-lg-flex flex-column align-items-center gap-2">
        {titles.map((title, index) => (
          <button
            key={title}
            type="button"
            className={`sorath-process-dot ${
              activeIndex === index
                ? 'sorath-process-dot-active'
                : ''
            }`}
            aria-label={`${index + 1}. ${title}`}
            onClick={() => swiperRef.current?.slideTo(index)}
          />
        ))}
      </div>

      {/* Bottom label */}
      <div className="sorath-process-foot d-none d-lg-block">
        <div className="container-fluid sorath-container-fluid text-end">
          <span className="sorath-process-label">
            {titles[activeIndex]}
          </span>
        </div>
      </div>

      {/* Slides */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        slidesPerView={1}
        speed={800}
        grabCursor
        allowTouchMove
        className="sorath-process-swiper"
      >
        {/* ==================== 01 ==================== */}
        <SwiperSlide>
          <div className="sorath-process-slide">
            <div className="container-fluid sorath-container-fluid h-100">
              <div className="row h-100 align-items-center">
                <div className="col-lg-5 sorath-process-copy">
                  <div className="sorath-process-step">
                    01 / 05 — Start Your Journey
                  </div>

                  <h2 className="sorath-process-title">
                    Your Home.
                    <br />
                    <span>Your Design.</span>
                  </h2>

                  <p className="sorath-process-desc">
                    Turn your idea into a complete architectural
                    design journey — from concept to a
                    ready-to-build package.
                  </p>

                  <div className="sorath-process-pill">
                    ✦ Design • Visualize • Build
                  </div>
                </div>

                <div className="col-lg-7 sorath-process-visual">
                  <div className="sorath-process-glow" />

                  <div className="sorath-flip-wrap">
                    <div className="sorath-flip">
                      <img
                        src={Step1Image1}
                        alt="Bedroom interior"
                      />

                      <img
                        src={Step1Image2}
                        alt="Bedroom plan and elevations"
                      />
                    </div>
                  </div>

                  <div className="sorath-process-note">
                    <div className="sorath-process-mini">
                      Your vision
                    </div>

                    <strong>
                      A home made for you.
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* ==================== 02 ==================== */}
        <SwiperSlide>
          <div className="sorath-process-slide">
            <div className="container-fluid sorath-container-fluid h-100">
              <div className="row h-100 align-items-center">
                <div className="col-lg-5 sorath-process-copy">
                  <div className="sorath-process-step">
                    02 / 05 — Browse &amp; Select
                  </div>

                  <h2 className="sorath-process-title">
                    Find a design
                    <br />
                    <span>that feels right.</span>
                  </h2>

                  <p className="sorath-process-desc">
                    Explore a curated collection of modern homes.
                    Filter by style, rooms, size and architectural
                    direction.
                  </p>
                </div>

                <div className="col-lg-7 sorath-process-visual">
                  <div className="sorath-process-gallery">
                    <div className="sorath-gallery-card sorath-gallery-1">
                      <img src={Step2Image1} alt="Vanity" />
                    </div>

                    <div className="sorath-gallery-card sorath-gallery-2">
                      <img src={Step2Image2} alt="Kitchen" />
                    </div>

                    <div className="sorath-gallery-card sorath-gallery-3">
                      <img src={Step2Image3} alt="Living room" />
                    </div>

                    <div className="sorath-gallery-card sorath-gallery-4">
                      <img src={Step2Image4} alt="Interior" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* ==================== 03 ==================== */}
        <SwiperSlide>
          <div className="sorath-process-slide">
            <div className="container-fluid sorath-container-fluid h-100">
              <div className="row h-100 align-items-center">
                <div className="col-lg-5 sorath-process-copy">
                  <div className="sorath-process-step">
                    03 / 05 — Cart &amp; Payment
                  </div>

                  <h2 className="sorath-process-title">
                    Found it?
                    <br />
                    <span>Make it yours.</span>
                  </h2>

                  <p className="sorath-process-desc">
                    Add your design to the cart, check out,
                    and finish with a secure payment.
                  </p>
                </div>

                <div className="col-lg-7 sorath-process-visual">
                  <div className="sorath-payment-animation">
                    <div className="sorath-design-card">
                      <img
                        src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80"
                        alt="Modern Home Design"
                      />

                      <h4>Modern Home Design</h4>

                      <small>$49.00</small>

                      <button type="button">
                        Add to Cart
                      </button>
                    </div>

                    <span className="sorath-payment-arrow sorath-payment-arrow-1" />

                    <div className="sorath-checkout-card">
                      <div className="sorath-checkout-head">
                        Your Cart <span>(1)</span>
                      </div>

                      <div className="sorath-checkout-row">
                        <span>Modern Home Design</span>
                        <strong>$49.00</strong>
                      </div>

                      <div className="sorath-checkout-total">
                        <span>Total</span>
                        <span>$49.00</span>
                      </div>

                      <button type="button">
                        Buy Now →
                      </button>
                    </div>

                    <span className="sorath-payment-arrow sorath-payment-arrow-2" />

                    <div className="sorath-payment-phone">
                      <div className="sorath-payment-success">
                        <div className="sorath-payment-check">
                          ✓
                        </div>

                        <h3>Payment Successful</h3>

                        <p>Your package is ready.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* ==================== 04 ==================== */}
        <SwiperSlide>
          <div className="sorath-process-slide">
            <div className="container-fluid sorath-container-fluid h-100">
              <div className="row h-100 align-items-center">
                <div className="col-lg-5 sorath-process-copy">
                  <div className="sorath-process-step">
                    04 / 05 — Package &amp; Send
                  </div>

                  <h2 className="sorath-process-title">
                    Your design
                    <br />
                    <span>is on its way.</span>
                  </h2>

                  <p className="sorath-process-desc">
                    Your design files are prepared as a complete
                    package and sent digitally to your inbox.
                  </p>
                </div>

                <div className="col-lg-7 sorath-process-visual">
                  <div className="sorath-send-animation">
                    <div className="sorath-send-path" />

                    <div className="sorath-send-box">
                      iDBook
                    </div>

                    <div className="sorath-send-mailbox">
                      ✉
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* ==================== 05 ==================== */}
        <SwiperSlide>
          <div className="sorath-process-slide">
            <div className="container-fluid sorath-container-fluid h-100">
              <div className="row h-100 align-items-center">
                <div className="col-lg-5 sorath-process-copy">
                  <div className="sorath-process-step">
                    05 / 05 — Complete Package
                  </div>

                  <h2 className="sorath-process-title">
                    Everything you
                    <br />
                    <span>need to build.</span>
                  </h2>

                  <p className="sorath-process-desc">
                    Your final ZIP package brings together the
                    visual, CAD and documentation files in one
                    place.
                  </p>
                </div>

                <div className="col-lg-7 sorath-process-visual">
                  <div className="sorath-files-animation">
                    <div className="sorath-zip">
                      ZIP
                    </div>

                    <div className="sorath-file-card sorath-file-1">
                      <div className="sorath-file-icon">
                        ◇
                      </div>

                      <h4>3D View</h4>

                      <p>High quality 3D rendering</p>
                    </div>

                    <div className="sorath-file-card sorath-file-2">
                      <div className="sorath-file-icon">
                        ⌗
                      </div>

                      <h4>CAD File</h4>

                      <p>DWG / DXF format</p>
                    </div>

                    <div className="sorath-file-card sorath-file-3">
                      <div className="sorath-file-icon">
                        ▤
                      </div>

                      <h4>PDF File</h4>

                      <p>Details &amp; specifications</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default HowItWorks;