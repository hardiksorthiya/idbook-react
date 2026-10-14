import { FiSearch } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

import SidebarImage1 from '../../../assets/images/shop/sidebar-img-1.png';
import SidebarImage2 from '../../../assets/images/shop/sidebar-img-2.png';
import SidebarImage3 from '../../../assets/images/shop/sidebar-img-3.png';
import SidebarImage4 from '../../../assets/images/shop/sidebar-img-4.png';

type ShopCategory = {
  name: string;
  count: number;
};

type ShopFilterProps = {
  search: string;
  onSearchChange: (value: string) => void;
  categories: ShopCategory[];
  selectedCategories: string[];
  onToggleCategory: (name: string) => void;
  minPrice: number;
  maxPrice: number;
  priceLimit: number;
  onPriceLimitChange: (value: number) => void;
};

const featuredProducts = [
  {
    id: 1,
    image: SidebarImage1,
    name: 'Durable Timber Structure',
    price: '$55.00',
  },
  {
    id: 2,
    image: SidebarImage2,
    name: 'Arabesque Design vase',
    price: '$55.00',
  },
  {
    id: 3,
    image: SidebarImage3,
    name: 'Coffee Table Ocean Blue',
    price: '$55.00',
  },
  {
    id: 4,
    image: SidebarImage4,
    name: 'Framed Canvas Painting',
    price: '$55.00',
  },
];

const ShopFilter = ({
  search,
  onSearchChange,
  categories,
  selectedCategories,
  onToggleCategory,
  minPrice,
  maxPrice,
  priceLimit,
  onPriceLimitChange,
}: ShopFilterProps) => {
  return (
    <div className="sorath-shop-filter-panel">
      <div className="sorath-shop-sidebar">
        <h3 className="sorath-shop-sidebar-title">Search</h3>
        <form
          className="sorath-shop-search"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search..."
            aria-label="Search products"
          />
          <button type="submit" className="sorath-shop-search-btn" aria-label="Search">
            <FiSearch />
          </button>
        </form>
      </div>

      <div className="sorath-shop-sidebar">
        <h3 className="sorath-shop-sidebar-title">Categories</h3>
        <ul className="sorath-shop-categories">
          {categories.map((category) => {
            const inputId = `shop-category-${category.name.replace(/\s+/g, '-').toLowerCase()}`;

            return (
              <li key={category.name}>
                <input
                  type="checkbox"
                  id={inputId}
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => onToggleCategory(category.name)}
                />
                <label htmlFor={inputId}>
                  {category.name} ({category.count})
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="sorath-shop-sidebar">
        <h3 className="sorath-shop-sidebar-title">Filter by price</h3>
        <div className="sorath-shop-price">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceLimit}
            aria-label="Maximum price"
            onChange={(event) => onPriceLimitChange(Number(event.target.value))}
          />
          <div className="sorath-shop-price-output">
            <h3>
              Price: ${minPrice} — ${priceLimit}
            </h3>
          </div>
        </div>
      </div>

      <div className="sorath-shop-sidebar">
        <h3 className="sorath-shop-sidebar-title">Brands</h3>
        <div className="sorath-shop-featured">
          {featuredProducts.map((product) => (
            <a key={product.id} href="#" className="sorath-shop-featured-item">
              <img src={product.image} alt={product.name} />
              <div>
                <h4>{product.name}</h4>
                <span className="sorath-shop-stars" aria-label="5 star rating">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </span>
                <span className="sorath-shop-featured-price">{product.price}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopFilter;
