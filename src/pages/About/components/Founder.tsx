import Heading from "../../Common/Heading";
import "../../../assets/css/About/Founder.css";

// import FounderImage from "../../../assets/images/founder.webp";

const Founder = () => {
  return (
    <section className="sorath-founder py-100" data-aos="fade-right">
      <div className="container-fluid sorath-container-fluid">
        <Heading
          badge="Our Beginning"
          title="How"
          highlight="IDBOOK"
          afterHighlight="Started"
          description=""
        />

        <div className="row align-items-center g-4 py-50">
          {/* Founder Content */}
          <div className="col-lg-8">
            <div className="sorath-founder-content">
              <h5>Founder Alpesh Patel</h5>

              <p>
                When founder Alpesh Patel was remodeling a personal project,
                the work began the way these projects often do. Halfway through,
                the client was influenced by someone who said that hiring an
                interior designer would only lead to spending more on the home,
                and that remodeling on your own was the better path.
              </p>

              <p>
                That moment stayed with him. Alpesh began to ask whether this
                was a common belief among ordinary people: that an interior
                designer takes a home out of budget. From that thought came a
                decision — to build a platform where any person can remodel a
                home within budget, without an interior designer.
              </p>

              <p>That platform is IDBOOK.</p>
            </div>
          </div>

          {/* Founder Image */}
          {/* <div className="col-lg-5">
            <div className="sorath-founder-image">
              <img
                src={FounderImage}
                alt="IDBOOK founder Alpesh Patel"
                className="img-fluid"
              />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Founder;