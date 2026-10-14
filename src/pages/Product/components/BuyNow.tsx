import { useRef } from 'react';
import { FiZap } from 'react-icons/fi';

const BuyNow = () => {
  const viewRef = useRef<HTMLSpanElement>(null);

  const moveView = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const view = viewRef.current;
    if (!view) return;

    const rect = event.currentTarget.getBoundingClientRect();
    view.style.left = `${event.clientX - rect.left}px`;
    view.style.top = `${event.clientY - rect.top}px`;
  };

  return (
    <a
      href="/checkout"
      className="sorath-pd-btn sorath-pd-btn-fill"
      onMouseMove={moveView}
    >
      <FiZap /> Buy Now
      <span ref={viewRef} className="sorath-pd-cursor" aria-hidden="true">
        Buy Now
      </span>
    </a>
  );
};

export default BuyNow;
