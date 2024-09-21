import React, { useRef } from "react";
import Header from "./head";
import HeroSection from "../common/first";
import Footer from "../common/footer";

function Mscholar() {
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

export default Mscholar;
