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
        enddate: '',
        subEligibility: [], // Added subEligibility array
        gender: '' // Added gender property
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

    // Handle eligibility change separately
    const handleEligibilityChange = (e) => {
        const { value } = e.target;
        setScholarship((prev) => ({
            ...prev,
            eligibility: value,
            subEligibility: [] // Reset subEligibility when eligibility changes
        }));
    };

    // Handle sub-eligibility changes
    const handleSubEligibilityChange = (option) => {
        setScholarship((prev) => {
            const subEligibility = prev.subEligibility.includes(option)
                ? prev.subEligibility.filter((item) => item !== option)
                : [...prev.subEligibility, option];
            return { ...prev, subEligibility };
        });
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

    const renderSubEligibilityOptions = () => {
        const options = [];
        switch (scholarship.eligibility) {
            case 'School':
                options.push('Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12');
                break;
            case 'Undergraduate':
                options.push('B.Sc', 'B.Com', 'B.A', 'B.Tech', 'B.E', 'BBA');
                break;
            case 'Postgraduate':
                options.push('M.Sc', 'M.Com', 'M.A', 'MBA', 'M.Tech', 'M.E');
                break;
            case 'Diploma':
                options.push('Mechanical', 'Civil', 'Electrical', 'Computer Science', 'Electronics');
                break;
            default:
                return null;
        }

        return (
            <div>
                <label>Select Sub-Eligibility:</label>
                <div className="checkbox-group">
                    {options.map((option) => (
                        <label key={option}>
                            <input
                                type="checkbox"
                                value={option}
                                checked={scholarship.subEligibility.includes(option)}
                                onChange={() => handleSubEligibilityChange(option)}
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <div className="uscho">
                <h1 className="uscho-title">Update Scholarship Details</h1>
                <form onSubmit={handleSubmit} className="uscho-form">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={scholarship.name}
                        onChange={handleChange}
                        placeholder="Enter scholarship name"
                        required
                        className="uscho-input"
                    />
                    
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={scholarship.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        required
                        className="uscho-textarea"
                    />
                    
                    <label>Award Amount:</label>
                    <input
                        type="number" // Changed to number input
                        name="award"
                        value={scholarship.award}
                        onChange={handleChange}
                        placeholder="Enter award amount"
                        required
                        min="0" // Ensures a non-negative value
                        className="uscho-input"
                    />
                    
                    <label>Eligibility:</label>
                    <select
                        name="eligibility"
                        value={scholarship.eligibility}
                        onChange={handleEligibilityChange} // Updated to handleEligibilityChange
                        required
                        className="uscho-input"
                    >
                        <option value="">Select Eligibility</option>
                        <option value="School">School</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Diploma">Diploma</option>
                    </select>
                    
                    {renderSubEligibilityOptions()} {/* Render sub-eligibility options */}
                    
                    <label>Gender:</label>
                    <select
                        name="gender"
                        value={scholarship.gender}
                        onChange={handleChange} // Use handleChange for gender input
                        required
                        className="uscho-input"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <label>How to Apply:</label>
                    <input
                        type="text"
                        name="howToApply"
                        value={scholarship.howToApply}
                        onChange={handleChange}
                        placeholder="Enter application details"
                        required
                        className="uscho-input"
                    />
                    
                    <label>Link:</label>
                    <input
                        type="url"
                        name="link"
                        value={scholarship.link}
                        onChange={handleChange}
                        placeholder="Enter link to the scholarship"
                        required
                        className="uscho-input"
                    />
                    
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="startdate"
                        value={scholarship.startdate.split('T')[0]} // Ensure proper date format
                        onChange={handleChange}
                        required
                        className="uscho-input"
                    />
                    
                    <label>End Date:</label>
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
