import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';

import 'swiper/css';
import '../../../assets/css/About/Gallery.css';

import GalleryImage1 from '../../../assets/images/step1.webp';
import GalleryImage2 from '../../../assets/images/step1.webp';
import GalleryImage3 from '../../../assets/images/step1.webp';
import GalleryImage4 from '../../../assets/images/step1.webp';

const galleryImages = [
  { id: 1, image: GalleryImage1, title: 'Modern Staircase' },
  { id: 2, image: GalleryImage2, title: 'Luxury Kitchen' },
  { id: 3, image: GalleryImage3, title: 'Modern Living Room' },
  { id: 4, image: GalleryImage4, title: 'Elegant Dining Room' },
];

const Gallery = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="sorath-gallery">
      <div className="container-fluid sorath-container-fluid">
        <div className="row align-items-center g-4">
          <div className="col-lg-4">
            <div className="sorath-gallery-content">
             <div className="sorath-section-badge overflow-hidden">
              <span />
              About IDBOOK
            </div>

              <h2>
                Interior
                <br />
                Design
              </h2>

              <p>
                Explore interiors from around the world, then find the plan
                and model that fits your space.
              </p>

              <a href="/gallery" className="sorath-gallery-btn">
                View Gallery
                <span>
                  <FiArrowUpRight />
                </span>
              </a>
            </div>
          </div>

          <div className="col-lg-8">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView={1.15}
              spaceBetween={16}
              loop
              grabCursor
              speed={700}
              breakpoints={{
                576: { slidesPerView: 1.5, spaceBetween: 16 },
                768: { slidesPerView: 2, spaceBetween: 18 },
                1200: { slidesPerView: 3, spaceBetween: 20 },
              }}
              className="sorath-gallery-swiper"
            >
              {galleryImages.map((item) => (
                <SwiperSlide key={item.id}>
                  <a
                    href="/gallery"
                    className="sorath-gallery-item"
                    aria-label={`View ${item.title}`}
                  >
                    <img src={item.image} alt={item.title} />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="sorath-gallery-controls">
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <FiArrowLeft />
              </button>

              <button
                type="button"
                aria-label="Next image"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;