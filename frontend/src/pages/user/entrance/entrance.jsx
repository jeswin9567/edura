import React, { useRef } from "react";
import VHeader from "../../../components/user/vhead";
import HeroSection from '../../../components/common/first'; // Ensure the import path is correct
import MarginC from "../../../components/common/margin";
import UEntranceList from "../../../components/user/UEntrancelist";
import Footer from "../../../components/common/footer"; // Ensure the import path is correct
import '../../../pages/admin/functionalities/ascholar.css'
import useAuth from "../../../../function/useAuth";

function Entrance() {

  useAuth();
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
          <UEntranceList />
        </div>
        <Footer ref={footerRef} />
      </div>
    </>
  );
}

export default Entrance;
