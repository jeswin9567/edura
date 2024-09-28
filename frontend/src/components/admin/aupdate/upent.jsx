import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VEHeader from '../aviewservicehead/aenhead';
import './upent.css'
import useAuth from '../../../../function/useAuth';

const UpdateEntrance = () => {
    useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [entrance, setEntrance] = useState({
        name: '',
        details: '',
        eligibility: '',
        syllabus: '',
        howtoapply: '',
        links: '',
        startdate: '',
        enddate: ''
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntrance((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/upentr/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entrance),
            });

            if (response.ok) {
                alert('Entrance updated successfully');
                navigate(`/admin/entrance`);
            } else {
                const errorMessage = await response.text();
                alert(`Failed to update the entrance: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error updating entrance:', error);
            alert('Could not update entrance. Please try again later.');
        }
    };

    return (
        <div>
            <VEHeader />
            <div className="upent">
                <h1>Update Entrance Details</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={entrance.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                    <textarea
                        name="details"
                        value={entrance.details}
                        onChange={handleChange}
                        placeholder="Details"
                        required
                    />
                    <textarea
                        type="text"
                        name="eligibility"
                        value={entrance.eligibility}
                        onChange={handleChange}
                        placeholder="Eligibility"
                        required
                    />
                    <textarea
                        type="text"
                        name="syllabus"
                        value={entrance.syllabus}
                        onChange={handleChange}
                        placeholder="Syllabus"
                        required
                    />
                    <textarea
                        type="text"
                        name="howtoapply"
                        value={entrance.howtoapply}
                        onChange={handleChange}
                        placeholder="How to Apply"
                        required
                    />
                    <input
                        type="url"
                        name="links"
                        value={entrance.links}
                        onChange={handleChange}
                        placeholder="Link"
                        required
                    />
                    <input
                        type="date"
                        name="startdate"
                        value={entrance.startdate.split('T')[0]}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="enddate"
                        value={entrance.enddate.split('T')[0]}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Update Entrance</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateEntrance;
