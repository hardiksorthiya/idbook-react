import '../../../assets/css/Home/Products.css';
import ProductCard from '../../Common/ProductCard';
import Shop1 from '../../../assets/images/shop/shop-1.png';
import type { RelatedProduct } from '../../../../types/product';

const RelatedProducts = ({ items }: { items: RelatedProduct[] }) => {
  if (!items.length) return null;

  return (
    <section className="sorath-pd-related">
      <div className="container-fluid sorath-container-fluid">
        <h2>Related Products</h2>
        <div className="row gy-4">
          {items.map((product) => (
            <div className="col-lg-3 col-md-6" key={product.id}>
              <ProductCard
                image={product.thumb_url || product.main_image_url || Shop1}
                hoverImage={product.main_image_url || product.thumb_url || Shop1}
                name={product.name}
                price={`₹${product.price.toLocaleString('en-IN')}`}
                categories={product.primary_category ? [product.primary_category.name] : []}
                dimensions={product.room_dimensions || ''}
                link={`/product/${product.slug}`}
                productId={product.id}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
