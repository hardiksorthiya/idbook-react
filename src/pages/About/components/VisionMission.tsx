import { FiEye, FiTarget, FiCheckCircle } from 'react-icons/fi';

import Heading from '../../Common/Heading';
import '../../../assets/css/About/VisionMission.css';

const VisionMission = () => {
  return (
    <section className="sorath-vision-mission" data-aos="zoom-in">
      <div className="container-fluid sorath-container-fluid">
        <Heading
          badge="What Drives Us"
          title="Our"
          highlight="Vision And"
          afterHighlight="Mission"
          description=""
        />

        <div className="row g-3 sorath-vm-content">
          <div className="col-lg-6">
            <div className="sorath-vm-card h-100">
              <div className="sorath-vm-icon">
                <FiEye />
              </div>

              <h4>Our Vision</h4>
              <p className="sorath-vm-quote">
                “We design dreams and experiences.”
              </p>
              <p>
                Our vision is to design for an ordinary person’s need for a
                well-furnished home within budget. We explain interior design
                in simple language that anyone can understand, even without a
                technical background. IDBOOK is dedicated to crafting unique
                and responsive spaces that go above and beyond the standard
                building experience.
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="sorath-vm-card h-100">
              <div className="sorath-vm-icon">
                <FiTarget />
              </div>

              <h4>Our Mission</h4>
              <p className="sorath-vm-quote">
                “Every common man will have an enriching and well-furnished
                house within his budget.”
              </p>
              <p>
                Our mission is to provide guidance, knowledge, and awareness
                about interior design. IDBOOK is a free online interior
                designer for people who cannot hire one, helping them create
                beautiful homes within their budgets.
              </p>
            </div>
          </div>

          <div className="col-12">
            <div className="sorath-vm-card">
              <div className="sorath-vm-icon">
                <FiCheckCircle />
              </div>

              <h4>Mission Statement</h4>

              <div className="row g-3">
                <div className="col-md-6">
                  <p className="sorath-vm-point">
                    <FiCheckCircle />
                    To become the leader in innovative products and
                    state-of-the-art execution.
                  </p>
                </div>

                <div className="col-md-6">
                  <p className="sorath-vm-point">
                    <FiCheckCircle />
                    To become the client’s first choice through quality
                    materials and outstanding workmanship.
                  </p>
                </div>

                <div className="col-md-6">
                  <p className="sorath-vm-point">
                    <FiCheckCircle />
                    To satisfy each client’s desires and needs with
                    world-class interiors and furnishings.
                  </p>
                </div>

                <div className="col-md-6">
                  <p className="sorath-vm-point">
                    <FiCheckCircle />
                    To listen, observe, and make thoughtful decisions for
                    every project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;