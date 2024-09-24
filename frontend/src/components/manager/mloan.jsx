import React, { useRef } from "react";
import MHeader from "./mheads/mlhead";
import HeroSection from "../common/first";
import MarginC from "../common/margin";
import MLoanList from "./MLoanlist";
import Footer from "../common/footer";
import './mloan.css'
function Mloan() {
  const footerRef = useRef(null);

  return (
    <>  
      <div>
        <MHeader scrollToContact={() => footerRef.current?.scrollIntoView({ behavior: 'smooth' })} />
        <HeroSection />
        <div className="mloan-container">
          <MarginC />
          <MLoanList />
        </div>
        <Footer ref={footerRef} />
      </div>
    </>
  );    
}

export default Mloan;
