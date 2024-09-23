import React, { useRef } from 'react';
import Header from '../../components/common/head';
import HeroSec from '../../components/common/herosec';
import ServicesSec from '../../components/user/Service';
import MissionSection from '../../components/common/Mission';
import AdditionalInfoSection from '../../components/common/Additional';
import AboutSection from '../../components/common/About';
import Footer from '../../components/common/footer';

function Uhome() {
  const servicesSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  const scrollToServices = () => {
    servicesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Header
        scrollToAbout={scrollToAbout}
        scrollToServices={scrollToServices}
        scrollToContact={scrollToContact}
      />
      <HeroSec />
      <ServicesSec ref={servicesSectionRef} />
      <MissionSection />
      <AdditionalInfoSection />
      <AboutSection ref={aboutSectionRef} />
      <Footer ref={contactSectionRef} />
    </div>
  );
}

export default Uhome;
