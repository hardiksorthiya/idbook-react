import { useRef, useState } from 'react';
import { FiHeart, FiShoppingCart, FiX } from 'react-icons/fi';
import { addToCart } from '../../../services/cart';

type ProductCardProps = {
  image: string;
  hoverImage: string;
  name: string;
  price: string;
  mrp?: string;
  discount?: number;
  categories: string[];
  dimensions?: string;
  link: string;
  productId?: number;
  remove?: () => void;
};

const ProductCard = ({
  image,
  hoverImage,
  name,
  price,
  mrp,
  discount,
  categories,
  dimensions,
  link,
  productId,
  remove,
}: ProductCardProps) => {
  const viewRef = useRef<HTMLSpanElement>(null);
  const [cartLabel, setCartLabel] = useState('Add to cart');

  const moveView = (event: React.MouseEvent<HTMLDivElement>) => {
    const view = viewRef.current;
    if (!view) return;

    const rect = event.currentTarget.getBoundingClientRect();
    view.style.left = `${event.clientX - rect.left}px`;
    view.style.top = `${event.clientY - rect.top}px`;
  };

  return (
    <div className="sorath-product-card">
      <a href={link} className="sorath-product-card-link">
        <div
          className="sorath-product-image sorath-product-image-flip"
          onMouseMove={moveView}
        >
          <div className="sorath-product-image-inner">
            <div className="sorath-product-image-front">
              <img src={image} alt={name} />
            </div>

            <div className="sorath-product-image-back">
              <img src={hoverImage} alt={`${name} alternate view`} />
            </div>
          </div>

          <span ref={viewRef} className="sorath-product-view" aria-hidden="true">
            View More
          </span>

          {!!discount && discount > 0 && (
            <span className="sorath-product-badge">-{discount}%</span>
          )}

          <div className="sorath-product-categories">
            {categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
        </div>

        <div className="sorath-product-info">
          <h3>{name}</h3>

          <div className="sorath-product-meta">
            <span className="sorath-product-price">
              {price}
              {mrp && <span className="sorath-product-mrp">{mrp}</span>}
            </span>

            {dimensions && (
              <span className="sorath-product-dimensions">
                <span>▦</span> {dimensions}
              </span>
            )}
          </div>
        </div>
      </a>

      <div className="sorath-product-actions">
        <button
          type="button"
          aria-label={remove ? `Remove ${name}` : 'Add to wishlist'}
          onClick={remove}
        >
          {remove ? <FiX /> : <FiHeart />}
        </button>

        <button
          type="button"
          aria-label={cartLabel}
          onClick={() => {
            if (!productId) return;
            setCartLabel('Adding...');
            addToCart(productId)
              .then((data) => setCartLabel(data?.message || 'Added to cart'))
              .catch((error) => setCartLabel(error instanceof Error ? error.message : 'Could not add to cart.'));
          }}
        >
          <FiShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;