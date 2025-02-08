import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndStudents = async () => {
      try {
        // Fetch the logged-in user's profile
        const profileResponse = await axios.get('http://localhost:5000/api/users/profile', {
          withCredentials: true,
        });

        // Check if the user is an admin
        if (profileResponse.data.role === 'admin') {
          setIsAdmin(true);
          // Fetch students list if the user is an admin
          const studentsResponse = await axios.get('http://localhost:5000/api/users/students', {
            withCredentials: true,
          });
          setStudents(studentsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndStudents();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Students</h2>
      {isAdmin ? (
        students.length > 0 ? (
          <ul>
            {students.map((student) => (
              <li key={student._id}>{student.username}</li>
            ))}
          </ul>
        ) : (
          <p>No students found</p>
        )
      ) : (
        <p>Access Denied: You must be an admin to view this page.</p>
      )}
    </div>
  );
};

export default Students;