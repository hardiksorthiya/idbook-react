import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Breadcrumb from '../Common/Breadcrumb';
import DesignFloatButton from '../Common/DesignFloatButton';
import Breadcrumbimage from '../../assets/images/page-header-bg.png';
import '../../assets/css/Auth/Auth.css';
import ProfileAccount from './components/ProfileAccount';

const Profile = () => {
  return (
    <>
      <Header />
      <Breadcrumb title="Profile" background={Breadcrumbimage} />
      <section className="sorath-account" data-aos="fade-up">
        <div className="container-fluid sorath-container-fluid">
          <ProfileAccount />
        </div>
      </section>
      <Footer />
      <DesignFloatButton />
    </>
  );
};

export default Profile;
