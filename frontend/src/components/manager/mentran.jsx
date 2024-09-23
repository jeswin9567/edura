import React from "react";
import Header from "./head";
import HeroSection from "../common/first";
import MarginC from "../common/margin";
import MEntranceList from "./MEntrancelist";
import Footer from "../common/footer";
import './mentran.css';

function MEntrance() {
    return (
        <>
            <div>
                <Header />
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