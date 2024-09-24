import React, { useRef } from "react";
import MSHeader from "./mheads/mshead";
import HeroSection from "../common/first";
import MarginC from "../common/margin";
import ManScholarshipList from "./MScholarlist";
import Footer from "../common/footer";
import '../../pages/admin/functionalities/ascholar.css'

function Mscholar() {
  const footerRef = useRef(null);

  return (
    <>
      <div>
        <MSHeader scrollToContact={() => footerRef.current?.scrollIntoView({ behavior: 'smooth' })} />
        <HeroSection />
        <div className="scholar-container">
          <MarginC />
          <ManScholarshipList />
        </div>
        <Footer ref={footerRef} />
      </div>
    </>
  );
}

export default Mscholar;
