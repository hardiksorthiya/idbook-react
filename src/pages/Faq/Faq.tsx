import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../Common/Breadcrumb';
import DesignFloatButton from '../Common/DesignFloatButton';
import Heading from '../Common/Heading';
import Newsletter from '../Common/Newsletter';
import Breadcrumbimage from '../../assets/images/page-header-bg.png';
import '../../assets/css/Faq/Faq.css';
import FaqList from './components/FaqList';
import FaqSide from './components/FaqSide';

const Faq = () => {
  return (
    <>
      <Header />
      <Breadcrumb title="FAQ" background={Breadcrumbimage} />
      <section className="sorath-faq">
        <div className="container-fluid sorath-container-fluid">
          <Heading
            badge="FAQs"
            title="Quick and clear"
            highlight="answers to your key"
            afterHighlight="questions"
            breakBeforeHighlight
          />

          <div className="row gy-5">
            <div className="col-lg-8 col-xl-9">
              <FaqList />
            </div>
            <div className="col-lg-4 col-xl-3">
              <FaqSide />
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
      <Footer />
      <DesignFloatButton />
    </>
  );
};

export default Faq;
