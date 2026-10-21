import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';

import 'swiper/css';
import '../../../assets/css/About/Gallery.css';

import GalleryImage1 from '../../../assets/images/gallery/gallary-img-1.png';
import GalleryImage2 from '../../../assets/images/gallery/gallary-img-2.png';
import GalleryImage3 from '../../../assets/images/gallery/gallary-img-3.png';
import GalleryImage4 from '../../../assets/images/gallery/gallary-img-4.png';

const galleryImages = [
  { id: 1, image: GalleryImage1, title: 'Modern Living Room' },
  { id: 2, image: GalleryImage2, title: 'Elegant Dining Room' },
  { id: 3, image: GalleryImage3, title: 'Modern Staircase' },
  { id: 4, image: GalleryImage4, title: 'Luxury Kitchen' },
];

const Gallery = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="sorath-gallery sorath-about-gallery">
      <div className="container-fluid sorath-container-fluid">
        <div className="row align-items-center g-4">
          <div className="col-lg-4">
            <div className="sorath-gallery-content">
              <div className="sorath-section-badge overflow-hidden">
                <span />
                Our Gallery
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

              <Link to="/gallery" className="sorath-gallery-btn">
                View Gallery
                <span>
                  <FiArrowUpRight />
                </span>
              </Link>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="sorath-gallery-carousel-wrap">
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                slidesPerView={1.25}
                spaceBetween={20}
                loop
                grabCursor
                speed={700}
                breakpoints={{
                  576: { slidesPerView: 1.6, spaceBetween: 20 },
                  768: { slidesPerView: 2.1, spaceBetween: 22 },
                  1200: { slidesPerView: 2.55, spaceBetween: 24 },
                }}
                className="sorath-gallery-swiper"
              >
                {galleryImages.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Link
                      to="/gallery"
                      className="sorath-gallery-item"
                      aria-label={`View ${item.title}`}
                    >
                      <img src={item.image} alt={item.title} />
                    </Link>
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
      </div>
    </section>
  );
};

export default Gallery;
