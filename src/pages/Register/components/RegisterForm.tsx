import { useState } from 'react';
import { FiArrowUpRight, FiCompass, FiUser } from 'react-icons/fi';
import PasswordField from '../../Common/PasswordField';

const RegisterForm = () => {
  const [type, setType] = useState<'customer' | 'architect'>('customer');
  const [note, setNote] = useState('');

  return (
    <div className="sorath-auth-card sorath-auth-card-wide">
      <h1>Register</h1>

      <div className="sorath-auth-tabs" role="tablist" aria-label="Account type">
        <button
          type="button"
          className={type === 'customer' ? 'is-active' : ''}
          onClick={() => { setType('customer'); setNote(''); }}
        >
          <FiUser /> Customer
        </button>
        <button
          type="button"
          className={type === 'architect' ? 'is-active' : ''}
          onClick={() => { setType('architect'); setNote(''); }}
        >
          <FiCompass /> Architect / Interior
        </button>
      </div>

      <p>
        {type === 'architect'
          ? 'Join as an architect to showcase your plans and work with clients.'
          : 'Create an account to save designs and pick up your order later.'}
      </p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const password = String(data.get('password'));
          const confirm = String(data.get('confirm'));

          if (password !== confirm) {
            setNote('Passwords do not match.');
            return;
          }

          setNote(
            type === 'architect'
              ? 'Your architect details look good. Account creation is not connected yet.'
              : 'Your details look good. Account creation is not connected yet.',
          );
        }}
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label>
              Full name
              <input type="text" name="name" placeholder="Your name" autoComplete="name" required />
            </label>
          </div>
          <div className="col-md-6">
            <label>
              Email address
              <input type="email" name="email" placeholder="you@email.com" autoComplete="email" required />
            </label>
          </div>

          {type === 'architect' && (
            <>
              <div className="col-md-6">
                <label>
                  Firm / studio name
                  <input type="text" name="firm" placeholder="Your firm or studio" autoComplete="organization" required />
                </label>
              </div>
              <div className="col-md-6">
                <label>
                  Mobile number
                  <input type="tel" name="mobile" placeholder="Your mobile number" required />
                </label>
              </div>
            </>
          )}

          <div className="col-md-6">
            <label>
              Password
              <PasswordField name="password" placeholder="Create a password" autoComplete="new-password" minLength={6} />
            </label>
          </div>
          <div className="col-md-6">
            <label>
              Confirm password
              <input type="password" name="confirm" placeholder="Repeat your password" autoComplete="new-password" minLength={6} required />
            </label>
          </div>
        </div>

        <button type="submit" className="sorath-primary-btn sorath-auth-submit">
          <span>Create Account</span>
          <span className="sorath-auth-arrow"><FiArrowUpRight /></span>
        </button>

        {note && <p className="sorath-auth-note" role="status">{note}</p>}
        <p className="sorath-auth-switch">Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default RegisterForm;
