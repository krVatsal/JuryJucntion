"use client"
import React, { useEffect, useState } from 'react';

const AdvocateApplications = () => {
  const [applications, setApplications] = useState([]);
  const [advocateName, setAdvocateName] = useState('');

  // Define fetchApplications function
  const fetchApplications = async () => {
    try {
      const advocateId = localStorage.getItem('advocateID'); // Get advocateId from localStorage
      const response = await fetch('http://localhost:5217/api/v1/advocate/applications', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'advocateId': advocateId // Send advocateId in headers
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }

      const data = await response.json();
      setApplications(data.data.applications[0]); // Assuming data.data contains the array of applications
      // setAdvocateName(data.data.advocateName); // Assuming data.data contains the advocateName
    } catch (error) {
      console.error('Error fetching applications:', error);
      // Handle error, e.g., show error message
    }
  };

  // Call fetchApplications whenever necessary
  const refreshApplications = () => {
    fetchApplications();
  };

  useEffect(() => {
    fetchApplications(); // Initial fetch when component mounts
  }, []); // Empty dependency array means it runs once after initial render

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      const advocateId = localStorage.getItem('advocateID'); // Get advocateId from localStorage
      const response = await fetch(`http://localhost:5217/api/v1/advocate/applications/${applicationId}/updateStatus`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'advocateId': advocateId // Send advocateId in headers
        },
        body: JSON.stringify({ status }), // Send status as JSON in request body
      });

      if (!response.ok) {
        throw new Error(`Failed to ${status.toLowerCase()} application`);
      }

      // Refresh applications after successful update
      fetchApplications();
    } catch (error) {
      console.error(`Error ${status.toLowerCase()} application:`, error);
      // Handle error, e.g., show error message
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-300 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Applications for Advocate: {advocateName}</h2>
        {applications.length === 0 ? (
          <p className="text-center text-gray-700">Loading...</p>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div key={application._id} className="border border-gray-300 rounded-md p-4">
                <p className="text-lg font-semibold">{application.name}</p>
                <p className="text-gray-700">Status: {application.status || "Pending"}</p>
                <p className="text-gray-700">Location: {application.address || "Pending"}</p>
                <p className="text-gray-700">About the case: {application.about_the_case}</p>
                <p className="text-gray-700">Date of submission: {new Date(application.createdAt).toLocaleDateString()}</p>
               
                <div className="flex space-x-4 mt-4">
                  <button onClick={() => updateApplicationStatus(application._id, 'Accepted')} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">Accept</button>
                  <button onClick={() => updateApplicationStatus(application._id, 'Rejected')} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvocateApplications;
