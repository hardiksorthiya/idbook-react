import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

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
  const [activeService, setActiveService] = useState(0);

  const activeItem = services[activeService];

  return (
    <section className="sorath-services">
      <div className="container-fluid sorath-container-fluid">
        {/* ================================
            COMMON SECTION HEADING
        ================================= */}

        <div className="row sorath-section-heading">
          <div className="col-lg-4 col-md-12">
            <div className="sorath-section-badge">
              <span />
              Our Services
            </div>
          </div>

          <div className="col-lg-8 col-md-12">
            <div className="sorath-section-heading-content">
              <h2 className="sorath-section-title">
                Explore our{' '}
                <span>
                  comprehensive
                  <br />
                  interior design
                </span>{' '}
                services
              </h2>

              <p className="sorath-section-description">
                From private homes to offices, retail, and outdoor
                spaces, we design interiors that are practical,
                refined, and built around how you live and work.
              </p>
            </div>
          </div>
        </div>

        {/* ================================
            SERVICES CONTENT
        ================================= */}

        <div className="row align-items-center sorath-services-content">
          {/* Image */}
          <div className="col-lg-6">
            <div className="sorath-service-image">
              <img
                key={activeItem.image}
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
                  onMouseEnter={() => setActiveService(index)}
                  onClick={() => setActiveService(index)}
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
    </section>
  );
};

export default Services;