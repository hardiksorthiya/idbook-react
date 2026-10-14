import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../Common/Breadcrumb';
import DesignFloatButton from '../Common/DesignFloatButton';
import Breadcrumbimage from '../../assets/images/page-header-bg.png';
import WishlistGrid from './components/WishlistGrid';

const Wishlist = () => {
  return (
    <>
      <Header />
      <Breadcrumb title="Wishlist" background={Breadcrumbimage} />
      <section className="sorath-wishlist">
        <div className="container-fluid sorath-container-fluid">
          <WishlistGrid />
        </div>
      </section>
      <Footer />
      <DesignFloatButton />
    </>
  );
};

export default Wishlist;
