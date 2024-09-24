import React, { useRef } from "react";
import LHeader from "../../../components/admin/heads/loanhead";
import HeroSection from "../../../components/common/first";
import MarginC from "../../../components/common/margin";
import Footer from "../../../components/common/footer";
import LoanList from "../../../components/admin/Loanlist";
import './aloan.css'

function Aloan() {
  const footerRef = useRef(null);

  return (
    <>  
      <div>
        <LHeader scrollToContact={() => footerRef.current?.scrollIntoView({ behavior: 'smooth' })} />
        <HeroSection />
        <div className="loan-container">
          <MarginC />
          <LoanList />
        </div>
        <Footer ref={footerRef} />
      </div>
    </>
  );    
}

export default Aloan;
