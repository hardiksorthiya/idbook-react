import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

type PasswordFieldProps = {
  name: string;
  placeholder: string;
  autoComplete: string;
  minLength?: number;
};

const PasswordField = ({ name, placeholder, autoComplete, minLength }: PasswordFieldProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="sorath-auth-wrap">
      <input
        type={show ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        minLength={minLength}
        required
      />
      <button
        type="button"
        aria-label={show ? 'Hide password' : 'Show password'}
        onClick={() => setShow((open) => !open)}
      >
        {show ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  );
};

export default PasswordField;
