import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { loginUser } from '../../../../services/login';
import { saveToken } from '../../../../utils/token';
import PasswordField from '../../Common/PasswordField';

const LoginForm = () => {
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setSending(true);
    setNote('');

    try {
      const data = await loginUser({
        email: String(form.get('email')),
        password: String(form.get('password')),
      });
      saveToken(data);
      window.location.href = '/profile';
    } catch (error) {
      setNote(error instanceof Error ? error.message : 'Could not sign in.');
      setSending(false);
    }
  };

  return (
    <div className="sorath-auth-card">
      <h1>Login</h1>
      <p>Sign in to browse designs, save favourites, and continue checkout.</p>

      <form onSubmit={signIn}>
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

        <p className="sorath-auth-switch"><a href="/forgot">Forgot password?</a></p>

        <button type="submit" className="sorath-primary-btn sorath-auth-submit" disabled={sending}>
          <span>{sending ? 'Please wait' : 'Login'}</span>
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
