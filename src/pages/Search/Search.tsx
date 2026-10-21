import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../Common/Breadcrumb';
import DesignFloatButton from '../Common/DesignFloatButton';
import Breadcrumbimage from '../../assets/images/page-header-bg.png';
import SearchResults from './components/SearchResults';

const Search = () => {
  return (
    <>
      <Header />
      <Breadcrumb title="Search" background={Breadcrumbimage} />
      <section className="sorath-search-page">
        <div className="container-fluid sorath-container-fluid">
          <SearchResults />
        </div>
      </section>
      <Footer />
      <DesignFloatButton />
    </>
  );
};

export default Search;
