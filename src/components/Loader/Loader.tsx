import { useEffect, useState } from 'react';
import '../../assets/css/Common/Loader.css';
import Logo from '../../assets/images/logo.webp';

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, 2300);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="sorath-preloader">
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