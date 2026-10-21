import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import '../../../assets/css/Home/Products.css';
import '../../../assets/css/Search/Search.css';
import ProductCard from '../../Common/ProductCard';
import Shop1 from '../../../assets/images/shop/shop-1.png';
import { searchProducts } from '../../../../services/search';
import type { SearchItem } from '../../../../types/search';

const SearchResults = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const [text, setText] = useState(query);
  const [items, setItems] = useState<SearchItem[]>([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    setText(query);
    const word = query.trim();

    if (!word) {
      setItems([]);
      setNote('');
      return;
    }

    let stop = false;
    setNote('Searching...');

    searchProducts(word)
      .then((list) => {
        if (stop) return;
        setItems(list);
        setNote('');
      })
      .catch((error) => {
        if (stop) return;
        setItems([]);
        setNote(error instanceof Error ? error.message : 'Could not search.');
      });

    return () => {
      stop = true;
    };
  }, [query]);

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
          {query.trim()
            ? `${items.length} result${items.length === 1 ? '' : 's'} for “${query}”`
            : 'Type a word to search'}
        </p>
      </form>

      {note && <p className="sorath-search-empty">{note}</p>}

      {!note && query.trim() && items.length === 0 ? (
        <div className="sorath-search-empty">
          <p>No designs found for “{query}”.</p>
          <Link to="/shop">Browse the shop</Link>
        </div>
      ) : (
        <div className="row g-4">
          {items.map((item) => (
            <div className="col-lg-4 col-md-6" key={item.id}>
              <ProductCard
                image={item.thumb_url || Shop1}
                hoverImage={item.thumb_url || Shop1}
                name={item.name}
                price={`₹${item.price.toLocaleString('en-IN')}`}
                categories={item.category_name ? [{ name: item.category_name }] : []}
                dimensions={item.design_code}
                link={`/product/${item.slug}`}
                productId={item.id}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchResults;
