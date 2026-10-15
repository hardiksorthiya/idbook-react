import { useState } from 'react';
import { FiArrowRight, FiCheck, FiStar } from 'react-icons/fi';
import type { ProductDetail } from '../../../../types/product';

const ProductTabs = ({ product }: { product: ProductDetail }) => {
  const [tab, setTab] = useState('description');
  const specs = Object.entries(product.specification || {});
  const reviews = product.reviews || [];
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'info', label: 'Additional information' },
    { id: 'reviews', label: `Reviews (${product.reviews_count || reviews.length})` },
  ];

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
            <p>{product.description || product.design_style || 'No description yet.'}</p>
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
              <form
                className="sorath-pd-form"
                onSubmit={(event) => event.preventDefault()}
              >
                <h4>Review this product</h4>
                <p>Your email address will not be published. Required fields are marked *</p>
                <div className="sorath-pd-form-rating">
                  <span>Your ratings :</span>
                  <span className="sorath-pd-stars">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FiStar key={index} />
                    ))}
                  </span>
                </div>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea rows={5} placeholder="Comment" required />
                <label>
                  <input type="checkbox" />
                  Save my name and email in this browser for the next time I comment.
                </label>
                <button type="submit" className="sorath-pd-btn sorath-pd-btn-fill">
                  Submit <FiArrowRight />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductTabs;
