import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import PasswordField from '../../Common/PasswordField';
import { changePassword } from '../../../../services/password';
import { readUser } from '../../../../services/me';
import { updateProfile } from '../../../../services/profile';
import type { User } from '../../../../types/me';

type ProfileFormProps = {
  user: User | null;
  setUser: (user: User | null) => void;
  onNote: (message: string) => void;
};

const ProfileForm = ({ user, setUser, onNote }: ProfileFormProps) => {
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [preview, setPreview] = useState('');
  const photo = preview || user?.profile?.profile_image_url || '';

  return (
    <div>
      <p className="sorath-account-lead">Update the details we use for orders and downloads.</p>
      <form
        className="sorath-account-profile"
        key={user?.email || user?.name || 'account'}
        onSubmit={async (event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);

          setSaving(true);
          onNote('');

          try {
            const file = form.get('profile_image');
            const data = await updateProfile({
              name: String(form.get('name')),
              phone: String(form.get('phone')),
              company_name: String(form.get('company_name')),
              coa_registration_number: String(form.get('coa_registration_number')),
              gstin: String(form.get('gstin')),
              city: String(form.get('city')),
              state: String(form.get('state')),
              pincode: String(form.get('pincode')),
            }, file instanceof File && file.size ? file : null);
            const next = readUser(data);
            if (next?.name || next?.phone) setUser({ ...user, ...next });
            onNote(data?.message || 'Profile updated.');
          } catch (error) {
            onNote(error instanceof Error ? error.message : 'Could not update your profile.');
          }

          setSaving(false);
        }}
      >
        <label className="sorath-account-photo-wrap">
          {photo ? (
            <img className="sorath-account-photo" src={photo} alt={user?.name || 'Profile'} />
          ) : (
            <span className="sorath-account-photo-empty">{(user?.name || 'U').charAt(0).toUpperCase()}</span>
          )}
          <input
            type="file"
            name="profile_image"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
          <span>Change photo</span>
        </label>
        <div className="row">
          <div className="col-md-6">
            <label>Full name<input type="text" name="name" placeholder="Your name" autoComplete="name" defaultValue={user?.full_name || user?.name || ''} required /></label>
          </div>
          <div className="col-md-6">
            <label>Username<input type="text" defaultValue={user?.username || ''} readOnly /></label>
          </div>
          <div className="col-md-6">
            <label>Email address<input type="email" defaultValue={user?.email || ''} readOnly /></label>
          </div>
          <div className="col-md-6">
            <label>Phone<input type="tel" name="phone" placeholder="Your phone number" autoComplete="tel" defaultValue={user?.phone_number || user?.phone || ''} required /></label>
          </div>
          <div className="col-md-6">
            <label>Professional<input type="text" defaultValue={user ? (user.is_professional ? 'Yes' : 'No') : ''} readOnly /></label>
          </div>
          <div className="col-md-6">
            <label>Professional status<input type="text" defaultValue={user?.professional_status || ''} readOnly /></label>
          </div>
          <div className="col-md-6">
            <label>Firm / studio name<input type="text" name="company_name" placeholder="Your firm or studio" autoComplete="organization" defaultValue={user?.profile?.company || user?.company_name || user?.professional_company || ''} /></label>
          </div>
          <div className="col-md-6">
            <label>Designation<input type="text" defaultValue={user?.profile?.designation || ''} readOnly /></label>
          </div>
          <div className="col-md-6">
            <label>COA registration number<input type="text" name="coa_registration_number" placeholder="CA/2022/98765" defaultValue={user?.profile?.coa_registration_number || user?.coa_registration_number || ''} /></label>
          </div>
          <div className="col-md-6">
            <label>GSTIN<input type="text" name="gstin" placeholder="GSTIN" defaultValue={user?.profile?.gst_number || user?.gstin || user?.gst_number || ''} /></label>
          </div>
          <div className="col-12">
            <label>About<textarea name="about" placeholder="About" defaultValue={user?.profile?.about || ''} readOnly /></label>
          </div>
          <div className="col-md-6">
            <label>City<input type="text" name="city" placeholder="Your city" autoComplete="address-level2" defaultValue={user?.city || ''} /></label>
          </div>
          <div className="col-md-6">
            <label>State<input type="text" name="state" placeholder="Your state" autoComplete="address-level1" defaultValue={user?.state || ''} /></label>
          </div>
          <div className="col-md-6">
            <label>Pincode<input type="text" name="pincode" placeholder="395007" autoComplete="postal-code" defaultValue={user?.pincode || ''} /></label>
          </div>
          <div className="col-md-6">
            <label>Member since<input type="text" defaultValue={user?.created_at ? user.created_at.slice(0, 10) : ''} readOnly /></label>
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
            onNote('Passwords do not match.');
            return;
          }

          setSending(true);
          onNote('');

          try {
            const data = await changePassword({
              current_password: String(form.get('current_password')),
              password,
              password_confirmation: confirm,
            });
            onNote(data?.message || 'Password updated.');
            formElement.reset();
          } catch (error) {
            onNote(error instanceof Error ? error.message : 'Could not update the password.');
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
  );
};

export default ProfileForm;
