import { useRef, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { addToCart } from '../../../../services/cart';
import { loginPath } from '../../../../utils/loginPath';

const AddToCart = ({ productId }: { productId: number }) => {
  const viewRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState('Add To Cart');

  const moveView = (event: React.MouseEvent<HTMLButtonElement>) => {
    const view = viewRef.current;
    if (!view) return;

    const rect = event.currentTarget.getBoundingClientRect();
    view.style.left = `${event.clientX - rect.left}px`;
    view.style.top = `${event.clientY - rect.top}px`;
  };

  const add = () => {
    setLabel('Adding...');
    addToCart(productId)
      .then((data) => setLabel(data?.message || 'Added to cart.'))
      .catch((error) => {
        const message = error instanceof Error ? error.message : 'Could not add to cart.';
        if (message === 'Please login first.') {
          window.location.href = loginPath();
          return;
        }
        setLabel(message);
      });
  };

  return (
    <button
      type="button"
      className="sorath-pd-btn sorath-pd-btn-outline"
      onMouseMove={moveView}
      onClick={add}
    >
      <FiShoppingCart /> {label}
      <span ref={viewRef} className="sorath-pd-cursor" aria-hidden="true">
        Add To Cart
      </span>
    </button>
  );
};

export default AddToCart;
