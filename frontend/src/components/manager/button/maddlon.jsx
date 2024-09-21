import React from "react";
import { useNavigate } from "react-router-dom";

function MAddln() {
    const navigate = useNavigate();
    return (
        <>
        <div>
            <button onClick = {() => navigate('/maddLoan')}>Loan</button>
        </div>
        </>
    );
}

export default MAddln;