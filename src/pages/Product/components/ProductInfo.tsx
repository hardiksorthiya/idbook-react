import { useState } from 'react';
import { FiHeart, FiStar } from 'react-icons/fi';
import AddToCart from './AddToCart';
import BuyNow from './BuyNow';
import ViewCadPlan from './ViewCadPlan';
import { toggleWishlist } from '../../../../services/wishlist';
import Shop1 from '../../../assets/images/shop/shop-1.png';
import type { ProductDetail } from '../../../../types/product';

const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;

const photoUrl = (item: ProductDetail['gallery'][number]) => {
  if (typeof item === 'string') return item;
  return item.url || item.image_url || item.thumb_url || '';
};

const photosOf = (product: ProductDetail) => {
  const gallery = (product.gallery || [])
    .filter((item) => typeof item === 'string' || item.image_type !== 'floor_plan_preview')
    .map(photoUrl)
    .filter(Boolean);

  if (gallery.length) return gallery;
  return [product.main_image_url, product.thumb_url, Shop1].filter(Boolean) as string[];
};

const cadPlanOf = (product: ProductDetail) => {
  const item = (product.gallery || []).find(
    (entry) => typeof entry !== 'string' && entry.image_type === 'floor_plan_preview',
  );
  return item ? photoUrl(item) : '';
};

const ProductInfo = ({ product }: { product: ProductDetail }) => {
  const [active, setActive] = useState(0);
  const [wishLabel, setWishLabel] = useState('Add to wishlist');
  const images = photosOf(product);
  const photo = images[active] || images[0];
  const cadPlan = cadPlanOf(product);

  return (
    <section className="sorath-pd">
      <div className="container-fluid sorath-container-fluid">
        <div className="row gy-4">
          <div className="col-lg-6">
            <div className="sorath-pd-gallery">
              <div className="sorath-pd-main">
                <img src={photo} alt={product.name} />
                {cadPlan && <ViewCadPlan image={cadPlan} name={product.name} />}
              </div>
              <div className="sorath-pd-thumbs">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    className={index === active ? 'is-active' : ''}
                    aria-label={`Show image ${index + 1}`}
                    onClick={() => setActive(index)}
                  >
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="sorath-pd-info">
              {product.discount_percentage > 0 && (
                <span className="sorath-pd-badge">Save -{product.discount_percentage}%</span>
              )}
              <h2>{product.name}</h2>

              <div className="sorath-pd-rating">
                <span className="sorath-pd-stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FiStar key={index} />
                  ))}
                  ( {product.reviews_count} Review{product.reviews_count === 1 ? '' : 's'} )
                </span>
              </div>

              <h3 className="sorath-pd-price">
                {money(product.price)} {product.mrp_price > product.price && <span>{money(product.mrp_price)}</span>}
              </h3>

              {product.short_description ? (
                <div
                  className="sorath-pd-html"
                  dangerouslySetInnerHTML={{ __html: product.short_description }}
                />
              ) : (
                <p>{product.design_style || 'No short description yet.'}</p>
              )}

              <div className="sorath-pd-actions">
                <AddToCart productId={product.id} />
                <BuyNow productId={product.id} />
              </div>

              <button
                type="button"
                className="sorath-pd-wishlist"
                onClick={() => {
                  if (wishLabel === 'Saving...') return;
                  setWishLabel('Saving...');
                  toggleWishlist(product.id)
                    .then((data) => setWishLabel(data.message || 'Added to wishlist.'))
                    .catch((error) => setWishLabel(error instanceof Error ? error.message : 'Could not update wishlist.'));
                }}
              >
                <span><FiHeart /></span> {wishLabel}
              </button>

              <ul className="sorath-pd-meta">
                <li><span>Categories</span> {product.categories.map((item) => item.name).join(', ') || '—'}</li>
                <li><span>Designer</span> {product.designer?.name || '—'}</li>
                <li><span>SKU</span> {product.design_code}</li>
                {product.tag && <li><span>Tags</span> {product.tag}</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
