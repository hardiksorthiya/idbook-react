import { FiSearch } from 'react-icons/fi';

type ShopCategory = {
  name: string;
  slug: string;
  count: number;
};

type ShopFilterProps = {
  search: string;
  onSearchChange: (value: string) => void;
  categories: ShopCategory[];
  selectedCategories: string[];
  onToggleCategory: (slug: string) => void;
  styles: string[];
  selectedStyles: string[];
  onToggleStyle: (style: string) => void;
  minPrice: number;
  maxPrice: number;
  priceLimit: number;
  onPriceLimitChange: (value: number) => void;
};

const ShopFilter = ({
  search,
  onSearchChange,
  categories,
  selectedCategories,
  onToggleCategory,
  styles,
  selectedStyles,
  onToggleStyle,
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
          {categories.map((category) => (
            <li key={category.slug}>
              <input
                type="checkbox"
                id={`shop-category-${category.slug}`}
                checked={selectedCategories.includes(category.slug)}
                onChange={() => onToggleCategory(category.slug)}
              />
              <label htmlFor={`shop-category-${category.slug}`}>
                {category.name} ({category.count})
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="sorath-shop-sidebar">
        <h3 className="sorath-shop-sidebar-title">Filter by price</h3>
        <div className="sorath-shop-price">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceLimit || maxPrice}
            aria-label="Maximum price"
            onChange={(event) => onPriceLimitChange(Number(event.target.value))}
          />
          <div className="sorath-shop-price-output">
            <h3>
              Price: ₹{minPrice} — ₹{priceLimit || maxPrice}
            </h3>
          </div>
        </div>
      </div>

      <div className="sorath-shop-sidebar">
        <h3 className="sorath-shop-sidebar-title">Design style</h3>
        <ul className="sorath-shop-categories">
          {styles.map((style) => (
            <li key={style}>
              <input
                type="checkbox"
                id={`shop-style-${style.replace(/\s+/g, '-').toLowerCase()}`}
                checked={selectedStyles.includes(style)}
                onChange={() => onToggleStyle(style)}
              />
              <label htmlFor={`shop-style-${style.replace(/\s+/g, '-').toLowerCase()}`}>
                {style}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopFilter;
