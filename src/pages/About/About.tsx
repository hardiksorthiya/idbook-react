import Header from '../../components/Header/Header';
import Breadcrumb from '../Common/Breadcrumb';
import Footer from '../../components/Footer/Footer';
import Breadcrumbimage from '../../assets/images/page-header-bg.png';
import AboutIntro from './components/AboutIntro';
import Founder from './components/Founder';
import WhatID from './components/WhatID';
import VisionMission from './components/VisionMission';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Newsletter from '../Common/Newsletter';
import DesignFloatButton from '../Common/DesignFloatButton';

const About = () => {
  return (
    <>
    <Header />
    <Breadcrumb title="About Us" background={Breadcrumbimage} />
     <AboutIntro />
     <Founder />
     <WhatID />
     <VisionMission />
     <Gallery />
     <Testimonials />
     <Newsletter />
    <Footer />
     <DesignFloatButton />
    </>
  )
}

export default About;