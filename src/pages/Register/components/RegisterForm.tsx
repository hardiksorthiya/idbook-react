import { useState } from 'react';
import { FiArrowUpRight, FiCompass, FiUser } from 'react-icons/fi';
import { registerUser } from '../../../../services/register';
import type { RegisterBody } from '../../../../types/register';
import PasswordField from '../../Common/PasswordField';

const RegisterForm = () => {
  const [type, setType] = useState<'customer' | 'architect'>('customer');
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);
  const isArchitect = type === 'architect';

  const createAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get('password'));
    const passwordConfirmation = String(form.get('password_confirmation'));

    if (password !== passwordConfirmation) {
      setNote('Passwords do not match.');
      return;
    }

    const body: RegisterBody = {
      name: String(form.get('name')),
      email: String(form.get('email')),
      phone_number: String(form.get('phone_number')),
      password,
      password_confirmation: passwordConfirmation,
      is_professional: isArchitect,
    };

    if (isArchitect) {
      body.professional_company = String(form.get('professional_company'));
      body.professional_designation = String(form.get('professional_designation'));
      body.coa_registration_number = String(form.get('coa_registration_number'));
      body.gst_number = String(form.get('gst_number'));
      body.about = String(form.get('about'));
    }

    setSending(true);
    setNote('');

    try {
      await registerUser(body);
      setNote('Account created. You can login now.');
    } catch (error) {
      setNote(error instanceof Error ? error.message : 'Could not create the account.');
    } finally {
      setSending(false);
    }
  };

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
        {isArchitect
          ? 'Join as an architect to showcase your plans and work with clients.'
          : 'Create an account to save designs and pick up your order later.'}
      </p>

      <form onSubmit={createAccount}>
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
          <div className="col-md-6">
            <label>
              Phone number
              <input type="tel" name="phone_number" placeholder="+91 98250 98765" required />
            </label>
          </div>

          {isArchitect && (
            <>
              <div className="col-md-6">
                <label>
                  Company
                  <input type="text" name="professional_company" placeholder="Your firm or studio" required />
                </label>
              </div>
              <div className="col-md-6">
                <label>
                  Designation
                  <input type="text" name="professional_designation" placeholder="Principal Architect" required />
                </label>
              </div>
              <div className="col-md-6">
                <label>
                  COA registration number
                  <input type="text" name="coa_registration_number" placeholder="CA/2022/98765" required />
                </label>
              </div>
              <div className="col-md-6">
                <label>
                  GST number
                  <input type="text" name="gst_number" placeholder="24AAACH7409R1ZZ" required />
                </label>
              </div>
              <div className="col-12">
                <label>
                  About
                  <textarea name="about" rows={3} placeholder="A short note about your work" required />
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
              <input type="password" name="password_confirmation" placeholder="Repeat your password" autoComplete="new-password" minLength={6} required />
            </label>
          </div>
        </div>

        <button type="submit" className="sorath-primary-btn sorath-auth-submit" disabled={sending}>
          <span>{sending ? 'Please wait' : 'Create Account'}</span>
          <span className="sorath-auth-arrow"><FiArrowUpRight /></span>
        </button>

        {note && <p className="sorath-auth-note" role="status">{note}</p>}
        <p className="sorath-auth-switch">Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default RegisterForm;
