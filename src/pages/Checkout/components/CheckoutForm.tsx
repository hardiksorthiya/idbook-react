import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import Shop1 from '../../../assets/images/shop/shop-1.png';
import { getCart } from '../../../../services/cart';
import { calculateCheckout, createOrder } from '../../../../services/checkout';
import type { CartItem } from '../../../../types/cart';
import type { CheckoutTotals, OrderData } from '../../../../types/checkout';

const money = (value: number) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;

function openRazorpay(order: OrderData) {
  const launch = () => {
    const Razorpay = (window as Window & {
      Razorpay?: new (options: object) => { open: () => void };
    }).Razorpay;

    if (!Razorpay || !order.gateway_key || !order.gateway_order_id) return;

    new Razorpay({
      key: order.gateway_key,
      order_id: order.gateway_order_id,
      currency: order.currency || 'INR',
      name: 'IDBook',
      description: order.order_number,
      prefill: {
        name: order.customer?.name,
        email: order.customer?.email,
        contact: order.customer?.phone,
      },
      theme: { color: '#83b9b7' },
    }).open();
  };

  if ((window as Window & { Razorpay?: unknown }).Razorpay) {
    launch();
    return;
  }

  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.onload = launch;
  document.body.appendChild(script);
}

const CheckoutForm = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totals, setTotals] = useState<CheckoutTotals | null>(null);
  const [note, setNote] = useState('Loading...');
  const [error, setError] = useState('');
  const [stateName, setStateName] = useState('');
  const [gstin, setGstin] = useState('');
  const [coupon, setCoupon] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState('');

  useEffect(() => {
    getCart()
      .then((cart) => {
        setCartItems(cart.items || []);
        setNote(cart.items?.length ? '' : 'Your cart is empty.');
      })
      .catch((loadError) => {
        setNote(loadError instanceof Error ? loadError.message : 'Could not load cart.');
      });
  }, []);

  useEffect(() => {
    if (note || !stateName.trim()) {
      setTotals(null);
      return;
    }

    const timer = window.setTimeout(() => {
      calculateCheckout({
        state: stateName.trim(),
        coupon_code: coupon.trim(),
        customer_gstin: gstin.trim(),
        items: cartItems.map((item) => ({ product_id: item.product_id, quantity: item.quantity })),
      })
        .then((result) => {
          setTotals(result.data || null);
          setError(result.data ? '' : 'Could not calculate GST.');
        })
        .catch((calcError) => {
          setTotals(null);
          setError(calcError instanceof Error ? calcError.message : 'Could not calculate GST.');
        });
    }, 400);

    return () => window.clearTimeout(timer);
  }, [stateName, gstin, coupon, cartItems, note]);

  if (note) {
    const login = note === 'Please login first.';
    return (
      <div className="sorath-bill-card sorath-bill-empty">
        <h2>{login ? 'Please login first' : 'Your cart'}</h2>
        <p>{login ? 'Login to calculate GST and continue checkout.' : note}</p>
        <a href={login ? '/login' : '/shop'} className="sorath-primary-btn sorath-bill-place">
          <span>{login ? 'Login' : 'Browse products'}</span>
          <span><FiArrowRight /></span>
        </a>
      </div>
    );
  }

  const placeOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError('');
    setDone('');

    createOrder({
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      phone: String(form.get('phone') || ''),
      address: String(form.get('address') || ''),
      city: String(form.get('city') || ''),
      state: stateName.trim(),
      pincode: String(form.get('pincode') || ''),
      customer_gstin: gstin.trim(),
      company_name: String(form.get('company_name') || ''),
      payment_gateway: 'razorpay',
      items: cartItems.map((item) => ({ product_id: item.product_id, quantity: item.quantity })),
    })
      .then((result) => {
        const order = result.data;
        setDone(order?.order_number
          ? `${result.message || 'Order initiated successfully. Proceed to payment.'} ${order.order_number}`
          : (result.message || 'Order initiated successfully. Proceed to payment.'));
        if (order) openRazorpay(order);
      })
      .catch((orderError) => {
        setError(orderError instanceof Error ? orderError.message : 'Could not place this order.');
      })
      .finally(() => setBusy(false));
  };

  return (
    <form className="row g-4" onSubmit={placeOrder}>
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
              <label>City<input type="text" name="city" placeholder="Ahmedabad" required /></label>
            </div>
            <div className="col-md-6">
              <label>Pincode<input type="text" name="pincode" placeholder="380015" required /></label>
            </div>
            <div className="col-md-6">
              <label>
                State
                <input
                  type="text"
                  name="state"
                  placeholder="Gujarat"
                  value={stateName}
                  onChange={(event) => setStateName(event.target.value)}
                  required
                />
              </label>
            </div>
            <div className="col-md-6">
              <label>
                GSTIN
                <input
                  type="text"
                  name="customer_gstin"
                  placeholder="24AAACH7409R1Z2"
                  value={gstin}
                  onChange={(event) => setGstin(event.target.value)}
                />
              </label>
            </div>
            <div className="col-md-6">
              <label>Company name<input type="text" name="company_name" placeholder="Studio name" /></label>
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
            {(totals?.line_items || cartItems).map((item) => {
              const cartItem = cartItems.find((row) => row.product_id === item.product_id);
              const name = 'name' in item ? item.name : cartItem?.name;
              const price = 'unit_price' in item ? item.unit_price : cartItem?.unit_price || 0;
              return (
                <li key={item.product_id}>
                  <img src={cartItem?.image_url || Shop1} alt={name || 'Design'} />
                  <span>
                    <strong>{name}</strong>
                    <em>{money(price)} × {item.quantity}</em>
                  </span>
                </li>
              );
            })}
          </ul>

          <label>
            Coupon
            <input
              type="text"
              name="coupon_code"
              placeholder="Coupon code"
              value={coupon}
              onChange={(event) => setCoupon(event.target.value)}
            />
          </label>

          {!stateName.trim() && <p className="sorath-bill-hint">Enter your state to calculate GST.</p>}
          {error && <p className="sorath-bill-error" role="alert">{error}</p>}

          {totals && (
            <div className="sorath-bill-rows">
              <p><span>Subtotal</span><strong>{money(totals.subtotal)}</strong></p>
              {totals.discount > 0 && <p><span>Discount</span><strong>-{money(totals.discount)}</strong></p>}
              <p><span>Taxable amount</span><strong>{money(totals.taxable_amount)}</strong></p>
              {totals.is_interstate ? (
                <p><span>IGST ({totals.igst_rate}%)</span><strong>{money(totals.igst_amount)}</strong></p>
              ) : (
                <>
                  <p><span>CGST ({totals.cgst_rate}%)</span><strong>{money(totals.cgst_amount)}</strong></p>
                  <p><span>SGST ({totals.sgst_rate}%)</span><strong>{money(totals.sgst_amount)}</strong></p>
                </>
              )}
              <p><span>Total tax</span><strong>{money(totals.total_tax)}</strong></p>
              <p className="sorath-bill-final"><span>Final amount</span><strong>{money(totals.final_amount)}</strong></p>
              <small>SAC {totals.sac_code} · {totals.sac_description}</small>
            </div>
          )}

          <button type="submit" className="sorath-primary-btn sorath-bill-place" disabled={busy}>
            <span>{busy ? 'Placing...' : 'Place order'}</span>
            <span><FiArrowRight /></span>
          </button>
          {done && <p className="sorath-bill-done" role="status">{done}</p>}
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
