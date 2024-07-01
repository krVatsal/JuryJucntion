"use client"
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const CaseSubmissionForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
      const response = await fetch('http://localhost:5217/api/v1/query/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ refreshToken, data }),
        credentials: 'include' 
      });
      
      if (response.ok) {
        reset();
        alert('Case submitted successfully');
        router.push('/query/status'); // Redirect to a page listing cases or some other page
      } else {
        const res = await response.json();
        throw new Error(res.message || 'Failed to submit case');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit. Please try again.');
    }
  };

  let clientID = '';
  let advocateID = '';

  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) {
    clientID = localStorage.getItem("clientID")
    advocateID = localStorage.getItem("advocateID")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
      <div className="max-w-md w-full p-6 bg-white border border-gray-300 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Submit Case</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">Client ID</label>
            <input
              type="text"
              id="clientId"
              defaultValue={clientID}
              readOnly
              {...register('clientId', { required: 'Client ID is required' })}
              className= "text-gray-400 mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.clientId && <p className="text-red-500 text-sm mt-1">{errors.clientId.message}</p>}
          </div>
          <div>
            <label htmlFor="advocateId" className="block text-sm font-medium text-gray-700">advocateId</label>
            <input
              type="text"
              id="advocateId"
              defaultValue={advocateID}
              readOnly
              {...register('advocateId', { required: 'Advocate ID is required' })}
              className="text-gray-400 mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.advocateId && <p className="text-red-500 text-sm mt-1">{errors.advocateId.message}</p>}
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Name is required' })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              {...register('address', { required: 'Address is required' })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
            <input
              type="number"
              id="contact"
              {...register('contact', { required: 'Contact number is required' })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              id="dob"
              {...register('dob', { required: 'Date of Birth is required' })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
          </div>
          <div>
            <label htmlFor="about_the_case" className="block text-sm font-medium text-gray-700">About the Case</label>
            <textarea
              id="about_the_case"
              {...register('about_the_case', { required: 'Case details are required' })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.about_the_case && <p className="text-red-500 text-sm mt-1">{errors.about_the_case.message}</p>}
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CaseSubmissionForm;
