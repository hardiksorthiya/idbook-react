import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../Common/Breadcrumb';
import DesignFloatButton from '../Common/DesignFloatButton';
import Breadcrumbimage from '../../assets/images/page-header-bg.png';
import '../../assets/css/Product/Product.css';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';

const Product = () => {
  return (
    <>
      <Header />
      <Breadcrumb title="Product Details" background={Breadcrumbimage} />
      <ProductInfo />
      <ProductTabs />
      <RelatedProducts />
      <Footer />
      <DesignFloatButton />
    </>
  );
};

export default Product;
