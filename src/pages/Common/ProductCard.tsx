import { FiHeart, FiShoppingCart } from 'react-icons/fi';

type ProductCardProps = {
  image: string;
  hoverImage: string;
  name: string;
  price: string;
  categories: string[];
  dimensions?: string;
  link: string;
};

const ProductCard = ({
  image,
  hoverImage,
  name,
  price,
  categories,
  dimensions,
  link,
}: ProductCardProps) => {
  return (
    <div className="sorath-product-card">
      <a href={link} className="sorath-product-card-link">
        <div className="sorath-product-image sorath-product-image-flip">
          <div className="sorath-product-image-inner">
            <div className="sorath-product-image-front">
              <img src={image} alt={name} />
            </div>

            <div className="sorath-product-image-back">
              <img src={hoverImage} alt={`${name} alternate view`} />
            </div>
          </div>

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
        <button type="button" aria-label="Add to wishlist">
          <FiHeart />
        </button>

        <button type="button" aria-label="Add to cart">
          <FiShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;