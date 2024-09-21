import React from "react";
import { useNavigate } from "react-router-dom";

function MAddscholar() {
    const navigate = useNavigate();
    return (
        <>
        <div>
            <button onClick = {() => navigate('/maddScholarship')}>Scholarship</button>
        </div>
        </>
    );
}

export default MAddscholar;