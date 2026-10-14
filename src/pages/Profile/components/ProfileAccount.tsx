import { useEffect, useState } from 'react';
import { FiArrowDown, FiArrowRight } from 'react-icons/fi';
import Sofa from '../../../assets/images/shop/shop-2.png';
import Table from '../../../assets/images/shop/sidebar-img-3.png';
import Vase from '../../../assets/images/shop/sidebar-img-2.png';
import PasswordField from '../../Common/PasswordField';
import { changePassword } from '../../../../services/password';
import { getMe, readUser } from '../../../../services/me';
import { updateProfile } from '../../../../services/profile';
import { logoutUser } from '../../../../services/logout';
import { clearToken } from '../../../../utils/token';
import type { User } from '../../../../types/me';

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
  const [sending, setSending] = useState(false);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMe()
      .then((data) => setUser(readUser(data)))
      .catch((error) => {
        setNote(error instanceof Error ? error.message : 'Could not load your account.');
      });
  }, []);

  const openTab = (name: string) => {
    setTab(name);
    setNote('');
  };

  const signOut = async () => {
    setNote('');

    try {
      await logoutUser();
      clearToken();
      window.location.href = '/login';
    } catch (error) {
      setNote(error instanceof Error ? error.message : 'Could not log out.');
    }
  };

  return (
    <div className="sorath-account-shell">
      <div className="sorath-account-nav d-flex flex-wrap align-items-center gap-2">
        <button type="button" className={tab === 'dashboard' ? 'is-active' : ''} onClick={() => openTab('dashboard')}>Dashboard</button>
        <button type="button" className={tab === 'orders' ? 'is-active' : ''} onClick={() => openTab('orders')}>Orders</button>
        <button type="button" className={tab === 'profile' ? 'is-active' : ''} onClick={() => openTab('profile')}>Profile</button>
        <button type="button" className="sorath-account-logout" onClick={signOut}>Log out</button>
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
            className="sorath-account-profile"
            key={user?.email || user?.name || 'account'}
            onSubmit={async (event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);

              setSaving(true);
              setNote('');

              try {
                const data = await updateProfile({
                  name: String(form.get('name')),
                  phone: String(form.get('phone')),
                  company_name: String(form.get('company_name')),
                  coa_registration_number: String(form.get('coa_registration_number')),
                  gstin: String(form.get('gstin')),
                  city: String(form.get('city')),
                  state: String(form.get('state')),
                  pincode: String(form.get('pincode')),
                });
                const next = readUser(data);
                if (next?.name || next?.phone) setUser({ ...user, ...next });
                setNote(data?.message || 'Profile updated.');
              } catch (error) {
                setNote(error instanceof Error ? error.message : 'Could not update your profile.');
              }

              setSaving(false);
            }}
          >
            <div className="row">
              <div className="col-md-6">
                <label>Full name<input type="text" name="name" placeholder="Your name" autoComplete="name" defaultValue={user?.name || ''} required /></label>
              </div>
              <div className="col-md-6">
                <label>Phone<input type="tel" name="phone" placeholder="Your phone number" autoComplete="tel" defaultValue={user?.phone || user?.phone_number || ''} required /></label>
              </div>
              <div className="col-md-6">
                <label>Firm / studio name<input type="text" name="company_name" placeholder="Your firm or studio" autoComplete="organization" defaultValue={user?.company_name || user?.professional_company || ''} required /></label>
              </div>
              <div className="col-md-6">
                <label>COA registration number<input type="text" name="coa_registration_number" placeholder="CA/2022/98765" defaultValue={user?.coa_registration_number || ''} required /></label>
              </div>
              <div className="col-md-6">
                <label>GSTIN<input type="text" name="gstin" placeholder="GSTIN" defaultValue={user?.gstin || user?.gst_number || ''} required /></label>
              </div>
              <div className="col-md-6">
                <label>City<input type="text" name="city" placeholder="Your city" autoComplete="address-level2" defaultValue={user?.city || ''} required /></label>
              </div>
              <div className="col-md-6">
                <label>State<input type="text" name="state" placeholder="Your state" autoComplete="address-level1" defaultValue={user?.state || ''} required /></label>
              </div>
              <div className="col-md-6">
                <label>Pincode<input type="text" name="pincode" placeholder="395007" autoComplete="postal-code" defaultValue={user?.pincode || ''} required /></label>
              </div>
            </div>
            <button type="submit" className="sorath-primary-btn sorath-auth-submit" disabled={saving}>
              <span>{saving ? 'Please wait' : 'Save profile'}</span>
              <span><FiArrowRight /></span>
            </button>
          </form>

          <form
            className="sorath-account-password"
            onSubmit={async (event) => {
              event.preventDefault();
              const formElement = event.currentTarget;
              const form = new FormData(formElement);
              const password = String(form.get('password'));
              const confirm = String(form.get('password_confirmation'));

              if (password !== confirm) {
                setNote('Passwords do not match.');
                return;
              }

              setSending(true);
              setNote('');

              try {
                const data = await changePassword({
                  current_password: String(form.get('current_password')),
                  password,
                  password_confirmation: confirm,
                });
                setNote(data?.message || 'Password updated.');
                formElement.reset();
              } catch (error) {
                setNote(error instanceof Error ? error.message : 'Could not update the password.');
              }

              setSending(false);
            }}
          >
            <h2>Change password</h2>
            <p className="sorath-account-lead">Enter your current password, then choose a new one.</p>
            <div className="row">
              <div className="col-md-4">
                <label>Current password<PasswordField name="current_password" placeholder="Current password" autoComplete="current-password" /></label>
              </div>
              <div className="col-md-4">
                <label>New password<PasswordField name="password" placeholder="New password" autoComplete="new-password" minLength={6} /></label>
              </div>
              <div className="col-md-4">
                <label>Confirm new password<PasswordField name="password_confirmation" placeholder="Repeat the new password" autoComplete="new-password" minLength={6} /></label>
              </div>
            </div>
            <button type="submit" className="sorath-primary-btn sorath-auth-submit" disabled={sending}>
              <span>{sending ? 'Please wait' : 'Update password'}</span>
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
