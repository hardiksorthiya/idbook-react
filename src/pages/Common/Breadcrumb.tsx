import { Link } from 'react-router-dom';
import '../../assets/css/Common/Breadcrumb.css';

type BreadcrumbProps = {
  title: string;
  background: string;
};

const Breadcrumb = ({ title, background }: BreadcrumbProps) => {
  return (
    <section
      className="sorath-breadcrumb"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="sorath-breadcrumb-overlay" />

      <div className="container-fluid sorath-container-fluid">
        <div className="sorath-breadcrumb-content">
          <h1>{title}</h1>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li
                className="breadcrumb-item active"
                aria-current="page"
              >
                {title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
