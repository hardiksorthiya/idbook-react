import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

import Heading from '../../Common/Heading';

import '../../../assets/css/Home/Services.css';

import ServiceImage1 from '../../../assets/images/step1.webp';
import ServiceImage2 from '../../../assets/images/step1.webp';
import ServiceImage3 from '../../../assets/images/step1.webp';
import ServiceImage4 from '../../../assets/images/step1.webp';
import ServiceImage5 from '../../../assets/images/step1.webp';

const services = [
  {
    number: '01',
    title: 'Residential Interior Design',
    image: ServiceImage1,
    text: 'Room makeovers and full home transformations planned around how you live.',
  },
  {
    number: '02',
    title: 'Commercial Interior Design',
    image: ServiceImage2,
    text: 'Offices, retail floors, and hospitality spaces designed to work for staff and guests.',
  },
  {
    number: '03',
    title: 'Interior Design Consultation',
    image: ServiceImage3,
    text: 'Advice on layout, color, materials, and finishes before you start the work.',
  },
  {
    number: '04',
    title: 'Outdoor & Landscape Design',
    image: ServiceImage4,
    text: 'Gardens, patios, terraces, and decks planned as an extension of the interior.',
  },
  {
    number: '05',
    title: 'Renovation and Remodeling',
    image: ServiceImage5,
    text: 'Existing rooms updated so they look current and function better every day.',
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeService, setActiveService] = useState(0);

  const activeItem = services[activeService];
  const lastService = services.length - 1;

  const isPinned = () => {
    const section = sectionRef.current;
    if (!section) return false;
    return section.offsetHeight - window.innerHeight >= window.innerHeight;
  };

  const goToService = (index: number) => {
    const section = sectionRef.current;
    if (!section || !isPinned()) {
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
    const section = sectionRef.current;
    if (!section) return;

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
  }, [lastService]);

  return (
    <>
    <section ref={sectionRef} className="sorath-services">
      <div className="sorath-services-pin">
      <div className="container-fluid sorath-container-fluid">
      {/* Section Heading */}
        <Heading
          badge="Our Services"
          title="Explore our"
          highlight="comprehensive interior design "
          afterHighlight="services"
          description="From private homes to offices, retail, and outdoor spaces, we design interiors that are practical, refined, and built around how you live and work."
        />

        {/* ================================
            SERVICES CONTENT
        ================================= */}

        <div className="row align-items-center sorath-services-content">
          {/* Image */}
          <div className="col-lg-6">
            <div className="sorath-service-image">
              <img
                key={activeItem.number}
                src={activeItem.image}
                alt={activeItem.title}
              />

              <div className="sorath-service-image-content">
                <p>{activeItem.text}</p>
              </div>
            </div>
          </div>

          {/* Service List */}
          <div className="col-lg-6">
            <div className="sorath-service-list">
              {services.map((service, index) => (
                <div
                  key={service.number}
                  className={`sorath-service-item ${
                    activeService === index
                      ? 'sorath-service-item-active'
                      : ''
                  }`}
                  onMouseEnter={() => {
                    if (!isPinned()) setActiveService(index);
                  }}
                  onClick={() => goToService(index)}
                >
                  <span className="sorath-service-number">
                    {service.number}
                  </span>

                  <h5 className="sorath-service-title">
                    {service.title}
                  </h5>

                  <a
                    href="/service-details"
                    className="sorath-service-arrow"
                    aria-label={`View ${service.title}`}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <FiArrowUpRight />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
    </>
  );
};

export default Services;