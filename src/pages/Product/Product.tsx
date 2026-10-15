import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../Common/Breadcrumb';
import DesignFloatButton from '../Common/DesignFloatButton';
import Breadcrumbimage from '../../assets/images/page-header-bg.png';
import '../../assets/css/Product/Product.css';
import { getProduct } from '../../../services/products';
import type { ProductDetail } from '../../../types/product';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import RelatedProducts from './components/RelatedProducts';

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!slug) {
      setProduct(null);
      setNote('Open a product from the shop.');
      return;
    }

    setNote('Loading...');
    getProduct(slug)
      .then((item) => {
        setProduct(item);
        setNote('');
      })
      .catch((error) => {
        setProduct(null);
        setNote(error instanceof Error ? error.message : 'Could not load this product.');
      });
  }, [slug]);

  return (
    <>
      <Header />
      <Breadcrumb title={product?.name || 'Product Details'} background={Breadcrumbimage} />
      {product ? (
        <>
          <ProductInfo product={product} />
          <ProductTabs product={product} />
          <RelatedProducts items={product.related_products || []} />
        </>
      ) : (
        <section className="sorath-pd">
          <div className="container-fluid sorath-container-fluid">
            <p>{note}</p>
          </div>
        </section>
      )}
      <Footer />
      <DesignFloatButton />
    </>
  );
};

export default Product;
