import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { sendContact } from '../../../services/contact';
import type { ContactBody } from '../../../types/contact';

const DesignForm = () => {
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const field = (name: string) => String(new FormData(form).get(name) || '').trim();
    const body: ContactBody = {
      name: field('name'),
      email: field('email'),
      phone: field('phone'),
      room_type: field('room_type'),
      carpet_area_sqft: Number(field('carpet_area_sqft')) || 0,
      budget_range: field('budget_range'),
      preferred_style: field('preferred_style'),
      message: field('message'),
    };

    setSending(true);
    setNote('');
    sendContact(body)
      .then((data) => {
        setNote(data?.message || 'Thank you. Our team will connect with you shortly.');
        form.reset();
      })
      .catch((error) => setNote(error instanceof Error ? error.message : 'Could not send your request.'))
      .finally(() => setSending(false));
  };

  return (
    <form className="sorath-design-form" onSubmit={submit}>
      <label>
        Full name *
        <input type="text" name="name" placeholder="Vikram Patel" required />
      </label>
      <div className="sorath-design-row">
        <label>
          Email *
          <input type="email" name="email" placeholder="vikram@example.com" required />
        </label>
        <label>
          Phone *
          <input type="tel" name="phone" placeholder="+91 98200 12340" required />
        </label>
      </div>
      <div className="sorath-design-row">
        <label>
          Room type *
          <input type="text" name="room_type" placeholder="Master Bedroom & Living Room" required />
        </label>
        <label>
          Carpet area (sq.ft) *
          <input type="number" name="carpet_area_sqft" min="1" placeholder="1200" required />
        </label>
      </div>
      <div className="sorath-design-row">
        <label>
          Budget range *
          <input type="text" name="budget_range" placeholder="5 Lakhs - 10 Lakhs" required />
        </label>
        <label>
          Preferred style *
          <input type="text" name="preferred_style" placeholder="Scandinavian Contemporary" required />
        </label>
      </div>
      <label>
        Message *
        <textarea name="message" rows={4} placeholder="Tell us about your space" required />
      </label>
      {note && <p className="sorath-design-note">{note}</p>}
      <button type="submit" className="sorath-design-submit" disabled={sending}>
        {sending ? 'Sending...' : 'Send request'} <FiArrowRight />
      </button>
    </form>
  );
};

export default DesignForm;
