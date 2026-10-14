import { useEffect, useMemo, useRef, useState } from 'react';
import { FiArrowRight, FiSliders } from 'react-icons/fi';

import '../../../assets/css/Home/Products.css';
import '../../../assets/css/Shop/Shop.css';
import ProductCard from '../../Common/ProductCard';
import ShopFilter from './ShopFilter';

import Shop1 from '../../../assets/images/shop/shop-1.png';
import Shop2 from '../../../assets/images/shop/shop-2.png';
import Shop3 from '../../../assets/images/shop/shop-3.png';
import Shop4 from '../../../assets/images/shop/shop-4.png';
import Shop5 from '../../../assets/images/shop/shop-5.png';
import Shop6 from '../../../assets/images/shop/shop-6.png';
import Shop7 from '../../../assets/images/shop/shop-7.png';
import Shop8 from '../../../assets/images/shop/shop-8.png';
import Shop9 from '../../../assets/images/shop/shop-9.png';

const MIN_PRICE = 10;
const MAX_PRICE = 500;
const PAGE_SIZE = 6;

const categoryNames = [
  'Bench',
  'Bookcase',
  'Dining Table',
  'Dressing Table',
  'Clothing & Apparel',
  'Furniture',
  'Office Chair',
  'Uncategorized',
];

const sortOptions = [
  { value: 'default', label: 'Default Sorting' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'date', label: 'Date' },
  { value: 'trending', label: 'Trending' },
  { value: 'featured', label: 'Featured' },
  { value: 'discounted', label: 'Discounted' },
];

const products = [
  {
    id: 1,
    image: Shop1,
    hoverImage: Shop2,
    name: 'Modern Caramel Fabric Sofa',
    priceValue: 157,
    price: '$157.00',
    categories: ['Furniture'],
    dimensions: `16'-5" × 12'-6"`,
    link: '/product',
    popular: 96,
    date: 9,
    trending: 80,
    featured: true,
    discounted: false,
  },
  {
    id: 2,
    image: Shop2,
    hoverImage: Shop3,
    name: 'Oak Dining Bench',
    priceValue: 89,
    price: '$89.00',
    categories: ['Bench'],
    dimensions: `8'-2" × 7'-4"`,
    link: '/product',
    popular: 70,
    date: 8,
    trending: 60,
    featured: false,
    discounted: true,
  },
  {
    id: 3,
    image: Shop3,
    hoverImage: Shop4,
    name: 'Walnut Bookcase',
    priceValue: 210,
    price: '$210.00',
    categories: ['Bookcase'],
    dimensions: `4'-0" × 3'-6"`,
    link: '/product',
    popular: 84,
    date: 7,
    trending: 74,
    featured: true,
    discounted: false,
  },
  {
    id: 4,
    image: Shop4,
    hoverImage: Shop5,
    name: 'Marble Dining Table',
    priceValue: 340,
    price: '$340.00',
    categories: ['Dining Table'],
    dimensions: `12'-0" × 10'-8"`,
    link: '/product',
    popular: 91,
    date: 6,
    trending: 88,
    featured: false,
    discounted: false,
  },
  {
    id: 5,
    image: Shop5,
    hoverImage: Shop6,
    name: 'Soft Linen Dressing Table',
    priceValue: 275,
    price: '$275.00',
    categories: ['Dressing Table'],
    dimensions: `6'-5" × 5'-2"`,
    link: '/product',
    popular: 77,
    date: 5,
    trending: 66,
    featured: false,
    discounted: true,
  },
  {
    id: 6,
    image: Shop6,
    hoverImage: Shop7,
    name: 'Linen Throw Set',
    priceValue: 45,
    price: '$45.00',
    categories: ['Clothing & Apparel'],
    dimensions: `16'-5" × 12'-6"`,
    link: '/product',
    popular: 62,
    date: 4,
    trending: 90,
    featured: false,
    discounted: true,
  },
  {
    id: 7,
    image: Shop7,
    hoverImage: Shop8,
    name: 'Titan Office Chair',
    priceValue: 189,
    price: '$189.00',
    categories: ['Office Chair'],
    dimensions: `8'-2" × 7'-4"`,
    link: '/product',
    popular: 88,
    date: 3,
    trending: 72,
    featured: true,
    discounted: false,
  },
  {
    id: 8,
    image: Shop8,
    hoverImage: Shop9,
    name: 'Framed Canvas Painting',
    priceValue: 120,
    price: '$120.00',
    categories: ['Uncategorized'],
    dimensions: `4'-0" × 3'-6"`,
    link: '/product',
    popular: 58,
    date: 2,
    trending: 54,
    featured: false,
    discounted: false,
  },
  {
    id: 9,
    image: Shop9,
    hoverImage: Shop1,
    name: 'Arabesque Design Vase',
    priceValue: 55,
    price: '$55.00',
    categories: ['Uncategorized'],
    dimensions: `12'-0" × 10'-8"`,
    link: '/product',
    popular: 64,
    date: 1,
    trending: 49,
    featured: false,
    discounted: true,
  },
];

