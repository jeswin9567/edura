import React from "react";
import Header from "../../../components/admin/headd";
import HeroSection from "../../../components/common/first";
import MarginC from "../../../components/common/margin";
import EntranceList from "../../../components/admin/Entrancelist";
import Footer from "../../../components/common/footer";
import './aentrance.css'; // Import your CSS file

function AEntrance() {
    return (
        <>
            <div>
                <Header />
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
