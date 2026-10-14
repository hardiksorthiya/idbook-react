import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import Shop1 from '../../../assets/images/shop/shop-1.png';
import Shop2 from '../../../assets/images/shop/shop-2.png';

const items = [
  { name: 'Modern Caramel Fabric Sofa', price: 157, image: Shop2 },
  { name: 'Luxury Skyline Sofa', price: 157, image: Shop1 },
];

const CheckoutForm = () => {
  const [done, setDone] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <form
      className="row g-4"
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
      }}
    >
      <div className="col-lg-7">
        <div className="sorath-bill-card">
          <h2>Delivery details</h2>
          <div className="row">
            <div className="col-md-6">
              <label>Full name<input type="text" name="name" placeholder="Your name" required /></label>
            </div>
            <div className="col-md-6">
              <label>Email<input type="email" name="email" placeholder="you@email.com" required /></label>
            </div>
            <div className="col-md-6">
              <label>Phone<input type="tel" name="phone" placeholder="Phone number" required /></label>
            </div>
            <div className="col-md-6">
              <label>City<input type="text" name="city" placeholder="Surat" required /></label>
            </div>
            <div className="col-12">
              <label>Address<textarea name="address" placeholder="House, street, area" required /></label>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-5">
        <div className="sorath-bill-card">
          <h2>Your order</h2>
          <ul className="sorath-bill-items">
            {items.map((item) => (
              <li key={item.name}>
                <img src={item.image} alt={item.name} />
                <span>
                  <strong>{item.name}</strong>
                  <em>${item.price.toFixed(2)}</em>
                </span>
              </li>
            ))}
          </ul>
          <p className="sorath-bill-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </p>
          <button type="submit" className="sorath-primary-btn sorath-bill-place">
            <span>Place order</span>
            <span><FiArrowRight /></span>
          </button>
          {done && <p className="sorath-bill-done" role="status">Your order is placed. We will contact you shortly.</p>}
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
