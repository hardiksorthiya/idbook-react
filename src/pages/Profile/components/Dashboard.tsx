import { FiArrowDown } from 'react-icons/fi';
import { orders } from './Orders';

const stats = [
  { value: '3', label: 'Orders' },
  { value: '2', label: 'Ready to download' },
  { value: '1', label: 'In progress' },
];

const Dashboard = ({ onNote }: { onNote: (message: string) => void }) => {
  const latest = orders[0];

  return (
    <div>
      <p className="sorath-account-lead">Your orders, downloads, and account details in one place.</p>
      <div className="row g-3">
        {stats.map((item) => (
          <div className="col-md-4" key={item.label}>
            <div className="sorath-account-stat">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          </div>
        ))}
      </div>
      <h2>Latest order</h2>
      <article className="sorath-account-order">
        <img src={latest.image} alt={latest.name} />
        <div className="flex-grow-1">
          <span>{latest.id}</span>
          <h3>{latest.name}</h3>
          <p>12 Sep 2026 · Ready</p>
        </div>
        <button type="button" className="sorath-primary-btn sorath-account-download" onClick={() => onNote(`Downloaded ${latest.id}.`)}>
          <span>Download</span>
          <span><FiArrowDown /></span>
        </button>
      </article>
    </div>
  );
};

export default Dashboard;
