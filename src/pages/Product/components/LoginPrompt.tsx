import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import LoginForm from '../../Login/components/LoginForm';
import { getToken } from '../../../../utils/token';
import '../../../assets/css/Auth/Auth.css';

const LoginPrompt = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!getToken()) setOpen(true);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!open) return null;

  return createPortal(
    <div className="sorath-login-popup" role="dialog" aria-modal="true" aria-label="Login">
      <button type="button" className="sorath-login-popup-backdrop" aria-label="Close" onClick={() => setOpen(false)} />
      <div className="sorath-login-popup-card">
        <button type="button" className="sorath-login-popup-close" aria-label="Close" onClick={() => setOpen(false)}>
          <FiX />
        </button>
        <LoginForm stay />
      </div>
    </div>,
    document.body,
  );
};

export default LoginPrompt;
