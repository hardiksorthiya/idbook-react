import '../../../assets/css/Home/Products.css';
import ProductCard from '../../Common/ProductCard';

import Shop1 from '../../../assets/images/shop/shop-1.png';
import Shop2 from '../../../assets/images/shop/shop-2.png';
import Shop3 from '../../../assets/images/shop/shop-3.png';
import Shop4 from '../../../assets/images/shop/shop-4.png';
import Shop5 from '../../../assets/images/shop/shop-5.png';

const products = [
  { image: Shop1, hoverImage: Shop2, name: 'Modern Caramel Fabric Sofa', price: '$157.00', dimensions: `16'-5" × 12'-6"` },
  { image: Shop2, hoverImage: Shop3, name: 'Modern Caramel Fabric Sofa', price: '$157.00', dimensions: `8'-2" × 7'-4"` },
  { image: Shop3, hoverImage: Shop4, name: 'Modern Caramel Fabric Sofa', price: '$157.00', dimensions: `4'-0" × 3'-6"` },
  { image: Shop4, hoverImage: Shop5, name: 'Modern Caramel Fabric Sofa', price: '$157.00', dimensions: `12'-0" × 10'-8"` },
];

const RelatedProducts = () => {
  return (
    <section className="sorath-pd-related">
      <div className="container-fluid sorath-container-fluid">
        <h2>Related Products</h2>
        <div className="row gy-4">
          {products.map((product) => (
            <div className="col-lg-3 col-md-6" key={product.dimensions}>
              <ProductCard
                {...product}
                categories={['Living Room', 'Sofa']}
                link="/product"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
