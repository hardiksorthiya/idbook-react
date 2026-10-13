import Header from '../../components/Header/Header';
import Hero from './components/Hero';
import Process from './components/Process';
import Services from './components/Services';
import Product from './components/Products';
import Gallery from './components/Gallery';
import Counter from './components/Counter';
import CTA from './components/CTA';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Newsletter from '../Common/Newsletter';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <>
    <Header />
    <Hero />
    <Process />
    <Services />
    <Product />
    <Gallery />
    <Counter />
    <CTA  />
    <Testimonials />
    <Blog />
    <Newsletter />
    <Footer />
    </>
  )
}

export default Home;