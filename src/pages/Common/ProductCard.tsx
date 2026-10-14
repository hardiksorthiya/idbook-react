import { useRef } from 'react';
import { FiHeart, FiShoppingCart, FiX } from 'react-icons/fi';

type ProductCardProps = {
  image: string;
  hoverImage: string;
  name: string;
  price: string;
  categories: string[];
  dimensions?: string;
  link: string;
  remove?: () => void;
};

const ProductCard = ({
  image,
  hoverImage,
  name,
  price,
  categories,
  dimensions,
  link,
  remove,
}: ProductCardProps) => {
  const viewRef = useRef<HTMLSpanElement>(null);

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

          <div className="sorath-product-categories">
            {categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
        </div>

        <div className="sorath-product-info">
          <h3>{name}</h3>

          <div className="sorath-product-meta">
            <span className="sorath-product-price">{price}</span>

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

        <button type="button" aria-label="Add to cart">
          <FiShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;