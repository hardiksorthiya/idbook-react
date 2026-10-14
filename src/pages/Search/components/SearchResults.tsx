import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import '../../../assets/css/Home/Products.css';
import '../../../assets/css/Search/Search.css';
import ProductCard from '../../Common/ProductCard';
import Shop1 from '../../../assets/images/shop/shop-1.png';
import Shop2 from '../../../assets/images/shop/shop-2.png';
import Shop3 from '../../../assets/images/shop/shop-3.png';
import Shop4 from '../../../assets/images/shop/shop-4.png';
import Shop5 from '../../../assets/images/shop/shop-5.png';
import Shop6 from '../../../assets/images/shop/shop-6.png';

const products = [
  { image: Shop1, hoverImage: Shop2, name: 'Modern Caramel Fabric Sofa', price: '$157.00', categories: ['Furniture', 'Sofa'], dimensions: `16'-5" × 12'-6"`, link: '/product' },
  { image: Shop2, hoverImage: Shop3, name: 'Oak Dining Bench', price: '$89.00', categories: ['Bench'], dimensions: `8'-2" × 7'-4"`, link: '/product' },
  { image: Shop3, hoverImage: Shop4, name: 'Walnut Bookcase', price: '$210.00', categories: ['Bookcase'], dimensions: `4'-0" × 3'-6"`, link: '/product' },
  { image: Shop4, hoverImage: Shop5, name: 'Marble Dining Table', price: '$340.00', categories: ['Dining Table'], dimensions: `12'-0" × 10'-8"`, link: '/product' },
  { image: Shop5, hoverImage: Shop6, name: 'Titan Office Chair', price: '$189.00', categories: ['Office Chair'], dimensions: `6'-5" × 5'-2"`, link: '/product' },
  { image: Shop6, hoverImage: Shop1, name: 'Arabesque Design Vase', price: '$55.00', categories: ['Decor'], dimensions: `2'-0" × 1'-6"`, link: '/product' },
];

const SearchResults = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const [text, setText] = useState(query);

  const word = query.trim().toLowerCase();
  const results = word
    ? products.filter((item) =>
        item.name.toLowerCase().includes(word) ||
        item.categories.some((category) => category.toLowerCase().includes(word)),
      )
    : products;

  return (
    <>
      <form
        className="row g-2 align-items-center sorath-search-bar"
        onSubmit={(event) => {
          event.preventDefault();
          setParams(text.trim() ? { q: text.trim() } : {});
        }}
      >
        <div className="col-md">
          <input
            type="search"
            value={text}
            placeholder="Search designs..."
            aria-label="Search designs"
            onChange={(event) => setText(event.target.value)}
          />
        </div>
        <div className="col-md-auto">
          <button type="submit" className="sorath-primary-btn primary-btn-2">
            <span>Search</span>
            <span><FiArrowRight /></span>
          </button>
        </div>
        <p>
          {word
            ? `${results.length} result${results.length === 1 ? '' : 's'} for “${query}”`
            : `${products.length} designs`}
        </p>
      </form>

      {results.length === 0 ? (
        <div className="sorath-search-empty">
          <p>No designs found for “{query}”.</p>
          <a href="/shop">Browse the shop</a>
        </div>
      ) : (
        <div className="row g-4">
          {results.map((item) => (
            <div className="col-lg-4 col-md-6" key={item.name}>
              <ProductCard {...item} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchResults;
