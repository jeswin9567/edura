import React from "react";
import { useNavigate } from "react-router-dom";

function MAddentr() {
    const navigate = useNavigate();
    return (
        <>
        <div>
            <button onClick = {() => navigate('/maddEntrance')}>Entrance</button>
        </div>
        </>
    );
}

export default MAddentr;