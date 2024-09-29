import React, { useEffect, useState } from 'react';
import '../../../components/admin/ViewEntrance.css'; // Ensure this CSS file is correctly set up
import VHeader from '../../../components/user/vhead';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../../../function/useAuth';

const UVEntranceDetails = () => {
    useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [entrance, setEntrance] = useState(null);

    useEffect(() => {
        const fetchEntranceDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/viewentr/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch entrance details');
                }
                const data = await response.json();
                setEntrance(data);
            } catch (error) {
                console.error('Error fetching entrance details:', error);
                alert('Could not fetch entrance details. Please try again later.');
            }
        };

        fetchEntranceDetails();
    }, [id]);

    if (!entrance) return <div>Loading...</div>;

    return (
        <div>
            <VHeader />
            <div className="entrance-details">
                <h1>{entrance.name}</h1>
                <p>{entrance.details}</p>
                <p><strong>Education Level:</strong> {entrance.education || 'N/A'}</p>
                <p><strong>Degrees Offered:</strong> {entrance.degree.length > 0 ? entrance.degree.join(', ') : 'N/A'}</p>
                <p><strong>Marks for General Category:</strong> {entrance.marksGeneral || 'N/A'}</p>
                <p><strong>Marks for Backward Category:</strong> {entrance.marksBackward || 'N/A'}</p>
                <p><strong>Syllabus:</strong> {entrance.syllabus || 'N/A'}</p>
                <p><strong>How to Apply:</strong> {entrance.howtoapply || 'N/A'}</p>
                <p><strong>Link:</strong> <a href={entrance.link} target="_blank" rel="noopener noreferrer">{entrance.link}</a></p>
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
