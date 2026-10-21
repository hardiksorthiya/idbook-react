import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

import Heading from '../../Common/Heading';
import { getCategories } from '../../../../services/categories';
import type { CategoryItem } from '../../../../types/category';
import FallbackImage from '../../../assets/images/step1.webp';

import '../../../assets/css/Home/Services.css';

const plain = (html: string) => html.replace(/<[^>]+>/g, '').trim();

const Services = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [activeService, setActiveService] = useState(0);

  const activeItem = categories[activeService];
  const lastService = Math.max(categories.length - 1, 1);

  const isPinned = () => {
    const section = sectionRef.current;
    if (!section) return false;
    return section.offsetHeight - window.innerHeight >= window.innerHeight;
  };

  const goToService = (index: number) => {
    const section = sectionRef.current;
    if (!section || !isPinned() || categories.length < 2) {
      setActiveService(index);
      return;
    }

    const start = section.getBoundingClientRect().top + window.scrollY;
    const distance = section.offsetHeight - window.innerHeight;

    window.scrollTo({
      top: start + (distance * index) / lastService,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || categories.length < 2) return;

    let frame = 0;

    const update = () => {
      if (!isPinned()) return;

      const distance = section.offsetHeight - window.innerHeight;
      const passed = Math.min(
        Math.max(-section.getBoundingClientRect().top, 0),
        distance,
      );
      const progress = passed / distance;

      setActiveService((current) => {
        const next = Math.min(lastService, Math.round(progress * lastService));
        return current === next ? current : next;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [lastService, categories.length]);

  return (
    <section ref={sectionRef} className="sorath-services">
      <div className="sorath-services-pin">
        <div className="container-fluid sorath-container-fluid">
          <Heading
            badge="Our Services"
            title="Explore our"
            highlight="comprehensive interior design "
            afterHighlight="services"
            description="From private homes to offices, retail, and outdoor spaces, we design interiors that are practical, refined, and built around how you live and work."
          />

          {activeItem && (
            <div className="row align-items-center sorath-services-content">
              <div className="col-lg-6">
                <div className="sorath-service-image">
                  <img
                    key={activeItem.id}
                    src={activeItem.image_url || activeItem.thumb_url || FallbackImage}
                    alt={activeItem.name}
                  />

                  <div className="sorath-service-image-content">
                    <p>{plain(activeItem.description) || activeItem.name}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="sorath-service-list">
                  {categories.map((category, index) => (
                    <div
                      key={category.id}
                      className={`sorath-service-item ${
                        activeService === index ? 'sorath-service-item-active' : ''
                      }`}
                      onMouseEnter={() => {
                        if (!isPinned()) setActiveService(index);
                      }}
                      onClick={() => goToService(index)}
                    >
                      <span className="sorath-service-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <h5 className="sorath-service-title">{category.name}</h5>

                      <Link
                        to={`/shop?category=${category.slug}`}
                        className="sorath-service-arrow"
                        aria-label={`View ${category.name}`}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <FiArrowUpRight />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
