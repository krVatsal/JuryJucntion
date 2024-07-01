"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";

const AdvocateDetailsPage = () => {
  const [advocate, setAdvocate] = useState('');
  const [advocateDetails, setAdvocateDetails] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const advocateId = searchParams.get("advocate");
    if (advocateId) {
      setAdvocate(advocateId);
      fetchAdvocateDetails(advocateId);
    }
  }, [searchParams]);

  const fetchAdvocateDetails = async (id) => { 
    try {
      const token = localStorage.getItem('accessToken')
      console.log("Access Token being sent:", token); // Log the access token
  
      const response = await fetch(`http://localhost:5217/api/v1/advocate/details/${encodeURIComponent(id)}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
  
      const data = await response.json();
      if (response.ok) {
        setAdvocateDetails(data.advocate);
      } else {
        throw new Error(data.message || "Failed to fetch advocate details");
      }
    } catch (error) {
      console.error("Error fetching advocate details:", error);
    }
  };

  if (!advocateDetails) {
    return <div>Loading...</div>;
  }
  localStorage.setItem('advocateID', advocate||" ")

  return (
    <div className="min-h-screen bg-gray-300 p-4">
      <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-300 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">{advocateDetails.name}</h2>
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <img src={advocateDetails.avatar} alt={advocateDetails.name} className="w-32 h-32 rounded-full bg-gray-200 mb-4" />
            <p className="text-xl text-gray-700">{advocateDetails.specialization}</p>
            <p className="text-lg text-gray-700">{advocateDetails.location}</p>
            <p className="text-lg text-gray-700">Experience: {advocateDetails.experience} years</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            <p className="text-gray-700">Email: {advocateDetails.email}</p>
            <p className="text-gray-700">Phone: {advocateDetails.contact}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Qualifications</h3>
            <p className="text-gray-700">{advocateDetails.qualification}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">About</h3>
            <p className="text-gray-700">{advocateDetails.about}</p>
          </div>

        </div>
        <div className='flex justify-center items-center'>
        <button onClick={() => window.location.href = "/query/submit"} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit Your Case</button>
        </div>
      </div>
    </div>
  );
};

export default AdvocateDetailsPage;
