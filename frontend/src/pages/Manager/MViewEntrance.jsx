import React, { useEffect, useState } from 'react';
import '../../components/admin/ViewEntrance.css'; // Create this CSS for styling
import Header from '../../components/manager/head'
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../../function/useAuth';

const MVEntranceDetails = () => {
    useAuth();
    
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

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5000/delentr/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            // Optionally show a success message
            alert('Entrance deleted successfully');
            navigate('/manager/entrance'); // Redirect to the entrance list or desired page
        } else {
            // Optionally show an error message
            alert('Failed to delete the entrance');
        }
    };

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
                    <button className="update-button" onClick={ () => navigate(`/mupdateentrance/${id}`)}>Update</button>
                    <button className='delete-button' onClick= {handleDelete}>Delete</button>
                    
                </div>
            </div>
        </div>
    );
};

export default MVEntranceDetails;
