import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

import '../../../assets/css/Home/Products.css';
import '../../../assets/css/Cart/Cart.css';
import '../../../assets/css/Wishlist/Wishlist.css';
import ProductCard from '../../Common/ProductCard';

import Shop1 from '../../../assets/images/shop/shop-1.png';
import Shop2 from '../../../assets/images/shop/shop-2.png';
import Shop3 from '../../../assets/images/shop/shop-3.png';
import Shop4 from '../../../assets/images/shop/shop-4.png';
import Shop5 from '../../../assets/images/shop/shop-5.png';

const items = [
  {
    image: Shop1,
    hoverImage: Shop2,
    name: 'Luxury Skyline Sofa',
    price: '$1,240',
    categories: ['Living Room', 'Sofa'],
    dimensions: `16'-5" × 12'-6"`,
    link: '/product',
  },
  {
    image: Shop2,
    hoverImage: Shop3,
    name: 'Modern Caramel Fabric Sofa',
    price: '$157.00',
    categories: ['Living Room', 'Sofa'],
    dimensions: `8'-2" × 7'-4"`,
    link: '/product',
  },
  {
    image: Shop3,
    hoverImage: Shop4,
    name: 'Gray Tufted Armchair',
    price: '$680',
    categories: ['Living Room', 'Chair'],
    dimensions: `4'-0" × 3'-6"`,
    link: '/product',
  },
  {
    image: Shop4,
    hoverImage: Shop5,
    name: 'Walnut Dining Table',
    price: '$420',
    categories: ['Dining', 'Table'],
    dimensions: `2'-4" × 1'-6"`,
    link: '/product',
  },
];

const WishlistGrid = () => {
  const [saved, setSaved] = useState(items);

  if (saved.length === 0) {
    return (
      <div className="sorath-wish-empty">
        <h2>Your wishlist is empty</h2>
        <p>Save pieces you like and they will show up here.</p>
        <a href="/shop" className="sorath-primary-btn sorath-cart-checkout">
          <span>Browse products</span>
          <span><FiArrowRight /></span>
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="sorath-wish-bar">
        <p><span>{saved.length}</span> saved pieces</p>
        <a href="/shop">Continue shopping</a>
      </div>

      <div className="row gy-4">
        {saved.map((item) => (
          <div className="col-xl-4 col-lg-6 col-md-6" key={item.name}>
            <ProductCard
              {...item}
              remove={() => setSaved(saved.filter((row) => row.name !== item.name))}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default WishlistGrid;
