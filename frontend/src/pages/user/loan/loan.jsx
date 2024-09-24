import React, { useRef } from "react";
import VHeader from "../../../components/user/vhead";
import HeroSection from '../../../components/common/first'; // Ensure the import path is correct
import MarginC from "../../../components/common/margin";
import ULoanList from "../../../components/user/ULoanlist";
import Footer from "../../../components/common/footer"; // Ensure the import path is correct
import '../../../pages/admin/functionalities/ascholar.css'

function Loan() {
  const footerRef = useRef(null);

  const scrollToContact = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div>
        <VHeader scrollToContact={scrollToContact} />
        <HeroSection />
        <div className="scholar-container">
          <MarginC />
          <ULoanList />
        </div>
        <Footer ref={footerRef} />
      </div>
    </>
  );
}

export default Loan;
