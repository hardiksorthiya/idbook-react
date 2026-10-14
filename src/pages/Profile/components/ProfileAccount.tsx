import { useState } from 'react';
import { FiArrowDown, FiArrowRight } from 'react-icons/fi';
import Sofa from '../../../assets/images/shop/shop-2.png';
import Table from '../../../assets/images/shop/sidebar-img-3.png';
import Vase from '../../../assets/images/shop/sidebar-img-2.png';
import PasswordField from '../../Common/PasswordField';

const orders = [
  { id: 'IDB-1042', name: 'Modern Caramel Fabric Sofa', meta: '12 Sep 2026 · ₹48,500 · Ready', image: Sofa, ready: true },
  { id: 'IDB-1038', name: 'Coffee Table Ocean Blue', meta: '28 Aug 2026 · ₹18,900 · Ready', image: Table, ready: true },
  { id: 'IDB-1021', name: 'Arabesque Design vase', meta: '4 Aug 2026 · ₹6,400 · In progress', image: Vase, ready: false },
];

const stats = [
  { value: '3', label: 'Orders' },
  { value: '2', label: 'Ready to download' },
  { value: '1', label: 'In progress' },
];

const ProfileAccount = () => {
  const [tab, setTab] = useState('dashboard');
  const [note, setNote] = useState('');

  const openTab = (name: string) => {
    setTab(name);
    setNote('');
  };

  return (
    <div className="sorath-account-shell">
      <div className="sorath-account-nav d-flex flex-wrap align-items-center gap-2">
        <button type="button" className={tab === 'dashboard' ? 'is-active' : ''} onClick={() => openTab('dashboard')}>Dashboard</button>
        <button type="button" className={tab === 'orders' ? 'is-active' : ''} onClick={() => openTab('orders')}>Orders</button>
        <button type="button" className={tab === 'profile' ? 'is-active' : ''} onClick={() => openTab('profile')}>Profile</button>
        <a href="/login" className="sorath-account-logout">Log out</a>
      </div>

      {tab === 'dashboard' && (
        <div>
          <p className="sorath-account-lead">Your orders, downloads, and account details in one place.</p>
          <div className="row g-3">
            {stats.map((item) => (
              <div className="col-md-4" key={item.label}>
                <div className="sorath-account-stat">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
          <h2>Latest order</h2>
          <article className="sorath-account-order">
            <img src={orders[0].image} alt={orders[0].name} />
            <div className="flex-grow-1">
              <span>{orders[0].id}</span>
              <h3>{orders[0].name}</h3>
              <p>12 Sep 2026 · Ready</p>
            </div>
            <button type="button" className="sorath-primary-btn sorath-account-download" onClick={() => setNote(`Downloaded ${orders[0].id}.`)}>
              <span>Download</span>
              <span><FiArrowDown /></span>
            </button>
          </article>
        </div>
      )}

      {tab === 'orders' && (
        <div>
          <p className="sorath-account-lead">Download a ready order, or wait while a new one is prepared.</p>
          {orders.map((order) => (
            <article className="sorath-account-order" key={order.id}>
              <img src={order.image} alt={order.name} />
              <div className="flex-grow-1">
                <span>{order.id}</span>
                <h3>{order.name}</h3>
                <p>{order.meta}</p>
              </div>
              <button
                type="button"
                className="sorath-primary-btn sorath-account-download"
                disabled={!order.ready}
                onClick={() => setNote(`Downloaded ${order.id}.`)}
              >
                <span>{order.ready ? 'Download' : 'Preparing'}</span>
                {order.ready && <span><FiArrowDown /></span>}
              </button>
            </article>
          ))}
        </div>
      )}

      {tab === 'profile' && (
        <div>
          <p className="sorath-account-lead">Update the details we use for orders and downloads.</p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setNote('Profile details saved on this page. Account updates are not connected yet.');
            }}
          >
            <div className="row">
              <div className="col-md-6">
                <label>Full name<input type="text" name="name" placeholder="Your name" autoComplete="name" required /></label>
              </div>
              <div className="col-md-6">
                <label>Email address<input type="email" name="email" placeholder="you@email.com" autoComplete="email" required /></label>
              </div>
              <div className="col-md-6">
                <label>Firm / studio name<input type="text" name="firm" placeholder="Your firm or studio" autoComplete="organization" required /></label>
              </div>
              <div className="col-md-6">
                <label>Mobile number<input type="tel" name="mobile" placeholder="Your mobile number" required /></label>
              </div>
              <div className="col-md-6">
                <label>Phone<input type="tel" name="phone" placeholder="Your phone number" autoComplete="tel" required /></label>
              </div>
              <div className="col-md-6">
                <label>City<input type="text" name="city" placeholder="Your city" autoComplete="address-level2" required /></label>
              </div>
            </div>
            <button type="submit" className="sorath-primary-btn sorath-auth-submit">
              <span>Save profile</span>
              <span><FiArrowRight /></span>
            </button>
          </form>

          <form
            className="sorath-account-password"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              if (String(data.get('password')) !== String(data.get('confirm'))) {
                setNote('Passwords do not match.');
                return;
              }
              setNote('Password looks good. Changing it on the account is not connected yet.');
              event.currentTarget.reset();
            }}
          >
            <h2>Change password</h2>
            <p className="sorath-account-lead">Use at least 6 characters. The new password and confirmation need to match.</p>
            <div className="row">
              <div className="col-md-4">
                <label>Current password<PasswordField name="current" placeholder="Current password" autoComplete="current-password" /></label>
              </div>
              <div className="col-md-4">
                <label>New password<PasswordField name="password" placeholder="New password" autoComplete="new-password" minLength={6} /></label>
              </div>
              <div className="col-md-4">
                <label>Confirm new password<PasswordField name="confirm" placeholder="Repeat the new password" autoComplete="new-password" minLength={6} /></label>
              </div>
            </div>
            <button type="submit" className="sorath-primary-btn sorath-auth-submit">
              <span>Update password</span>
              <span><FiArrowRight /></span>
            </button>
          </form>
        </div>
      )}

      {note && <p className="sorath-auth-note" role="status">{note}</p>}
    </div>
  );
};

export default ProfileAccount;
