import React, { useRef } from "react";
import Header from "../../../components/admin/headd";
import HeroSection from "../../../components/common/first";
import MarginC from "../../../components/common/margin";
import Footer from "../../../components/common/footer";
import ScholarshipList from "../../../components/admin/Scholarlist";
import './ascholar.css'; // Import your CSS file

function Ascholar() {
  const footerRef = useRef(null);

  return (
    <>
      <div>
        <Header scrollToContact={() => footerRef.current?.scrollIntoView({ behavior: 'smooth' })} />
        <HeroSection />
        <div className="scholar-container">
          <MarginC />
          <ScholarshipList />
        </div>
        <Footer ref={footerRef} />
      </div>
    </>
  );
}

export default Ascholar;
