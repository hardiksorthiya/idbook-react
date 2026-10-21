import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import "swiper/css";

import Heading from "../../Common/Heading";
import "../../../assets/css/Home/Testimonials.css";

import ClientImage from "../../../assets/images/step1.webp";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Homeowner",
    image: ClientImage,
    review:
      "Our new living room feels bigger, brighter and truly ours. Every detail was planned with so much care.",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Startup Founder",
    image: ClientImage,
    review:
      "They finished our office interior on time and on budget. The team was friendly and very professional.",
  },
  {
    id: 3,
    name: "Anjali Verma",
    role: "Homemaker",
    image: ClientImage,
    review:
      "The modular kitchen they designed is both beautiful and practical. Cooking has become a joy again!",
  },
  {
    id: 4,
    name: "Amit Patel",
    role: "Business Owner",
    image: ClientImage,
    review:
      "Excellent design, thoughtful planning, and a smooth experience from the first consultation to completion.",
  },
  {
    id: 5,
    name: "Neha Shah",
    role: "Homeowner",
    image: ClientImage,
    review:
      "They understood our style perfectly and transformed our home into a comfortable, elegant space.",
  },
];

const Testimonials = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="sorath-testimonials">
      <div className="container-fluid sorath-container-fluid">
        <Heading
          badge="Our Clients Say"
          title="Here's What"
          highlight="Warm Words"
          afterHighlight="Our Clients Say"
          description=""
        />

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          slidesPerView={1}
          spaceBetween={20}
          speed={600}
          grabCursor
          breakpoints={{
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          className="sorath-testimonials-swiper"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="sorath-testimonial-card">
                <p className="sorath-testimonial-review">
                  “{item.review}”
                </p>

                <div className="sorath-testimonial-client">
                  <img src={item.image} alt={item.name} />

                  <div>
                    <h3>{item.name}</h3>
                    <span>{item.role}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="sorath-testimonials-controls">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <FiArrowLeft />
          </button>

          <div className="sorath-testimonials-pagination">
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Show testimonial ${index + 1}`}
                className={activeIndex === index ? "is-active" : ""}
                onClick={() => swiperRef.current?.slideTo(index)}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;