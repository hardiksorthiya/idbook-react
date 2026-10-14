import { useState } from 'react';
import { FiCheck, FiHeart, FiStar } from 'react-icons/fi';
import AddToCart from './AddToCart';
import BuyNow from './BuyNow';

import Shop1 from '../../../assets/images/shop/shop-1.png';
import Shop2 from '../../../assets/images/shop/shop-2.png';
import Shop3 from '../../../assets/images/shop/shop-3.png';
import Shop4 from '../../../assets/images/shop/shop-4.png';

const images = [Shop1, Shop2, Shop3, Shop4];

const ProductInfo = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="sorath-pd">
      <div className="container-fluid sorath-container-fluid">
        <div className="row gy-4">
          <div className="col-lg-6">
            <div className="sorath-pd-gallery">
              <div className="sorath-pd-main">
                <img src={images[active]} alt="Modern Caramel Fabric Sofa" />
              </div>
              <div className="sorath-pd-thumbs">
                {images.map((image, index) => (
                  <button
                    key={image}
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
              <span className="sorath-pd-badge">Save -20%</span>
              <h2>Modern Caramel Fabric Sofa</h2>

              <div className="sorath-pd-rating">
                <span className="sorath-pd-stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FiStar key={index} />
                  ))}
                  ( 3 Reviews )
                </span>
                <span className="sorath-pd-stock">
                  <FiCheck /> In Stock
                </span>
              </div>

              <h3 className="sorath-pd-price">
                $260.00 <span>$360.00</span>
              </h3>

              <p>
                A warm caramel sofa with a soft fabric seat, clean lines, and a
                compact frame that fits living rooms without losing comfort.
              </p>

              <div className="sorath-pd-actions">
                <AddToCart />
                <BuyNow />
              </div>

              <button type="button" className="sorath-pd-wishlist">
                <span><FiHeart /></span> Add to wishlist
              </button>

              <ul className="sorath-pd-meta">
                <li><span>Categories</span> Industry, Engineering</li>
                <li><span>Tags</span> Factory, Industry</li>
                <li><span>SKU</span> 68</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
