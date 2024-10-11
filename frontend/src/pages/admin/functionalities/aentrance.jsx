import React, { useRef } from "react";
import EHeader from "../../../components/admin/heads/entrancehead";
import HeroSection from "../../../components/common/first";
import MarginC from "../../../components/common/margin";
import EntranceList from "../../../components/admin/Entrancelist";
import Footer from "../../../components/common/footer";
import './aentrance.css'; // Import your CSS file
import useAuth from "../../../../function/useAuth";

function AEntrance() {
    const footerRef = useRef(null); // Create a ref for the Footer
    useAuth();
    
    return (
        <>
            <div>
                <EHeader scrollToContact={() => footerRef.current.scrollIntoView({ behavior: 'smooth' })} /> {/* Pass the scroll function */}
                <HeroSection />
                <div className="entrance-container"> {/* Updated class name */}
                    <MarginC className="emargin-c" /> {/* Updated class name */}
                    <EntranceList className="entrance-list" /> {/* Updated class name */}
                </div>
                <Footer ref={footerRef} /> {/* Attach the ref to Footer */}
            </div>
        </>
    );
}

export default AEntrance;
