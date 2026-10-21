import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../Common/Breadcrumb';
import DesignFloatButton from '../Common/DesignFloatButton';
import Breadcrumbimage from '../../assets/images/page-header-bg.png';
import '../../assets/css/Checkout/Checkout.css';
import CheckoutForm from './components/CheckoutForm';

const Checkout = () => {
  return (
    <>
      <Header />
      <Breadcrumb title="Checkout" background={Breadcrumbimage} />
      <section className="sorath-checkout">
        <div className="container-fluid sorath-container-fluid">
          <CheckoutForm />
        </div>
      </section>
      <Footer />
      <DesignFloatButton />
    </>
  );
};

export default Checkout;
