import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './updprofile.css'

function EditProfile() {
  const [user, setUser] = useState({
    name: '',
    phone: '',
    education: '',
    courses: [],
    marks: {
      tenthMark: 0,
      twelfthMark: 0,
      degreeMark: 0,
      pgMark: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const ugCourses = ['B.Tech', 'B.Sc', 'B.Com', 'BA']; // Example UG courses
  const pgCourses = ['M.Tech', 'M.Sc', 'MBA', 'MA'];   // Example PG courses

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/vuprofile', {
          headers: { Authorization: token }
        });
        setUser(response.data);
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'An unexpected error occurred.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        navigate('/login'); // Redirect to login if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === 'education') {
      // Clear courses and marks when education changes
      setUser((prevState) => ({
        ...prevState,
        courses: [],
        marks: { tenthMark: 0, twelfthMark: 0, degreeMark: 0, pgMark: 0 }
      }));
    }
  };

  const handleMarksChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      marks: { ...prevState.marks, [name]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:5000/updateProfile', user, {
        headers: { Authorization: token }
      });
      Swal.fire({
        title: 'Success!',
        text: 'Profile updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/uvpro'); // Redirect to profile page after successful update
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'An unexpected error occurred.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="userupprofile-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={user.name || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email || ''}
            disabled
          />
        </label>

        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={user.phone || ''}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Education:
          <select
            name="education"
            value={user.education || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select Education</option>
            <option value="10">10</option>
            <option value="+2">+2</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="PostGraduate">PostGraduate</option>
          </select>
        </label>

        {/* Courses Dropdown */}
        {user.education === 'Undergraduate' && (
          <label>
            Courses:
            <select
              name="courses"
              value={user.courses[0] || ''}
              onChange={(e) => handleChange({ target: { name: 'courses', value: [e.target.value] } })}
              required
            >
              <option value="">Select Course</option>
              {ugCourses.map(course => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </label>
        )}

        {user.education === 'PostGraduate' && (
          <label>
            Courses:
            <select
              name="courses"
              value={user.courses[0] || ''}
              onChange={(e) => handleChange({ target: { name: 'courses', value: [e.target.value] } })}
              required
            >
              <option value="">Select Course</option>
              {pgCourses.map(course => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </label>
        )}

        {/* Marks Inputs */}
        <h3>Marks:</h3>
        {user.education && (
          <>
            {/* Always show 10th Mark if education is +2, Undergraduate, or PostGraduate */}
            {(user.education === '+2' || user.education === 'Undergraduate' || user.education === 'PostGraduate') && (
              <label>
                Tenth Mark:
                <input
                  type="number"
                  name="tenthMark"
                  value={user.marks.tenthMark || ''}
                  onChange={handleMarksChange}
                />
              </label>
            )}

            {/* 12th Mark is shown for +2, Undergraduate, and PostGraduate */}
            {['+2', 'Undergraduate', 'PostGraduate'].includes(user.education) && (
              <label>
                Twelfth Mark:
                <input
                  type="number"
                  name="twelfthMark"
                  value={user.marks.twelfthMark || ''}
                  onChange={handleMarksChange}
                />
              </label>
            )}

            {/* Degree Mark is shown for Undergraduate and PostGraduate */}
            {['Undergraduate', 'PostGraduate'].includes(user.education) && (
              <label>
                Degree Mark:
                <input
                  type="number"
                  name="degreeMark"
                  value={user.marks.degreeMark || ''}
                  onChange={handleMarksChange}
                />
              </label>
            )}

            {/* PG Mark is shown only for PostGraduate */}
            {user.education === 'PostGraduate' && (
              <label>
                PG Mark:
                <input
                  type="number"
                  name="pgMark"
                  value={user.marks.pgMark || ''}
                  onChange={handleMarksChange}
                />
              </label>
            )}
          </>
        )}

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default EditProfile;
