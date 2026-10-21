import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { forgotPassword } from '../../../../services/forgot';

const ForgotForm = () => {
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);

  const sendLink = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    setSending(true);
    setNote('');

    try {
      const data = await forgotPassword({
        email: String(form.get('email')),
      });
      setNote(data?.message || 'Reset link sent. Check your email.');
      setSending(false);
    } catch (error) {
      setNote(error instanceof Error ? error.message : 'Could not send the reset link.');
      setSending(false);
    }
  };

  return (
    <div className="sorath-auth-card">
      <h1>Forgot password</h1>
      <p>Enter your email and we will send a reset link.</p>

      <form onSubmit={sendLink}>
        <label>
          Email address
          <input type="email" name="email" placeholder="you@email.com" autoComplete="email" required />
        </label>

        <button type="submit" className="sorath-primary-btn sorath-auth-submit" disabled={sending}>
          <span>{sending ? 'Please wait' : 'Send reset link'}</span>
          <span className="sorath-auth-arrow"><FiArrowUpRight /></span>
        </button>

        {note && <p className="sorath-auth-note" role="status">{note}</p>}
        <p className="sorath-auth-switch">Remembered it? <Link to="/login">Back to login</Link></p>
      </form>
    </div>
  );
};

export default ForgotForm;
