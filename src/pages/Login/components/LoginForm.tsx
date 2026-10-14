import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import PasswordField from '../../Common/PasswordField';

const LoginForm = () => {
  const [note, setNote] = useState('');

  return (
    <div className="sorath-auth-card">
      <h1>Login</h1>
      <p>Sign in to browse designs, save favourites, and continue checkout.</p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setNote('This login form is ready. Account sign-in is not connected yet.');
        }}
      >
        <label>
          Email address
          <input type="email" name="email" placeholder="you@email.com" autoComplete="email" required />
        </label>

        <label>
          Password
          <PasswordField name="password" placeholder="Your password" autoComplete="current-password" />
        </label>

        <label className="sorath-auth-check">
          <input type="checkbox" name="remember" />
          Remember me
        </label>

        <button type="submit" className="sorath-primary-btn sorath-auth-submit">
          <span>Login</span>
          <span className="sorath-auth-arrow"><FiArrowUpRight /></span>
        </button>

        {note && <p className="sorath-auth-note" role="status">{note}</p>}
        <p className="sorath-auth-switch">New here? <a href="/register">Create an account</a></p>
        <p className="sorath-auth-switch">Already signed in? <a href="/profile">Open your profile</a></p>
      </form>
    </div>
  );
};

export default LoginForm;
