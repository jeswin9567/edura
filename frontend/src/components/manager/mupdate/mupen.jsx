import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MVEHeader from '../mviewservicehead/menhead';
import '../../admin/aupdate/upent.css'
import useAuth from '../../../../function/useAuth';

const MUpdateEntrance = () => {
    useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [entrance, setEntrance] = useState({
        name: '',
        details: '',
        education: '',
        degree: [], // Array for selected degrees
        marksGeneral: '',
        marksBackward: '',
        syllabus: '',
        howtoapply: '',
        link: '',
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
    
        // Check if the changed field is education
        if (name === 'education') {
            // Reset degrees if the education level changes
            setEntrance((prev) => ({
                ...prev,
                education: value,
                degree: [] // Reset degree selections
            }));
        } else {
            setEntrance((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleDegreeChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setEntrance((prev) => ({
                ...prev,
                degree: [...prev.degree, value]
            }));
        } else {
            setEntrance((prev) => ({
                ...prev,
                degree: prev.degree.filter((deg) => deg !== value)
            }));
        }
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
                navigate(`/manager/entrance`);
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
            <MVEHeader />
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
                    <select
                        name="education"
                        value={entrance.education}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Education Level</option>
                        <option value="Class 10">Class 10</option> {/* Added Class 10 option */}
                        <option value="Class 12">Class 12</option> {/* Added Class 12 option */}
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Postgraduate">Postgraduate</option>
                    </select>
                    <div>
                        <label>Select Degrees:</label>
                        {entrance.education === 'Undergraduate' && (
                            <>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="BSc"
                                        checked={entrance.degree.includes('BSc')}
                                        onChange={handleDegreeChange}
                                    />
                                    <label>BSc</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="BCA"
                                        checked={entrance.degree.includes('BCA')}
                                        onChange={handleDegreeChange}
                                    />
                                    <label>BCA</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="BCom"
                                        checked={entrance.degree.includes('BCom')}
                                        onChange={handleDegreeChange}
                                    />
                                    <label>BCom</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="BA"
                                        checked={entrance.degree.includes('BA')}
                                        onChange={handleDegreeChange}
                                    />
                                    <label>BA</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="BTech"
                                        checked={entrance.degree.includes('BTech')}
                                        onChange={handleDegreeChange}
                                    />
                                    <label>BTech</label>
                                </div>
                            </>
                        )}
                        {entrance.education === 'Postgraduate' && (
                            <>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="MSc"
                                        checked={entrance.degree.includes('MSc')}
                                        onChange={handleDegreeChange}
                                    />
                                    <label>MSc</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="MCA"
                                        checked={entrance.degree.includes('MCA')}
                                        onChange={handleDegreeChange}
                                    />
                                    <label>MCA</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="MCom"
                                        checked={entrance.degree.includes('MCom')}
                                        onChange={handleDegreeChange}
                                    />
                                    <label>MCom</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="MA"
                                        checked={entrance.degree.includes('MA')}
                                        onChange={handleDegreeChange}
                                    />
                                    <label>MA</label>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="MTech"
                                        checked={entrance.degree.includes('MTech')}
                                        onChange={handleDegreeChange}
                                    />
                                    <label>MTech</label>
                                </div>
                            </>
                        )}
                    </div>

                    <input
                        type="text"
                        name="marksGeneral"
                        value={entrance.marksGeneral}
                        onChange={handleChange}
                        placeholder="Marks for General Category"
                        required
                    />
                    <input
                        type="text"
                        name="marksBackward"
                        value={entrance.marksBackward}
                        onChange={handleChange}
                        placeholder="Marks for Backward Category"
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
                        value={entrance.link}
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

export default MUpdateEntrance;
