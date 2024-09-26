import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../head';
import '../../admin/aupdate/uscho.css'
import useAuth from '../../../../function/useAuth';

const MUpdateScholarship = () => {
    useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [scholarship, setScholarship] = useState({
        name: '',
        description: '',
        award: '',
        eligibility: '',
        howToApply: '',
        link: '',
        startdate: '',
        enddate: ''
    });

    // Fetch scholarship details on component mount
    useEffect(() => {
        const fetchScholarshipDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/viewscho/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch scholarship details');
                }
                const data = await response.json();
                setScholarship(data);
            } catch (error) {
                console.error('Error fetching scholarship details:', error);
                alert('Could not fetch scholarship details. Please try again later.');
            }
        };

        fetchScholarshipDetails();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setScholarship((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/upscho/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scholarship),
            });

            if (response.ok) {
                alert('Scholarship updated successfully');
                navigate(`/manager/scholarship`); // Redirect to the updated scholarship details page
            } else {
                const errorMessage = await response.text();
                alert(`Failed to update the scholarship: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error updating scholarship:', error);
            alert('Could not update scholarship. Please try again later.');
        }
    };

    return (
        <div>
            <Header />
            <div className="uscho">
                <h1 className="uscho-title">Update Scholarship Details</h1>
                <form onSubmit={handleSubmit} className="uscho-form">
                    <input
                        type="text"
                        name="name"
                        value={scholarship.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                        className="uscho-input"
                    />
                    <textarea
                        name="description"
                        value={scholarship.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                        className="uscho-textarea"
                    />
                    <input
                        type="text"
                        name="award"
                        value={scholarship.award}
                        onChange={handleChange}
                        placeholder="Award"
                        required
                        className="uscho-input"
                    />
                    <input
                        type="text"
                        name="eligibility"
                        value={scholarship.eligibility}
                        onChange={handleChange}
                        placeholder="Eligibility"
                        required
                        className="uscho-input"
                    />
                    <input
                        type="text"
                        name="howToApply"
                        value={scholarship.howToApply}
                        onChange={handleChange}
                        placeholder="How to Apply"
                        required
                        className="uscho-input"
                    />
                    <input
                        type="url"
                        name="link"
                        value={scholarship.link}
                        onChange={handleChange}
                        placeholder="Link"
                        required
                        className="uscho-input"
                    />
                    <input
                        type="date"
                        name="startdate"
                        value={scholarship.startdate.split('T')[0]} // Ensure proper date format
                        onChange={handleChange}
                        required
                        className="uscho-input"
                    />
                    <input
                        type="date"
                        name="enddate"
                        value={scholarship.enddate.split('T')[0]} // Ensure proper date format
                        onChange={handleChange}
                        required
                        className="uscho-input"
                    />
                    <button type="submit" className="uscho-button">Update Scholarship</button>
                </form>
            </div>
        </div>
    );
};

export default MUpdateScholarship;
