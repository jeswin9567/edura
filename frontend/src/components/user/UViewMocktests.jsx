import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UViewMocktests.css'; // Optional CSS file for styling

const UMockTestList = () => {
  const { examId } = useParams(); // Get the exam ID from the URL
  const [mockTests, setMockTests] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch mock tests for the specific entrance exam
  useEffect(() => {
    const fetchMockTests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/mocktest/viewmocktests/${examId}`); // Adjust URL to your API endpoint
        setMockTests(response.data);
      } catch (error) {
        setError('Error fetching mock tests');
        console.error('Error fetching mock tests:', error);
      }
    };
    fetchMockTests();
  }, [examId]);

  // Handle navigation to participate in the mock test
  const Participate = (mockTestId) => {
    navigate(`/user/quiz/${mockTestId}`); // Adjust route as needed
  };

  return (
    <div className="uservmdets-list">
      <h2>Mock Tests for Entrance Exam</h2>
      {error && <p className="uservmdets-error-message">{error}</p>}
      {mockTests.length === 0 ? ( // Check if there are no mock tests
        <p className="uservmdets-no-tests">No mock tests available.</p>
      ) : (
        <div className="uservmdets-grid">
          {mockTests.map((mockTest) => (
            <div key={mockTest._id} className="uservmdets-item">
              <h3>{mockTest.title}</h3>
              <p>Duration: {mockTest.duration} minutes</p>
              <p>Total Marks: {mockTest.totalMarks}</p>
              <p>Questions: {mockTest.numberOfQuestions}</p>
              <p>Passing Marks: {mockTest.passingMarks}</p>
              
              {/* Participate button */}
              <button 
                className="uservmdets-update-button" 
                onClick={() => Participate(mockTest._id)}
              >
                Participate
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UMockTestList;
