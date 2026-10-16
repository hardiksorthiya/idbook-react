import { useRef, useState } from 'react';
import { FiZap } from 'react-icons/fi';
import { addToCart } from '../../../../services/cart';
import { loginPath } from '../../../../utils/loginPath';
import { getToken } from '../../../../utils/token';

const BuyNow = ({ productId }: { productId: number }) => {
  const viewRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState('Buy Now');

  const buy = () => {
    if (!getToken()) {
      window.location.href = loginPath();
      return;
    }

    setLabel('Please wait...');
    addToCart(productId)
      .then(() => {
        window.location.href = '/checkout';
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : 'Could not add to cart.';
        if (message === 'Please login first.') {
          window.location.href = loginPath();
          return;
        }
        setLabel(message);
      });
  };

  const moveView = (event: React.MouseEvent<HTMLButtonElement>) => {
    const view = viewRef.current;
    if (!view) return;

    const rect = event.currentTarget.getBoundingClientRect();
    view.style.left = `${event.clientX - rect.left}px`;
    view.style.top = `${event.clientY - rect.top}px`;
  };

  return (
    <button
      type="button"
      className="sorath-pd-btn sorath-pd-btn-fill"
      onMouseMove={moveView}
      onClick={buy}
    >
      <FiZap /> {label}
      <span ref={viewRef} className="sorath-pd-cursor" aria-hidden="true">
        Buy Now
      </span>
    </button>
  );
};

export default BuyNow;
