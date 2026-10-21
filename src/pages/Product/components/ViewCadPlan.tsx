import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';

type ViewCadPlanProps = {
  image: string;
  name: string;
};

const ViewCadPlan = ({ image, name }: ViewCadPlanProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="sorath-pd-cad"
        onClick={() => setOpen(true)}
      >
        View Cad Plan
      </button>

      {createPortal(
        <div
          className={`sorath-pd-cad-popup${open ? ' is-open' : ''}`}
          role="dialog"
          aria-modal={open}
          aria-hidden={!open}
          aria-label="CAD plan preview"
        >
          <button
            type="button"
            className="sorath-pd-cad-backdrop"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
          <div className="sorath-pd-cad-card">
            <div className="sorath-pd-cad-head d-flex align-items-center justify-content-between">
              <h3 className="mb-0">CAD Plan</h3>
              <button
                type="button"
                className="sorath-pd-cad-close"
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                <FiX />
              </button>
            </div>
            <div className="sorath-pd-cad-body">
              <img src={image} alt={`${name} CAD plan`} />
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export default ViewCadPlan;
