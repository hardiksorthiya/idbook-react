import { useEffect, useMemo, useRef, useState } from 'react';
import { FiArrowRight, FiSliders } from 'react-icons/fi';

import '../../../assets/css/Home/Products.css';
import '../../../assets/css/Shop/Shop.css';
import ProductCard from '../../Common/ProductCard';
import ShopFilter from './ShopFilter';
import Shop1 from '../../../assets/images/shop/shop-1.png';
import { getProductFilters, getProducts } from '../../../../services/products';
import type { ProductFilters, ProductItem } from '../../../../types/product';

const PAGE_SIZE = 6;

const sortOptions = [
  { value: 'default', label: 'Default Sorting' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'date', label: 'Date' },
  { value: 'trending', label: 'Trending' },
  { value: 'featured', label: 'Featured' },
  { value: 'discounted', label: 'Discounted' },
];

type ShopProduct = {
  id: number;
  image: string;
  hoverImage: string;
  name: string;
  priceValue: number;
  price: string;
  mrp: string;
  discount: number;
  categories: string[];
  categorySlug: string;
  style: string;
  dimensions: string;
  link: string;
  popular: number;
  date: number;
  trending: number;
  featured: boolean;
  discounted: boolean;
};

const toProduct = (item: ProductItem): ShopProduct => ({
  id: item.id,
  image: item.thumb_url || item.main_image_url || Shop1,
  hoverImage: item.main_image_url || item.thumb_url || Shop1,
  name: item.name,
  priceValue: item.price,
  price: `₹${item.price.toLocaleString('en-IN')}`,
  mrp: item.mrp_price > item.price ? `₹${item.mrp_price.toLocaleString('en-IN')}` : '',
  discount: item.discount_percentage,
  categories: item.primary_category ? [item.primary_category.name] : [],
  categorySlug: item.primary_category?.slug || '',
  style: item.design_style || '',
  dimensions: item.room_dimensions,
  link: `/product/${item.slug}`,
  popular: item.discount_percentage,
  date: item.id,
  trending: item.is_featured ? 1 : 0,
  featured: item.is_featured,
  discounted: item.discount_percentage > 0,
});

const ShopCatalog = () => {
  const sortRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [filters, setFilters] = useState<ProductFilters | null>(null);
  const [note, setNote] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceLimit, setPriceLimit] = useState(0);
  const [sort, setSort] = useState('default');
  const [sortOpen, setSortOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const minPrice = filters?.price_range.min ?? 0;
  const maxPrice = filters?.price_range.max ?? 0;

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const matched = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(query);
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.categorySlug);
      const matchesStyle =
        selectedStyles.length === 0 || selectedStyles.includes(product.style);
      const matchesPrice = priceLimit === 0 || product.priceValue <= priceLimit;

      return matchesSearch && matchesCategory && matchesStyle && matchesPrice;
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
  }, [priceLimit, products, search, selectedCategories, selectedStyles, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + PAGE_SIZE);
  const rangeStart = filteredProducts.length === 0 ? 0 : startIndex + 1;
  const rangeEnd = startIndex + visibleProducts.length;
  const activeSort = sortOptions.find((option) => option.value === sort) ?? sortOptions[0];

  useEffect(() => {
    setPage(1);
  }, [search, selectedCategories, selectedStyles, priceLimit, sort]);

  useEffect(() => {
    getProductFilters()
      .then((next) => {
        setFilters(next);
        setPriceLimit(next.price_range.max);
      })
      .catch((error) => {
        setNote(error instanceof Error ? error.message : 'Could not load filters.');
      });

    getProducts()
      .then((list) => setProducts(list.map(toProduct)))
      .catch((error) => {
        setNote(error instanceof Error ? error.message : 'Could not load products.');
      });
  }, []);

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

  const toggleCategory = (slug: string) => {
    setSelectedCategories((current) =>
      current.includes(slug)
        ? current.filter((category) => category !== slug)
        : [...current, slug],
    );
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles((current) =>
      current.includes(style)
        ? current.filter((item) => item !== style)
        : [...current, style],
    );
  };

  return (
    <section className="sorath-shop" data-aos="fade-up">
      <div className="container-fluid sorath-container-fluid">
        <div className="row">
          <div className={`col-lg-3 sorath-shop-filter-col ${filtersOpen ? 'is-open' : ''}`}>
            <h3 className="sorath-shop-drawer-title">Filters</h3>
            <ShopFilter
              search={search}
              onSearchChange={setSearch}
              categories={filters?.categories || []}
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              styles={filters?.design_styles || []}
              selectedStyles={selectedStyles}
              onToggleStyle={toggleStyle}
              minPrice={minPrice}
              maxPrice={maxPrice || minPrice}
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

            {note ? (
              <p className="sorath-shop-empty">{note}</p>
            ) : visibleProducts.length === 0 ? (
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
                      mrp={product.mrp}
                      discount={product.discount}
                      categories={product.categories}
                      dimensions={product.dimensions}
                      link={product.link}
                      productId={product.id}
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
