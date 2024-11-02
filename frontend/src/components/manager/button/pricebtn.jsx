import React from "react";
import { useNavigate } from "react-router-dom";

const PriceBtn = () => {
    const navigate = useNavigate();
    return (
        <>
        <div>
            <button onClick={() => navigate("/manager/price")}>Amount</button>
        </div>
        </>
    )
}

export default PriceBtn;