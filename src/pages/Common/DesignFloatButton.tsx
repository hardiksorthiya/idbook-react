import { useEffect, useState } from 'react';
import { FaCompassDrafting } from 'react-icons/fa6';
import '../../assets/css/Common/DesignFloatButton.css';

const DesignFloatButton = () => {
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
    <a
      href="/contact"
      className="sorath-design-float"
      aria-label="Design With Us"
    >
      <span className="sorath-design-float-icon">
        <FaCompassDrafting />
      </span>

      <span className="sorath-design-float-label">
        Design With Us
      </span>
    </a>
  );
};

export default DesignFloatButton;