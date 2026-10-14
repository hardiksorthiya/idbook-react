import { useState } from 'react';
import { FiArrowRight, FiX } from 'react-icons/fi';

import '../../../assets/css/Cart/Cart.css';
import Shop1 from '../../../assets/images/shop/shop-1.png';
import Shop2 from '../../../assets/images/shop/shop-2.png';

const startItems = [
  { id: 1, name: 'Modern Caramel Fabric Sofa', price: 157, image: Shop2 },
  { id: 2, name: 'Luxury Skyline Sofa', price: 157, image: Shop1 },
];

const CartList = () => {
  const [items, setItems] = useState(startItems);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) {
    return (
      <div className="sorath-cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add a design and it will show up here.</p>
        <a href="/shop" className="sorath-primary-btn sorath-cart-checkout">
          <span>Browse products</span>
          <span><FiArrowRight /></span>
        </a>
      </div>
    );
  }

  return (
    <>
      <ul className="sorath-cart-list">
        {items.map((item) => (
          <li key={item.id}>
            <a href="/product" className="sorath-cart-product">
              <img src={item.image} alt={item.name} />
              <span>
                <strong>{item.name}</strong>
                <em>${item.price.toFixed(2)}</em>
              </span>
            </a>
            <button
              type="button"
              className="sorath-cart-remove"
              aria-label={`Remove ${item.name}`}
              onClick={() => setItems(items.filter((row) => row.id !== item.id))}
            >
              <FiX />
            </button>
          </li>
        ))}
      </ul>

      <div className="sorath-cart-foot">
        <p className="sorath-cart-total">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </p>
        <div className="sorath-cart-actions">
          <a href="/shop" className="sorath-primary-btn primary-btn-2 sorath-cart-shop">
            <span>Continue shopping</span>
          </a>
          <a href="/checkout" className="sorath-primary-btn sorath-cart-checkout">
            <span>Checkout</span>
            <span><FiArrowRight /></span>
          </a>
        </div>
      </div>
    </>
  );
};

export default CartList;
