import React from "react";
import { useNavigate } from "react-router-dom";

const ManProfileBtn = () => {
    const navigate = useNavigate();
    return(
        <>
        <div>
            <button onClick={ () => navigate('/manager/profile')}>Profile</button>
        </div>
        </>
    );
};

export default ManProfileBtn;