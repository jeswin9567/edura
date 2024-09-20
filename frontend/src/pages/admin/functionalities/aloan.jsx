import React, { useRef } from "react";
import Header from "../../../components/admin/headd";
import HeroSection from "../../../components/common/first";
import Footer from "../../../components/common/footer";

function Aloan() {
  const footerRef = useRef(null);

  return (
    <>
      <div>
        <Header scrollToContact={() => footerRef.current?.scrollIntoView({ behavior: 'smooth' })} />
        <HeroSection />
        <Footer ref={footerRef} />
      </div>
    </>
  );    
}

export default Aloan;
