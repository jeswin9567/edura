import React, { useEffect, useState } from 'react';
import '../../../components/admin/ViewEntrance.css'; // Create this CSS for styling
import '../../../components/user/header'
import { useParams, useNavigate } from 'react-router-dom';

const UVEntranceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [entrance, setEntrance] = useState(null);

    useEffect(() => {
        const fetchEntranceDetails = async () => {
            const response = await fetch(`http://localhost:5000/viewentr/${id}`);
            const data = await response.json();
            setEntrance(data);
        };

        fetchEntranceDetails();
    }, [id]);

    if (!entrance) return <div>Loading...</div>;

    return (
        <div>
            <Header />
            <div className="entrance-details">
                <h1>{entrance.name}</h1>
                <p>{entrance.details}</p>
                <p><strong>Eligibility:</strong> {entrance.eligibility}</p>
                <p><strong>Syllabus:</strong> {entrance.syllabus}</p>
                <p><strong>How to Apply:</strong> {entrance.howtoapply}</p>
                <p><strong>Link:</strong> <a href={entrance.links}>{entrance.links}</a></p>
                <p className="date"><strong>Start Date:</strong> {new Date(entrance.startdate).toLocaleDateString()}</p>
                <p className="date"><strong>End Date:</strong> {new Date(entrance.enddate).toLocaleDateString()}</p>
                <div className="button-container">
                    <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </div>
    );
};

export default UVEntranceDetails;
