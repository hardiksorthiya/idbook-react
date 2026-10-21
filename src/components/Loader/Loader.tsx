import { useEffect, useState } from 'react';
import '../../assets/css/Common/Loader.css';
import Logo from '../../assets/images/logo.webp';

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Bars finish covering ~1.4s; fade out so white wipe never sits as a blank page
    const leaveTimer = window.setTimeout(() => setLeaving(true), 1400);
    const hideTimer = window.setTimeout(() => setIsVisible(false), 1800);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`sorath-preloader${leaving ? ' is-leave' : ''}`}>
      <div className="sorath-site-name">
        <img
          src={Logo}
          alt="IDBook"
          className="sorath-site-logo"
        />
      </div>

      <div className="sorath-preloader-gutters">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="sorath-preloader-bar" key={index}>
            <div className="sorath-preloader-inner-bar" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
