import { FiImage, FiHome, FiUsers } from "react-icons/fi";
import Heading from "../../Common/Heading";
import "../../../assets/css/About/WhatID.css";

const features = [
  {
    icon: <FiImage />,
    title: "Explore the world",
    description:
      "Browse some of the most beautiful interior design photographs from around the world, and develop a taste for interiors from many cultures.",
  },
  {
    icon: <FiHome />,
    title: "Find the right design",
    description:
      "Choose the design that fits your home, with every single detail an interior designer would provide, kept within your budget.",
  },
  {
    icon: <FiUsers />,
    title: "Meet professionals",
    description:
      "Connect with home professionals around the world and bring a wider view of interior design into your own space.",
  },
];

const WhatID = () => {
  return (
    <section className="sorath-about-intro">
      <div className="container-fluid sorath-container-fluid">
        <Heading
          badge="What IDBOOK Is"
          title="A Place To Design"
          highlight="Your Home,"
          afterHighlight="Your Way"
          description=""
        />

        <div className="row g-3 py-50">
          {features.map((feature) => (
            <div className="col-lg-4" key={feature.title}>
              <div className="sorath-about-feature h-100">
                <div className="sorath-about-feature-icon">
                  {feature.icon}
                </div>

                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="sorath-about-highlight d-flex justify-content-between align-items-center gap-4 ">
          <div>
            <h3>AutoCAD plans and 3D models</h3>
            <p>
              IDBOOK is one of the first websites to give you AutoCAD plans and
              3D models of your space, with a wide range of options and filters
              so you can find the option that matches your space exactly.
            </p>
          </div>

          <div className="sorath-about-audience d-flex flex-column gap-2">
            <span>Interior designers</span>
            <span>Students</span>
            <span>Homeowners</span>
          </div>
        </div>

        <p className="sorath-about-bottom">
          IDBOOK is the place for interior designers, students, and every
          homeowner who wants to remodel a space within budget, without an
          interior designer.
        </p>
      </div>
    </section>
  );
};

export default WhatID;