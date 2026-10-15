import { useEffect, useState } from 'react';
import { getMe, readUser } from '../../../../services/me';
import { logoutUser } from '../../../../services/logout';
import { clearToken } from '../../../../utils/token';
import type { User } from '../../../../types/me';
import Dashboard from './Dashboard';
import Orders from './Orders';
import ProfileForm from './ProfileForm';

const ProfileAccount = () => {
  const [tab, setTab] = useState('dashboard');
  const [note, setNote] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);
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
    if (loggingOut) return;

    setLoggingOut(true);
    setNote('');

    try {
      await logoutUser();
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      if (!/unauth/i.test(message)) {
        setNote(message || 'Could not log out.');
        setLoggingOut(false);
        return;
      }
    }

    clearToken();
    window.location.href = '/login';
  };

  return (
    <div className="sorath-account-shell">
      <div className="sorath-account-nav d-flex flex-wrap align-items-center gap-2">
        <button type="button" className={tab === 'dashboard' ? 'is-active' : ''} onClick={() => openTab('dashboard')}>Dashboard</button>
        <button type="button" className={tab === 'orders' ? 'is-active' : ''} onClick={() => openTab('orders')}>Orders</button>
        <button type="button" className={tab === 'profile' ? 'is-active' : ''} onClick={() => openTab('profile')}>Profile</button>
        <button type="button" className="sorath-account-logout" onClick={signOut} disabled={loggingOut}>Log out</button>
      </div>

      {tab === 'dashboard' && <Dashboard onNote={setNote} />}
      {tab === 'orders' && <Orders onNote={setNote} />}
      {tab === 'profile' && <ProfileForm user={user} setUser={setUser} onNote={setNote} />}

      {note && <p className="sorath-auth-note" role="status">{note}</p>}
    </div>
  );
};

export default ProfileAccount;