const ShopCatalog = () => {
  const sortRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceLimit, setPriceLimit] = useState(MAX_PRICE);
  const [sort, setSort] = useState('default');
  const [sortOpen, setSortOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = categoryNames.map((name) => ({
    name,
    count: products.filter((product) => product.categories.includes(name)).length,
  }));

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const matched = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategories.length === 0 ||
        product.categories.some((category) => selectedCategories.includes(category));
      const matchesPrice =
        product.priceValue >= MIN_PRICE && product.priceValue <= priceLimit;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    const sorted = [...matched];

    if (sort === 'popular') sorted.sort((a, b) => b.popular - a.popular);
    if (sort === 'date') sorted.sort((a, b) => b.date - a.date);
    if (sort === 'trending') sorted.sort((a, b) => b.trending - a.trending);
    if (sort === 'featured') {
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    if (sort === 'discounted') {
      sorted.sort((a, b) => Number(b.discounted) - Number(a.discounted));
    }

    return sorted;
  }, [priceLimit, search, selectedCategories, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + PAGE_SIZE);
  const rangeStart = filteredProducts.length === 0 ? 0 : startIndex + 1;
  const rangeEnd = startIndex + visibleProducts.length;
  const activeSort = sortOptions.find((option) => option.value === sort) ?? sortOptions[0];

  useEffect(() => {
    setPage(1);
  }, [search, selectedCategories, priceLimit, sort]);

  useEffect(() => {
    const closeSort = (event: MouseEvent) => {
      if (!sortRef.current?.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };

    const closeOnDesktop = () => {
      if (window.innerWidth >= 992) setFiltersOpen(false);
    };

    document.addEventListener('mousedown', closeSort);
    window.addEventListener('resize', closeOnDesktop);

    return () => {
      document.removeEventListener('mousedown', closeSort);
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, []);

  const toggleCategory = (name: string) => {
    setSelectedCategories((current) =>
      current.includes(name)
        ? current.filter((category) => category !== name)
        : [...current, name],
    );
  };

  return (
    <section className="sorath-shop">
      <div className="container-fluid sorath-container-fluid">
        <div className="row">
          <div className={`col-lg-3 sorath-shop-filter-col ${filtersOpen ? 'is-open' : ''}`}>
            <h3 className="sorath-shop-drawer-title">Filters</h3>
            <ShopFilter
              search={search}
              onSearchChange={setSearch}
              categories={categories}
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              minPrice={MIN_PRICE}
              maxPrice={MAX_PRICE}
              priceLimit={priceLimit}
              onPriceLimitChange={setPriceLimit}
            />
          </div>

          <div className="col-lg-9">
            <div className="sorath-shop-toolbar">
              <div className="sorath-shop-view">
                <div className="sorath-shop-view-tabs" role="tablist" aria-label="Product layout">
                  <button
                    type="button"
                    className={view === 'grid' ? 'is-active' : ''}
                    aria-label="Grid view"
                    aria-pressed={view === 'grid'}
                    onClick={() => setView('grid')}
                  >
                    <svg width="20" height="17" viewBox="0 0 20 17" aria-hidden="true">
                      <rect x="15" width="5" height="3" fill="currentColor" />
                      <rect x="15" y="7" width="5" height="3" fill="currentColor" />
                      <rect x="15" y="14" width="5" height="3" fill="currentColor" />
                      <rect x="7.71875" width="5" height="3" fill="currentColor" />
                      <rect x="7.71875" y="7" width="5" height="3" fill="currentColor" />
                      <rect x="7.71875" y="14" width="5" height="3" fill="currentColor" />
                      <rect width="5" height="3" fill="currentColor" />
                      <rect y="7" width="5" height="3" fill="currentColor" />
                      <rect y="14" width="5" height="3" fill="currentColor" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={view === 'list' ? 'is-active' : ''}
                    aria-label="List view"
                    aria-pressed={view === 'list'}
                    onClick={() => setView('list')}
                  >
                    <svg width="20" height="17" viewBox="0 0 20 17" aria-hidden="true">
                      <rect x="5.71875" width="14.2857" height="3" fill="currentColor" />
                      <rect x="5.71875" y="7" width="14.2857" height="3" fill="currentColor" />
                      <rect x="5.71875" y="14" width="14.2857" height="3" fill="currentColor" />
                      <rect width="3.80952" height="3" fill="currentColor" />
                      <rect y="7" width="3.80952" height="3" fill="currentColor" />
                      <rect y="14" width="3.80952" height="3" fill="currentColor" />
                    </svg>
                  </button>
                </div>
                <span>
                  Showing {rangeStart}–{rangeEnd} of {filteredProducts.length} results
                </span>
              </div>

              <div className="sorath-shop-sort-wrap">
                <button
                  type="button"
                  className="sorath-shop-filter-toggle"
                  aria-label="Open filters"
                  aria-expanded={filtersOpen}
                  onClick={() => setFiltersOpen((open) => !open)}
                >
                  <FiSliders />
                </button>

                <div
                  className={`sorath-shop-select ${sortOpen ? 'is-open' : ''}`}
                  ref={sortRef}
                >
                  <button
                    type="button"
                    className="sorath-shop-select-btn"
                    aria-haspopup="listbox"
                    aria-expanded={sortOpen}
                    onClick={() => setSortOpen((open) => !open)}
                  >
                    {activeSort.label}
                  </button>
                  <ul className="sorath-shop-select-list" role="listbox">
                    {sortOptions.map((option) => (
                      <li key={option.value}>
                        <button
                          type="button"
                          className={sort === option.value ? 'is-active' : ''}
                          role="option"
                          aria-selected={sort === option.value}
                          onClick={() => {
                            setSort(option.value);
                            setSortOpen(false);
                          }}
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {visibleProducts.length === 0 ? (
              <p className="sorath-shop-empty">No products match these filters.</p>
            ) : (
              <div className={`row gy-4 ${view === 'list' ? 'sorath-shop-list' : ''}`}>
                {visibleProducts.map((product) => (
                  <div
                    key={product.id}
                    className={view === 'list' ? 'col-12' : 'col-xl-4 col-lg-6 col-md-6'}
                  >
                    <ProductCard
                      image={product.image}
                      hoverImage={product.hoverImage}
                      name={product.name}
                      price={product.price}
                      categories={product.categories}
                      dimensions={product.dimensions}
                      link={product.link}
                    />
                  </div>
                ))}
              </div>
            )}

            {filteredProducts.length > PAGE_SIZE && (
              <ul className="sorath-shop-pagination">
                {Array.from({ length: pageCount }, (_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <li key={pageNumber}>
                      <button
                        type="button"
                        className={currentPage === pageNumber ? 'is-active' : ''}
                        aria-label={`Page ${pageNumber}`}
                        aria-current={currentPage === pageNumber ? 'page' : undefined}
                        onClick={() => setPage(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  );
                })}
                <li>
                  <button
                    type="button"
                    aria-label="Next page"
                    disabled={currentPage === pageCount}
                    onClick={() => setPage((current) => Math.min(current + 1, pageCount))}
                  >
                    <FiArrowRight />
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {filtersOpen && (
        <button
          type="button"
          className="sorath-shop-filter-overlay"
          aria-label="Close filters"
          onClick={() => setFiltersOpen(false)}
        />
      )}
    </section>
  );
};

export default ShopCatalog;
