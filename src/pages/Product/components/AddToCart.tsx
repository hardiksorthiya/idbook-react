import { useRef } from 'react';
import { FiShoppingCart } from 'react-icons/fi';

const AddToCart = () => {
  const viewRef = useRef<HTMLSpanElement>(null);

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
      className="sorath-pd-btn sorath-pd-btn-outline"
      onMouseMove={moveView}
    >
      <FiShoppingCart /> Add To Cart
      <span ref={viewRef} className="sorath-pd-cursor" aria-hidden="true">
        Add To Cart
      </span>
    </button>
  );
};

export default AddToCart;
