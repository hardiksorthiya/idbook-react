import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
    window.location.href = word ? `/search?q=${encodeURIComponent(word)}` : '/search';
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
          <a href="/" className="sorath-header-logo">
            <img
              src={Logo}
              alt="IDBook"
            />
          </a>

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
                      <a href={`/search?q=${encodeURIComponent(item.name)}`}>
                        {item.name}
                        <small>{item.category_name} · ₹{item.price.toLocaleString('en-IN')}</small>
                      </a>
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
            <a href={getToken() ? '/profile' : '/login'} className="sorath-header-btn" aria-label={getToken() ? 'Profile' : 'Login'}>
              <FiUser />
            </a>

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

                <a href="/">Home</a>

                <a href="/about">About</a>

                <a href="/shop">Shop</a>

                <a href="/blog">Blog</a>

                <a href="/contact">Contact</a>

              </nav>

              <div className="d-flex align-items-center gap-2 sorath-menu-bottom">

                <a href="/wishlist" className="sorath-menu-icon" aria-label="Wishlist">
                  <FiHeart />
                </a>

                <a href="/cart" className="sorath-menu-icon" aria-label="Cart">
                  <FiShoppingCart />
                </a>

              </div>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
};

export default Header;