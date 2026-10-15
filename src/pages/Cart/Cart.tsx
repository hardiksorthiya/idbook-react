import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../Common/Breadcrumb';
import DesignFloatButton from '../Common/DesignFloatButton';
import Breadcrumbimage from '../../assets/images/page-header-bg.png';
import CartList from './components/CartList';

const Cart = () => {
  return (
    <>
      <Header />
      <Breadcrumb title="Cart" background={Breadcrumbimage} />
      <section className="sorath-cart" data-aos="fade-up">
        <div className="container-fluid sorath-container-fluid">
          <CartList />
        </div>
      </section>
      <Footer />
      <DesignFloatButton />
    </>
  );
};

export default Cart;
