import { useEffect, useState } from 'react';
import { FiArrowRight, FiX } from 'react-icons/fi';

import '../../../assets/css/Cart/Cart.css';
import Shop1 from '../../../assets/images/shop/shop-1.png';
import { getCart, removeCartItem, updateCartItem } from '../../../../services/cart';
import type { CartItem, CartResult, CartSummary } from '../../../../types/cart';

const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;

const CartList = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<CartSummary | null>(null);
  const [note, setNote] = useState('Loading...');
  const [error, setError] = useState('');

  const showCart = (data: CartResult) => {
    setItems(data.data?.items || []);
    setSummary(data.data?.summary || null);
    setError('');
  };

  useEffect(() => {
    getCart()
      .then((cart) => {
        setItems(cart.items || []);
        setSummary(cart.summary);
        setNote('');
      })
      .catch((loadError) => {
        setItems([]);
        setNote(loadError instanceof Error ? loadError.message : 'Could not load cart.');
      });
  }, []);

  const changeQuantity = (item: CartItem, quantity: number) => {
    updateCartItem(item.id, quantity)
      .then(showCart)
      .catch((updateError) => setError(updateError instanceof Error ? updateError.message : 'Could not update cart.'));
  };

  const removeItem = (item: CartItem) => {
    removeCartItem(item.id)
      .then(showCart)
      .catch((removeError) => setError(removeError instanceof Error ? removeError.message : 'Could not remove this item.'));
  };

  if (note) {
    return (
      <div className="sorath-cart-empty">
        <h2>{note === 'Please login first.' ? 'Please login first' : 'Your cart'}</h2>
        <p>{note === 'Please login first.' ? 'Login to see the designs in your cart.' : note}</p>
        <a href={note === 'Please login first.' ? '/login' : '/shop'} className="sorath-primary-btn sorath-cart-checkout">
          <span>{note === 'Please login first.' ? 'Login' : 'Browse products'}</span>
          <span><FiArrowRight /></span>
        </a>
      </div>
    );
  }

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
      {error && <p className="sorath-cart-empty">{error}</p>}
      <ul className="sorath-cart-list">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`/product/${item.slug}`} className="sorath-cart-product">
              <img src={item.image_url || Shop1} alt={item.name} />
              <span>
                <strong>{item.name}</strong>
                <em>{item.category_name} · {money(item.subtotal)}</em>
              </span>
            </a>
            <div className="sorath-cart-qty">
              <button
                type="button"
                aria-label={`Decrease ${item.name}`}
                onClick={() => changeQuantity(item, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                type="button"
                aria-label={`Increase ${item.name}`}
                onClick={() => changeQuantity(item, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="sorath-cart-remove"
              aria-label={`Remove ${item.name}`}
              onClick={() => removeItem(item)}
            >
              <FiX />
            </button>
          </li>
        ))}
      </ul>

      <div className="sorath-cart-foot">
        <p className="sorath-cart-total">
          <span>
            Subtotal {money(summary?.subtotal || 0)} · Tax {money(summary?.estimated_tax || 0)}
          </span>
          <strong>{money(summary?.final_amount || 0)}</strong>
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
