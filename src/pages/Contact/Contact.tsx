import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../Common/Breadcrumb';
import DesignFloatButton from '../Common/DesignFloatButton';
import Heading from '../Common/Heading';
import Breadcrumbimage from '../../assets/images/page-header-bg.png';
import '../../assets/css/Contact/Contact.css';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';

const Contact = () => {
  return (
    <>
      <Header />
      <Breadcrumb title="Contact Us" background={Breadcrumbimage} />
      <section className="sorath-contact" data-aos="fade-left">
        <div className="container-fluid sorath-container-fluid">
          <Heading
            badge="Get In Touch"
            title="Have a Project in"
            highlight="Mind? Let's Make"
            afterHighlight="It Happen"
            breakBeforeHighlight
          />

          <div className="row gy-5 align-items-end">
            <div className="col-lg-6">
              <ContactInfo />
            </div>
            <div className="col-lg-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <DesignFloatButton />
    </>
  );
};

export default Contact;
