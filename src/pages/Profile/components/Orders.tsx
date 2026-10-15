import { FiArrowDown } from 'react-icons/fi';
import Sofa from '../../../assets/images/shop/shop-2.png';
import Table from '../../../assets/images/shop/sidebar-img-3.png';
import Vase from '../../../assets/images/shop/sidebar-img-2.png';

export const orders = [
  { id: 'IDB-1042', name: 'Modern Caramel Fabric Sofa', meta: '12 Sep 2026 · ₹48,500 · Ready', image: Sofa, ready: true },
  { id: 'IDB-1038', name: 'Coffee Table Ocean Blue', meta: '28 Aug 2026 · ₹18,900 · Ready', image: Table, ready: true },
  { id: 'IDB-1021', name: 'Arabesque Design vase', meta: '4 Aug 2026 · ₹6,400 · In progress', image: Vase, ready: false },
];

const Orders = ({ onNote }: { onNote: (message: string) => void }) => {
  return (
    <div>
      <p className="sorath-account-lead">Download a ready order, or wait while a new one is prepared.</p>
      {orders.map((order) => (
        <article className="sorath-account-order" key={order.id}>
          <img src={order.image} alt={order.name} />
          <div className="flex-grow-1">
            <span>{order.id}</span>
            <h3>{order.name}</h3>
            <p>{order.meta}</p>
          </div>
          <button
            type="button"
            className="sorath-primary-btn sorath-account-download"
            disabled={!order.ready}
            onClick={() => onNote(`Downloaded ${order.id}.`)}
          >
            <span>{order.ready ? 'Download' : 'Preparing'}</span>
            {order.ready && <span><FiArrowDown /></span>}
          </button>
        </article>
      ))}
    </div>
  );
};

export default Orders;
