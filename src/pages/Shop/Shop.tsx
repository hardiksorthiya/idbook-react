import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../Common/Breadcrumb';
import DesignFloatButton from '../Common/DesignFloatButton';
import Breadcrumbimage from '../../assets/images/page-header-bg.png';
import ShopCatalog from './components/ShopCatalog';

const Shop = () => {
  return (
    <>
      <Header />
      <Breadcrumb title="Products" background={Breadcrumbimage} />
      <ShopCatalog />
      <Footer />
      <DesignFloatButton />
    </>
  );
};

export default Shop;
