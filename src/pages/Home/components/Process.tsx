import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';

import 'swiper/css';
import '../../../assets/css/Home/Process.css';

import Step1Image1 from '../../../assets/images/step1.webp';
import Step1Image2 from '../../../assets/images/step1b.webp';

import Step2Image1 from '../../../assets/images/step2a.webp';
import Step2Image2 from '../../../assets/images/step2b.webp';
import Step2Image3 from '../../../assets/images/step2c.webp';
import Step2Image4 from '../../../assets/images/step2d.webp';

const HowItWorks = () => {
  return (
    <section className="sorath-process">

      <Swiper
        modules={[Mousewheel]}
        direction="horizontal"
        slidesPerView={1}
        speed={800}
        grabCursor={true}
        mousewheel={{
          enabled: true,
          forceToAxis: false,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        className="sorath-process-swiper"
      >

        {/* SLIDE 1 */}
        <SwiperSlide>
          <div className="sorath-process-slide">

            <div className="sorath-process-content">
              <small>01 / 05 — START YOUR JOURNEY</small>

              <h2>
                Your Home.
                <br />
                <span>Your Design.</span>
              </h2>

              <p>
                Turn your idea into a complete architectural design journey —
                from concept to a ready-to-build package.
              </p>
            </div>

            <div className="sorath-process-animation sorath-process-animation-one">
              <img src={Step1Image1} alt="Home design" />
              <img src={Step1Image2} alt="Home design" />
            </div>

          </div>
        </SwiperSlide>


        {/* SLIDE 2 */}
        <SwiperSlide>
          <div className="sorath-process-slide">

            <div className="sorath-process-content">
              <small>02 / 05 — BROWSE & SELECT</small>

              <h2>
                Find a design
                <br />
                <span>that feels right.</span>
              </h2>

              <p>
                Explore a curated collection of modern homes. Filter by
                style, rooms, size and architectural direction.
              </p>
            </div>

            <div className="sorath-process-animation sorath-process-animation-two">
              <img src={Step2Image1} alt="Design 1" />
              <img src={Step2Image2} alt="Design 2" />
              <img src={Step2Image3} alt="Design 3" />
              <img src={Step2Image4} alt="Design 4" />
            </div>

          </div>
        </SwiperSlide>


        {/* SLIDE 3 */}
        <SwiperSlide>
          <div className="sorath-process-slide">

            <div className="sorath-process-content">
              <small>03 / 05 — CART & PAYMENT</small>

              <h2>
                Found it?
                <br />
                <span>Make it yours.</span>
              </h2>

              <p>
                Add your design to the cart, check out, and finish with
                a secure payment.
              </p>
            </div>

            <div className="sorath-process-animation sorath-process-animation-three">

              <div className="sorath-process-card">
                <div className="sorath-process-card-image" />
                <strong>Modern Home</strong>
                <span>$49.00</span>
                <button>Add to Cart</button>
              </div>

              <div className="sorath-process-arrow">→</div>

              <div className="sorath-process-card">
                <strong>Your Cart</strong>
                <span>Modern Home</span>
                <b>$49.00</b>
                <button>Buy Now</button>
              </div>

              <div className="sorath-process-arrow">→</div>

              <div className="sorath-process-card sorath-payment">
                <div className="sorath-process-check">✓</div>
                <strong>Payment</strong>
                <span>Successful</span>
              </div>

            </div>

          </div>
        </SwiperSlide>


        {/* SLIDE 4 */}
        <SwiperSlide>
          <div className="sorath-process-slide">

            <div className="sorath-process-content">
              <small>04 / 05 — PACKAGE & SEND</small>

              <h2>
                Your design
                <br />
                <span>is on its way.</span>
              </h2>

              <p>
                Your design files are prepared as a complete package and
                sent digitally to your inbox.
              </p>
            </div>

            <div className="sorath-process-animation sorath-process-animation-four">

              <div className="sorath-process-line" />

              <div className="sorath-process-package">
                IDBOOK
              </div>

              <div className="sorath-process-mail">
                ✉
              </div>

            </div>

          </div>
        </SwiperSlide>


        {/* SLIDE 5 */}
        <SwiperSlide>
          <div className="sorath-process-slide">

            <div className="sorath-process-content">
              <small>05 / 05 — COMPLETE PACKAGE</small>

              <h2>
                Everything you
                <br />
                <span>need to build.</span>
              </h2>

              <p>
                Your final ZIP package brings together the visual, CAD
                and documentation files in one place.
              </p>
            </div>

            <div className="sorath-process-animation sorath-process-animation-five">

              <div className="sorath-process-zip">
                ZIP
              </div>

              <div className="sorath-process-file sorath-file-one">
                <strong>3D</strong>
                <b>3D View</b>
              </div>

              <div className="sorath-process-file sorath-file-two">
                <strong>CAD</strong>
                <b>CAD File</b>
              </div>

              <div className="sorath-process-file sorath-file-three">
                <strong>PDF</strong>
                <b>PDF File</b>
              </div>

            </div>

          </div>
        </SwiperSlide>

      </Swiper>

    </section>
  );
};

export default HowItWorks;