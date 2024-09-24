import React from "react";
import MEHeader from "./mheads/mehead";
import HeroSection from "../common/first";
import MarginC from "../common/margin";
import MEntranceList from "./MEntrancelist";
import Footer from "../common/footer";
import './mentran.css';

function MEntrance() {
    return (
        <>
            <div>
                <MEHeader />
                <HeroSection />
                <div className="mentrance-container">
                 <MarginC />
                 <MEntranceList />
                </div>
                <Footer />
            </div>
        </>
    );
}

export default MEntrance