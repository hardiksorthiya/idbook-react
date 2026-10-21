import { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import '../../../assets/css/Gallery/Gallery.css';
import GalleryCard from './GalleryCard';

import Cover from '../../../assets/images/gallery/blog-details-img.png';
import Post1 from '../../../assets/images/gallery/post-1.jpg';
import Post2 from '../../../assets/images/gallery/post-2.png';
import Post3 from '../../../assets/images/gallery/post-3.png';
import Post4 from '../../../assets/images/gallery/post-4.png';
import Post5 from '../../../assets/images/gallery/post-5.png';
import Post6 from '../../../assets/images/gallery/post-6.png';
import Post7 from '../../../assets/images/gallery/post-7.png';
import Post8 from '../../../assets/images/gallery/post-8.png';
import Detail1 from '../../../assets/images/gallery/blog-details-img-1.png';
import Detail2 from '../../../assets/images/gallery/blog-details-img-2.png';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'creative-art', label: 'Creative Art' },
  { id: 'exterior', label: 'Exterior' },
];

const items = [
  { image: Cover, alt: 'Interior design', tag: 'Creative Art', category: 'creative-art', size: 'is-wide' },
  { image: Post1, alt: 'Architecture', tag: 'Creative Art', category: 'creative-art', size: '' },
  { image: Post2, alt: 'Interior design', tag: 'Creative Art', category: 'creative-art', size: '' },
  { image: Post3, alt: 'Exterior', tag: 'Exterior', category: 'exterior', size: '' },
  { image: Post8, alt: '3D visualisation', tag: 'Creative Art', category: 'creative-art', size: 'is-tall' },
  { image: Detail1, alt: 'Architecture', tag: 'Creative Art', category: 'creative-art', size: '' },
  { image: Detail2, alt: 'Interior design', tag: 'Creative Art', category: 'creative-art', size: '' },
  { image: Post4, alt: 'Exterior', tag: 'Exterior', category: 'exterior', size: 'is-wide' },
  { image: Post5, alt: '3D visualisation', tag: 'Creative Art', category: 'creative-art', size: '' },
  { image: Post6, alt: 'Architecture', tag: 'Creative Art', category: 'creative-art', size: '' },
  { image: Post7, alt: 'Exterior', tag: 'Exterior', category: 'exterior', size: '' },
];

const GalleryGrid = () => {
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  const current = filters.find((item) => item.id === filter) ?? filters[0];
  const visible = items.filter((item) => filter === 'all' || item.category === filter);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.sorath-gallery-filter')) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <section className="sorath-gallery-page">
      <div className="container-fluid sorath-container-fluid">
        <div className={`sorath-gallery-filter ${open ? 'is-open' : ''}`}>
          <button
            type="button"
            className="sorath-gallery-filter-btn"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {current.label}
            <FiChevronDown />
          </button>

          {open && (
            <ul>
              {filters.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={filter === item.id ? 'is-active' : ''}
                    onClick={() => {
                      setFilter(item.id);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="sorath-gallery-grid">
          {visible.map((item) => (
            <div className={`sorath-gallery-item ${item.size}`} key={item.image}>
              <GalleryCard
                image={item.image}
                alt={item.alt}
                tag={item.tag}
                onOpen={() => setActive(item.image)}
              />
            </div>
          ))}
        </div>
      </div>

      {active && (
        <button
          type="button"
          className="sorath-gallery-view"
          aria-label="Close image"
          onClick={() => setActive('')}
        >
          <img src={active} alt="" />
        </button>
      )}
    </section>
  );
};

export default GalleryGrid;
