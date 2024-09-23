import React, { useRef } from "react";
import Header from '../../../components/user/header'; // Ensure the import path is correct
import HeroSection from '../../../components/common/first'; // Ensure the import path is correct
import MarginC from "../../../components/common/margin";
import UScholarshipList from "../../../components/user/UScholarlist";
import Footer from "../../../components/common/footer"; // Ensure the import path is correct
import '../../../pages/admin/functionalities/ascholar.css'

function Scholarship() {
  const footerRef = useRef(null);

  const scrollToContact = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div>
        <Header scrollToContact={scrollToContact} />
        <HeroSection />
        <div className="scholar-container">
          <MarginC />
          <UScholarshipList />
        </div>
        <Footer ref={footerRef} />
      </div>
    </>
  );
}

export default Scholarship;
