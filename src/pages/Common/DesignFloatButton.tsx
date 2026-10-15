import { useEffect, useState } from 'react';
import { FaCompassDrafting } from 'react-icons/fa6';
import { FiX } from 'react-icons/fi';
import DesignForm from './DesignForm';
import '../../assets/css/Common/DesignFloatButton.css';

const DesignFloatButton = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(
    () => !document.querySelector('.sorath-hero'),
  );

  useEffect(() => {
    const hero = document.querySelector('.sorath-hero');
    if (!hero) return;

    const onScroll = () => {
      setVisible(hero.getBoundingClientRect().bottom <= 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      <button
        type="button"
        className="sorath-design-float"
        aria-label="Design With Us"
        onClick={() => setOpen(true)}
      >
        <span className="sorath-design-float-icon">
          <FaCompassDrafting />
        </span>

        <span className="sorath-design-float-label">
          Design With Us
        </span>
      </button>

      <div
        className={`sorath-design-popup${open ? ' sorath-design-popup-open' : ''}`}
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
        aria-label="Design With Us"
      >
        <button type="button" className="sorath-design-popup-backdrop" aria-label="Close" onClick={() => setOpen(false)} />
        <div className="sorath-design-popup-card">
          <button type="button" className="sorath-design-popup-close" aria-label="Close" onClick={() => setOpen(false)}>
            <FiX />
          </button>
          <h2>Design With Us</h2>
          <p>Share your space and our architectural team will connect with you.</p>
          <DesignForm />
        </div>
      </div>
    </>
  );
};

export default DesignFloatButton;