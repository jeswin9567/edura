import React from "react";
import EHeader from "../../../components/admin/heads/entrancehead";
import HeroSection from "../../../components/common/first";
import MarginC from "../../../components/common/margin";
import EntranceList from "../../../components/admin/Entrancelist";
import Footer from "../../../components/common/footer";
import './aentrance.css'; // Import your CSS file
import useAuth from "../../../../function/useAuth";

function AEntrance() {

    useAuth();
    
    return (
        <>
            <div>
                <EHeader />
                <HeroSection />
                <div className="entrance-container"> {/* Updated class name */}
                    <MarginC className="emargin-c" /> {/* Updated class name */}
                    <EntranceList className="entrance-list" /> {/* Updated class name */}
                </div>
                <Footer />
            </div>
        </>
    );
}

export default AEntrance;
