import React, { useRef } from "react";
import HeroSection from "../../../components/common/first";
import SHeader from "../../../components/admin/heads/scholarshiphead";
import MarginC from "../../../components/common/margin";
import Footer from "../../../components/common/footer";
import ScholarshipList from "../../../components/admin/Scholarlist";
import './ascholar.css'; // Import your CSS file
import useAuth from "../../../../function/useAuth";

function Ascholar() {

  useAuth();

  const footerRef = useRef(null);

  return (
    <>
      <div>
        <SHeader scrollToContact={() => footerRef.current?.scrollIntoView({ behavior: 'smooth' })} />
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
