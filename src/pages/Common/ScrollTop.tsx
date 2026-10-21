import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiArrowUp } from 'react-icons/fi';

import '../../assets/css/Common/ScrollTop.css';

const ScrollTop = () => {
  const { pathname, search } = useLocation();
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  useEffect(() => {
    const update = () => {
      const top = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setPercent(height > 0 ? Math.round((top / height) * 100) : 0);
      setVisible(top > 100);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <button
      type="button"
      className={`sorath-scroll-top ${visible ? 'is-active' : ''}`}
      style={{
        background: `conic-gradient(#fff ${percent}%, var(--primary-sorath-color) ${percent}%)`,
      }}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <span>{percent < 96 ? `${percent}%` : <FiArrowUp />}</span>
    </button>
  );
};

export default ScrollTop;
