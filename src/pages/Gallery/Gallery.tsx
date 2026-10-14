import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../Common/Breadcrumb';
import DesignFloatButton from '../Common/DesignFloatButton';
import Newsletter from '../Common/Newsletter';
import Breadcrumbimage from '../../assets/images/page-header-bg.png';
import GalleryGrid from './components/GalleryGrid';

const Gallery = () => {
  return (
    <>
      <Header />
      <Breadcrumb title="Gallery" background={Breadcrumbimage} />
      <GalleryGrid />
      <Newsletter />
      <Footer />
      <DesignFloatButton />
    </>
  );
};

export default Gallery;
