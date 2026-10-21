import { useState } from 'react';
import type { FormEvent } from 'react';
import { FiArrowRight, FiCheck, FiStar } from 'react-icons/fi';
import { addProductReview } from '../../../../services/products';
import { loginPath } from '../../../../utils/loginPath';
import type { ProductDetail } from '../../../../types/product';

const ProductTabs = ({ product }: { product: ProductDetail }) => {
  const [tab, setTab] = useState('description');
  const [rating, setRating] = useState(5);
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);
  const specs = Object.entries(product.specification || {});
  const reviews = product.reviews || [];
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'info', label: 'Additional information' },
    { id: 'reviews', label: `Reviews (${product.reviews_count || reviews.length})` },
  ];

  const sendReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setSending(true);
    setNote('');

    addProductReview(product.slug, {
      rating,
      title: String(data.get('title') || ''),
      details: String(data.get('details') || ''),
    })
      .then((result) => {
        setNote(result.message || 'Thank you! Your review has been submitted for moderation.');
        form.reset();
        setRating(5);
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : 'Could not submit this review.';
        if (message === 'Please login first.') {
          window.location.href = loginPath();
          return;
        }
        setNote(message);
      })
      .finally(() => setSending(false));
  };

  return (
    <section className="sorath-pd-tabs">
      <div className="container-fluid sorath-container-fluid">
        <ul className="sorath-pd-nav">
          {tabs.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={tab === item.id ? 'is-active' : ''}
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {tab === 'description' && (
          <div className="sorath-pd-desc">
            {product.description ? (
              <div
                className="sorath-pd-html"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            ) : (
              <p>{product.design_style || 'No description yet.'}</p>
            )}
            <ul>
              {(product.deliverables || []).map((item) => (
                <li key={item.code}>
                  {item.available && <FiCheck />} {item.label}
                  {item.details ? ` — ${item.details}` : ''}
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'info' && (
          <table className="sorath-pd-table">
            <thead>
              <tr>
                <th>Plan Detail</th>
                <th>Size / Value</th>
              </tr>
            </thead>
            <tbody>
              {specs.map(([label, value]) => (
                <tr key={label}>
                  <td>{label}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'reviews' && (
          <div className="row gy-4">
            <div className="col-lg-5">
              {reviews.length === 0 && <p>No reviews yet.</p>}
              {reviews.map((review) => (
                <article key={review.id} className="sorath-pd-review">
                  <span className="sorath-pd-review-letter">{review.author.charAt(0)}</span>
                  <div>
                    <div className="sorath-pd-review-top">
                      <h4>
                        {review.author}
                        <span>{review.created_at}</span>
                      </h4>
                      <span className="sorath-pd-stars">
                        {Array.from({ length: review.rating || 0 }).map((_, index) => (
                          <FiStar key={index} />
                        ))}
                      </span>
                    </div>
                    <p>{review.review_text || 'No written review.'}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="col-lg-7">
              <form className="sorath-pd-form" onSubmit={sendReview}>
                <h4>Review this product</h4>
                <p>Share your rating and a short note about this design. Required fields are marked *</p>
                <div className="sorath-pd-form-rating">
                  <span>Your ratings :</span>
                  <span className="sorath-pd-stars">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const value = index + 1;
                      return (
                        <button
                          key={value}
                          type="button"
                          className={value <= rating ? 'is-on' : ''}
                          aria-label={`${value} star${value === 1 ? '' : 's'}`}
                          onClick={() => setRating(value)}
                        >
                          <FiStar />
                        </button>
                      );
                    })}
                  </span>
                </div>
                <input type="text" name="title" placeholder="Review title *" required />
                <textarea name="details" rows={5} placeholder="Your review details *" required />
                <button type="submit" className="sorath-pd-btn sorath-pd-btn-fill" disabled={sending}>
                  {sending ? 'Submitting...' : 'Submit'} <FiArrowRight />
                </button>
                {note && <p className="sorath-pd-form-note" role="status">{note}</p>}
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductTabs;
