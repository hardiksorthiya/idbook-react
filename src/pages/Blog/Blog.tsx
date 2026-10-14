import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../Common/Breadcrumb';
import DesignFloatButton from '../Common/DesignFloatButton';
import Breadcrumbimage from '../../assets/images/page-header-bg.png';
import BlogGrid from './components/BlogGrid';

const Blog = () => {
  return (
    <>
      <Header />
      <Breadcrumb title="Blog" background={Breadcrumbimage} />
      <BlogGrid />
      <Footer />
      <DesignFloatButton />
    </>
  );
};

export default Blog;
