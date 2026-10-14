import { useState } from 'react';
import { FiArrowRight, FiCheck, FiStar } from 'react-icons/fi';

import Review1 from '../../../assets/images/shop/review-1.jpg';
import Review2 from '../../../assets/images/shop/review-2.jpg';

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'info', label: 'Additional information' },
  { id: 'reviews', label: 'Reviews (3)' },
];

const specs = [
  ['Plot Size', `30' × 40' (1,200 sq.ft)`],
  ['Built-up Area', '1,050 sq.ft'],
  ['Room Size', `16'-5" × 12'-6"`],
  ['Floors', 'G + 1'],
  ['Bedrooms / Bathrooms', '3 / 2'],
  ['Files Included', '3D View, CAD (DWG / DXF), PDF'],
];

const reviews = [
  { name: 'Eleanor Fant', date: '06 March, 2026', image: Review1 },
  { name: 'Haliey White', date: '06 March, 2026', image: Review2 },
];

const ProductTabs = () => {
  const [tab, setTab] = useState('description');

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
            <p>
              A complete look at the sofa finish, frame, and fabric. The caramel
              upholstery is easy to place with wood, stone, and neutral rooms,
              and the seat stays comfortable for everyday use.
            </p>
            <ul>
              <li><FiCheck /> Soft caramel fabric upholstery</li>
              <li><FiCheck /> Solid wood frame with compact depth</li>
              <li><FiCheck /> Removable seat cushions</li>
              <li><FiCheck /> Suitable for living and lounge rooms</li>
              <li><FiCheck /> Easy to pair with existing furniture</li>
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
              {reviews.map((review) => (
                <article key={review.name} className="sorath-pd-review">
                  <img src={review.image} alt={review.name} />
                  <div>
                    <div className="sorath-pd-review-top">
                      <h4>
                        {review.name}
                        <span>{review.date}</span>
                      </h4>
                      <span className="sorath-pd-stars">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <FiStar key={index} />
                        ))}
                      </span>
                    </div>
                    <p>
                      Designed very similarly to the nearly double priced Galaxy
                      tab S6, with the only removal being.
                    </p>
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
