import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHeart,
  FiSearch,
  FiShoppingCart,
  FiUser,
} from 'react-icons/fi';
import { PiCirclesFourBold } from 'react-icons/pi';
import Logo from '../../assets/images/logo.webp';
import { getToken } from '../../../utils/token';
import { searchProducts } from '../../../services/search';
import type { SearchItem } from '../../../types/search';

import '../../assets/css/Common/Header.css';

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === '/';
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);

    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSearchOpen]);

  const goSearch = () => {
    const word = searchInputRef.current?.value.trim() ?? '';
    navigate(word ? `/search?q=${encodeURIComponent(word)}` : '/search');
    setIsSearchOpen(false);
    setSuggestions([]);
  };

  const findSuggestions = (value: string) => {
    if (searchTimer.current) window.clearTimeout(searchTimer.current);

    searchTimer.current = window.setTimeout(() => {
      const word = value.trim();
      if (!word) {
        setSuggestions([]);
        return;
      }

      searchProducts(word)
        .then(setSuggestions)
        .catch(() => setSuggestions([]));
    }, 300);
  };

  const handleSearchToggle = () => {
    if (isSearchOpen) {
      goSearch();
      return;
    }
    setIsSearchOpen(true);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`sorath-header ${
        isHome ? 'sorath-header-home' : ''
      } ${
        isScrolled ? 'sorath-header-scrolled' : ''
      }`}
    >
      <div className="container-fluid sorath-container-fluid">

        <div className="d-flex justify-content-between align-items-center sorath-header-inner">

          {/* Logo */}
          <Link to="/" className="sorath-header-logo">
            <img
              src={Logo}
              alt="IDBook"
            />
          </Link>

          {/* Header Actions */}
          <div className="sorath-header-actions">

            {/* Search Input */}
            <div
              className={`sorath-search-wrapper ${
                isSearchOpen ? 'sorath-search-open' : ''
              }`}
            >
              <input
                ref={searchInputRef}
                type="text"
                className="sorath-search-input"
                placeholder="Type here..."
                aria-label="Search"
                onChange={(event) => findSuggestions(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') goSearch();
                }}
              />
              {isSearchOpen && suggestions.length > 0 && (
                <ul className="sorath-search-list">
                  {suggestions.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/search?q=${encodeURIComponent(item.name)}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSuggestions([]);
                        }}
                      >
                        {item.name}
                        <small>{item.category_name} · ₹{item.price.toLocaleString('en-IN')}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Search Button */}
            <button
              type="button"
              className={`sorath-header-btn ${
                isSearchOpen ? 'sorath-header-btn-active' : ''
              }`}
              onClick={handleSearchToggle}
              aria-label="Search"
            >
              <FiSearch />
            </button>

            {/* Login */}
            <Link to={getToken() ? '/profile' : '/login'} className="sorath-header-btn" aria-label={getToken() ? 'Profile' : 'Login'}>
              <FiUser />
            </Link>

            {/* Menu */}
            <button
              type="button"
              className="sorath-header-btn"
              onClick={handleMenuToggle}
              aria-label="Menu"
            >
              <PiCirclesFourBold />
            </button>

            {/* Menu Dropdown */}
            <div
              className={`sorath-menu-dropdown ${
                isMenuOpen
                  ? 'sorath-menu-dropdown-open'
                  : ''
              }`}
            >
              <nav className="sorath-menu-list">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/about', label: 'About' },
                  { href: '/shop', label: 'Shop' },
                  { href: '/blog', label: 'Blog' },
                  { href: '/contact', label: 'Contact' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={pathname === item.href ? 'is-active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="sorath-menu-label">
                      <span>{item.label}</span>
                      <span>{item.label}</span>
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="d-flex align-items-center gap-2 sorath-menu-bottom">

                <Link to="/wishlist" className="sorath-menu-icon" aria-label="Wishlist" onClick={() => setIsMenuOpen(false)}>
                  <FiHeart />
                </Link>

                <Link to="/cart" className="sorath-menu-icon" aria-label="Cart" onClick={() => setIsMenuOpen(false)}>
                  <FiShoppingCart />
                </Link>

              </div>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
};

export default Header;