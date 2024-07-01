"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [displayText, setDisplayText] = useState("");
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5217/api/v1/client/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      const res = await response.json();
      console.log(data, res);

      if (response.ok) {
        reset();
        setDisplayText("Submitted successfully!");
        localStorage.setItem('refreshToken', res.data.refreshToken || '');
        localStorage.setItem('accessToken', res.data.accessToken || '');
        setMessage(res.message);
        console.log(res)
        const clientName = res.data.clientName; // Correctly access clientName from response
        const clientID = res.data.clientID; // Correctly access clientName from response

        // router.push({
        //   pathname: '/client/home',
        //   query: { clientName:clientName},
        // })
        router.push(`/client/home?clientName=${encodeURIComponent(clientName)}&clientID=${encodeURIComponent(clientID)}`)
      } else {
        throw new Error(res.error || "Failed to login");
      }
    } catch (error) {
      console.error("Login error:", error);
      setDisplayText("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col max-w-md mx-auto p-6 border border-gray-300 rounded-md shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address'
                }
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: { value: true, message: "This field is required" },
                minLength: { value: 6, message: "Minimum length of password should be 6" }
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Login</button>
          {displayText && <p className="text-green-500 text-sm mt-2 text-center">{displayText}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
