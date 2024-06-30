"use client"
import React, { useState, useEffect } from 'react';

const AdvocateSearchPage = () => {
  const [advocates, setAdvocates] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [displayText1, setDisplayText1] = useState("");
  const [displayText2, setDisplayText2] = useState("");
  const [displayError1, setDisplayError1] = useState("");
  const [displayError2, setDisplayError2] = useState("");

  const locations = ['New Delhi' , 'Prayagraj' , 'Mumbai' , 'Kolkata' , 'Chennai' , 'Bangalore']; 
  const specializations = ['Criminal lawyer' , 'Corporate lawyer' , 'Civil lawyer' , 'Intellectual property lawyer' , 'Tax lawyer' , 'Labour lawyer' , 'Immigration lawyer' , 'Government lawyer' , 'Bankruptcy lawyer']


  const handleSearch = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        // console.log(name)
      const response = await fetch('http://localhost:5217/api/v1/client/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${accessToken}`
        },

        body: JSON.stringify({ name, refreshToken }),
        credentials: 'include'
      });
      const res = await response.json();
      console.log(res)
      if (response.ok) {
        setDisplayText1("Fetched Advocates successfully!");
        setTimeout(() => {
            setDisplayText1("");
        }, 2000);
        setAdvocates(res.advocates);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.error('Search error:', error);
      setDisplayError1("Failed to fetch or No advocates available, Please try again.");
      setTimeout(() => {
        setDisplayError1("");
    }, 2000);
    }
  };
  
  const handleFilter = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
      const response = await fetch('http://localhost:5217/api/v1/client/filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ location, experience, specialization, refreshToken }),
          credentials: 'include'
      });
      const res = await response.json();
      if (response.ok) {
        setDisplayText2("Fetched Advocates successfully");
        setTimeout(() => {
            setDisplayText2("");
        }, 2000);
        setAdvocates(res.advocates);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.error('Filter error:', error);
      setDisplayError2("Failed to fetch or No advocates available, Please try again.");
      setTimeout(() => {
        setDisplayError2("");
    }, 2000);
    }
  };
  

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-white">Search for Advocates</h1>

      <div className="flex flex-col items-center mb-8">
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Search</button>
        {displayText1 && <p className="text-green-500 text-sm mt-2 text-center">{displayText1}</p>}
        {displayError1 && <p className="text-red-500 text-sm mt-2 text-center">{displayError1}</p>}
      </div>

      <div className="flex flex-col items-center mb-8">
        <select value={location} onChange={(e) => setLocation(e.target.value)} className="p-2 border border-gray-300 rounded mb-4">
          <option value="">Select Location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>{loc}</option>
          ))}
        </select>

        <select value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="p-2 border border-gray-300 rounded mb-4">
          <option value="">Select Specialization</option>
          {specializations.map((spec, index) => (
            <option key={index} value={spec}>{spec}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Experience (years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4"
        />

        <button onClick={handleFilter} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Filter</button>
        {displayText2 && <p className="text-green-500 text-sm mt-2 text-center">{displayText2}</p>}
        {displayError2 && <p className="text-red-500 text-sm mt-2 text-center">{displayError2}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {advocates.map((advocate, index) => (
 <div key={index} className="p-6 border border-gray-300 rounded-md shadow-lg bg-gray-800 text-white">
 <div className="flex flex-col items-center">
   <img src={advocate.avatar} alt={advocate.name} className="w-24 h-24 rounded-full bg-white p-1 mb-4" />
   <h2 className="text-xl font-bold mb-2">{advocate.name}</h2>
   <p className="text-sm mb-1">{advocate.specialization}</p>
   <p className="text-sm mb-1">{advocate.location}</p>
   <p className="text-sm mb-4">Experience: {advocate.experience} years</p>
   <button onClick={() => window.location.href = `/advocate/details?advocate=${encodeURIComponent(advocate._id)}`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">View Details</button>
 </div>
</div>
        ))}
      </div>
    </div>
  );
};

export default AdvocateSearchPage;
