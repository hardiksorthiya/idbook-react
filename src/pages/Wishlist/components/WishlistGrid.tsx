import { useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

import '../../../assets/css/Home/Products.css';
import '../../../assets/css/Cart/Cart.css';
import '../../../assets/css/Wishlist/Wishlist.css';
import ProductCard from '../../Common/ProductCard';
import Shop1 from '../../../assets/images/shop/shop-1.png';
import { getWishlist, toggleWishlist } from '../../../../services/wishlist';
import type { WishItem } from '../../../../types/wishlist';

const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;

const WishlistGrid = () => {
  const [items, setItems] = useState<WishItem[]>([]);
  const [note, setNote] = useState('Loading...');
  const [error, setError] = useState('');

  useEffect(() => {
    getWishlist()
      .then((list) => {
        setItems(list.items || []);
        setNote('');
      })
      .catch((loadError) => {
        setItems([]);
        setNote(loadError instanceof Error ? loadError.message : 'Could not load wishlist.');
      });
  }, []);

  const removeItem = (productId: number) => {
    toggleWishlist(productId)
      .then(() => setItems((list) => list.filter((item) => item.product_id !== productId)))
      .catch((removeError) => setError(removeError instanceof Error ? removeError.message : 'Could not update wishlist.'));
  };

  if (note) {
    return (
      <div className="sorath-wish-empty">
        <h2>{note === 'Please login first.' ? 'Please login first' : 'Your wishlist'}</h2>
        <p>{note === 'Please login first.' ? 'Login to see your saved designs.' : note}</p>
        <a href={note === 'Please login first.' ? '/login' : '/shop'} className="sorath-primary-btn sorath-cart-checkout">
          <span>{note === 'Please login first.' ? 'Login' : 'Browse products'}</span>
          <span><FiArrowRight /></span>
        </a>
      </div>
    );
  }

  if (items.length === 0) {
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
      {error && <p className="sorath-cart-note">{error}</p>}
      <div className="sorath-wish-bar">
        <p><span>{items.length}</span> saved pieces</p>
        <a href="/shop">Continue shopping</a>
      </div>

      <div className="row gy-4">
        {items.map((item) => (
          <div className="col-xl-4 col-lg-6 col-md-6" key={item.id}>
            <ProductCard
              image={item.image_url || Shop1}
              hoverImage={item.image_url || Shop1}
              name={item.name}
              price={money(item.price)}
              mrp={item.mrp_price > item.price ? money(item.mrp_price) : ''}
              categories={item.category_name ? [item.category_name] : []}
              dimensions={item.room_dimensions}
              link={`/product/${item.slug}`}
              productId={item.product_id}
              remove={() => removeItem(item.product_id)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default WishlistGrid;
