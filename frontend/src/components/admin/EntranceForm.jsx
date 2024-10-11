import React, { useState, useRef } from 'react';
import axios from 'axios';
import './EntranceForm.css';
import Header from './headd';
import Footer from '../common/footer';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../function/useAuth';

const EntranceForm = () => {
  useAuth();
  const footerRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    details: '',
    education: '',
    degree: [], 
    marksGeneral: '',
    marksBackward: '',
    syllabus: '',
    startdate: '',
    enddate: '',
    howtoapply: '',
    link: '',
    state: '', // Add this for the state
    examType: '',
  });

  const [showUGDegrees, setShowUGDegrees] = useState(false);
  const [showPGDegrees, setShowPGDegrees] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const degreesUG = ['BA', 'BSW', 'BSc', 'BCA', 'BCom', 'BTech', 'Other UG courses including mathematics','General Nursing','other'];
  const degreesPG = ['MA', 'MSW', 'MSc', 'MCA', 'MCom', 'MTech', 'Other PG courses Including mathematics','other'];
  const examType = ['B.Tech','MBA','MCA','Medical','Law','Other'];
  const states = ['All India', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDegreeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        degree: [...formData.degree, value]
      });
    } else {
      setFormData({
        ...formData,
        degree: formData.degree.filter((degree) => degree !== value)
      });
    }
  };

  const handleEducationChange = (e) => {
    const selectedEducation = e.target.value;
    setFormData({
      ...formData,
      education: selectedEducation,
      degree: [] // Clear degrees if education changes
    });

    if (selectedEducation === 'Undergraduate') {
      setShowUGDegrees(true);
      setShowPGDegrees(false);
    } else if (selectedEducation === 'Postgraduate') {
      setShowUGDegrees(false);
      setShowPGDegrees(true);
    } else {
      setShowUGDegrees(false);
      setShowPGDegrees(false);
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Check for required fields
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.details.trim()) newErrors.details = 'Details are required';
    if (!formData.education) newErrors.education = 'Education is required';
    if (formData.education === 'Undergraduate' && formData.degree.length === 0)
      newErrors.degree = 'At least one undergraduate degree must be selected';
    if (formData.education === 'Postgraduate' && formData.degree.length === 0)
      newErrors.degree = 'At least one postgraduate degree must be selected';
    if (!formData.examType) newErrors.examType = 'Exam type is required';
    if (!formData.marksGeneral.trim()) newErrors.marksGeneral = 'Marks for General Category are required';
    if (!formData.marksBackward.trim()) newErrors.marksBackward = 'Marks for Backward Category are required';
    if (!formData.syllabus.trim()) newErrors.syllabus = 'Syllabus is required';
    if (!formData.startdate) newErrors.startdate = 'Start Date is required';
    if (!formData.enddate) newErrors.enddate = 'End Date is required';
    if (!formData.howtoapply.trim()) newErrors.howtoapply = 'How to Apply is required';
    if (!formData.link.trim()) newErrors.link = 'Link is required';
    if (!formData.state) newErrors.state = 'State is required';

    // Date validation
    const startDate = new Date(formData.startdate);
    const endDate = new Date(formData.enddate);
    const today = new Date();

    if (startDate < today) newErrors.startdate = 'Start Date cannot be in the past';
    if (endDate <= startDate) newErrors.enddate = 'End Date must be after the Start Date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Do not submit if validation fails

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/entrnc', formData);
      console.log(response.data);
      alert('Entrance details entered successfully');
      setFormData({
        name: '',
        details: '',
        education: '',
        degree: [],
        marksGeneral: '',
        marksBackward: '',
        syllabus: '',
        startdate: '',
        enddate: '',
        howtoapply: '',
        link: '',
        state: '', // Reset the state field
        examType:''
      });
      navigate('/admin/entrance');
    } catch (error) {
      console.error('Error submitting the form:', error);
    } finally {
      setLoading(false);
    }
  };

 // Function to scroll to footer

 const srollToFooter = () =>
 {
  if(footerRef.current)
    footerRef.current.scrollIntoView({behavior:'smooth'})
 }

  return (
    <>
      <Header scrollToContact={srollToFooter}/>
      <div className="adminentranceadd">
        <h2>Submit an Entrance</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div>
            <label>Details:</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              required
            />
            {errors.details && <p className="error">{errors.details}</p>}
          </div>
           {/* Add Exam Type field */}
           <div>
            <label>Exam Type:</label>
            <select
              name="examType"
              value={formData.examType}
              onChange={handleChange}
              required
            >
              <option value="">Select Exam Type</option>
              {examType.map((examType) => (
                <option key={examType} value={examType}>
                  {examType}
                </option>
              ))}
            </select>
            {errors.examType && <p className="error">{errors.examType}</p>}
          </div>
          <div>
            <label>Education:</label>
            <select
              name="education"
              value={formData.education}
              onChange={handleEducationChange}
              required
            >
              <option value="">Select Education</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
            {errors.education && <p className="error">{errors.education}</p>}
          </div>

          {showUGDegrees && (
            <div>
              <label>Select Undergraduate Degrees:</label>
              {degreesUG.map((degree) => (
                <div key={degree}>
                  <input
                    type="checkbox"
                    name="degree"
                    value={degree}
                    onChange={handleDegreeChange}
                  />
                  <label>{degree}</label>
                </div>
              ))}
              {errors.degree && <p className="error">{errors.degree}</p>}
            </div>
          )}

          {showPGDegrees && (
            <div>
              <label>Select Postgraduate Degrees:</label>
              {degreesPG.map((degree) => (
                <div key={degree}>
                  <input
                    type="checkbox"
                    name="degree"
                    value={degree}
                    onChange={handleDegreeChange}
                  />
                  <label>{degree}</label>
                </div>
              ))}
              {errors.degree && <p className="error">{errors.degree}</p>}
            </div>
          )}

          <div>
            <label>Marks for General Category:</label>
            <input
              type="text"
              name="marksGeneral"
              value={formData.marksGeneral}
              onChange={handleChange}
              required
            />
            {errors.marksGeneral && <p className="error">{errors.marksGeneral}</p>}
          </div>

          <div>
            <label>Marks for Backward Category:</label>
            <input
              type="text"
              name="marksBackward"
              value={formData.marksBackward}
              onChange={handleChange}
              required
            />
            {errors.marksBackward && <p className="error">{errors.marksBackward}</p>}
          </div>

          <div>
            <label>Syllabus:</label>
            <textarea
              name="syllabus"
              value={formData.syllabus}
              onChange={handleChange}
              required
            />
            {errors.syllabus && <p className="error">{errors.syllabus}</p>}
          </div>

          <div>
            <label>Start Date:</label>
            <input
              type="date"
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
              required
            />
            {errors.startdate && <p className="error">{errors.startdate}</p>}
          </div>

          <div>
            <label>End Date:</label>
            <input
              type="date"
              name="enddate"
              value={formData.enddate}
              onChange={handleChange}
              required
            />
            {errors.enddate && <p className="error">{errors.enddate}</p>}
          </div>

          <div>
            <label>How to Apply:</label>
            <textarea
              name="howtoapply"
              value={formData.howtoapply}
              onChange={handleChange}
              required
            />
            {errors.howtoapply && <p className="error">{errors.howtoapply}</p>}
          </div>

          <div>
            <label>Link:</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
            />
            {errors.link && <p className="error">{errors.link}</p>}
          </div>

          <div>
            <label>Select State:</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && <p className="error">{errors.state}</p>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      <Footer ref={footerRef}/>
    </>
  );
};

export default EntranceForm;
