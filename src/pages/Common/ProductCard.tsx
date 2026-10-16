import { useEffect, useRef, useState } from 'react';
import { FiHeart, FiShoppingCart, FiX } from 'react-icons/fi';
import { addToCart } from '../../../services/cart';
import { loginPath } from '../../../utils/loginPath';
import { toggleWishlist } from '../../../services/wishlist';

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
  const timer = useRef<number | null>(null);
  const wishTimer = useRef<number | null>(null);
  const [cartNote, setCartNote] = useState('');
  const [wishNote, setWishNote] = useState('');

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
    if (wishTimer.current) window.clearTimeout(wishTimer.current);
  }, []);

  const showNote = (text: string) => {
    setCartNote(text);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCartNote(''), 2000);
  };

  const showWish = (text: string) => {
    setWishNote(text);
    if (wishTimer.current) window.clearTimeout(wishTimer.current);
    wishTimer.current = window.setTimeout(() => setWishNote(''), 2000);
  };

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

      <div className={`sorath-product-actions${cartNote || wishNote ? ' is-open' : ''}`}>
        <div className="sorath-product-cart">
          {wishNote && <span className="sorath-product-cart-note">{wishNote}</span>}
          <button
            type="button"
            aria-label={remove ? `Remove ${name}` : (wishNote || 'Add to wishlist')}
            onClick={() => {
              if (remove) {
                remove();
                return;
              }
              if (!productId || wishNote === 'Saving...') return;
              setWishNote('Saving...');
              toggleWishlist(productId)
                .then((data) => showWish(data.message || 'Added to wishlist.'))
                .catch((error) => {
                  const message = error instanceof Error ? error.message : 'Could not update wishlist.';
                  if (message === 'Please login first.') {
                    window.location.href = loginPath();
                    return;
                  }
                  showWish(message);
                });
            }}
          >
            {remove ? <FiX /> : <FiHeart />}
          </button>
        </div>

        <div className="sorath-product-cart">
          {cartNote && <span className="sorath-product-cart-note">{cartNote}</span>}
          <button
            type="button"
            className={cartNote === 'Added to cart' ? 'is-added' : ''}
            aria-label={cartNote || 'Add to cart'}
            onClick={() => {
              if (!productId || cartNote === 'Adding...') return;
              setCartNote('Adding...');
              addToCart(productId)
                .then(() => showNote('Added to cart'))
                .catch((error) => {
                  const message = error instanceof Error ? error.message : 'Could not add to cart.';
                  if (message === 'Please login first.') {
                    window.location.href = loginPath();
                    return;
                  }
                  showNote(message);
                });
            }}
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;