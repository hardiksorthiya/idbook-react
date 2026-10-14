import { Routes, Route } from 'react-router-dom'
import Home from '../src/pages/Home/Home'
import About from '../src/pages/About/About'
import Shop from '../src/pages/Shop/Shop'
import Product from '../src/pages/Product/Product'
import Blog from '../src/pages/Blog/Blog'
import Contact from '../src/pages/Contact/Contact'
import GalleryPage from '../src/pages/Gallery/Gallery'
import Cart from '../src/pages/Cart/Cart'
import Wishlist from '../src/pages/Wishlist/Wishlist'
import Faq from '../src/pages/Faq/Faq'
import Login from '../src/pages/Login/Login'
import Register from '../src/pages/Register/Register'
import Profile from '../src/pages/Profile/Profile'
import Search from '../src/pages/Search/Search'
import Checkout from '../src/pages/Checkout/Checkout'
import Forgot from '../src/pages/Forgot/Forgot'
const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product" element={<Product />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/checkout" element={<Checkout />} />
    </Routes>
  )
}

export default AppRoutes