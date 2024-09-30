import React from "react";
import { useNavigate } from "react-router-dom";

function Prof(){
    const navigate = useNavigate();

    return(
        <>
        <div>
            <button onClick={() => navigate("/uvpro")}>Profile</button>

        </div>
        </>
    );
}

export default Prof;