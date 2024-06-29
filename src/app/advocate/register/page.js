"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const Register = () => {
    const [displayText, setDisplayText] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('avatar', data.avatar[0]); // Append the avatar file

        // Append other form data
        for (const key in data) {
            if (key !== 'avatar') {
                formData.append(key, data[key]);
            }
        }

        try {
            const response = await fetch("http://localhost:5217/api/v1/advocate/register", {
                method: "POST",
                body: formData
            });

            const res = await response.json();
            if (response.ok) {
                reset();
                setDisplayText("Submitted successfully!");
                setTimeout(() => {
                    setDisplayText("");
                    router.push("/"); // Redirect after successful submission
                }, 2000);
            } else {
                console.error("Error submitting form:", res.message);
            }
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-md mx-auto p-6 border rounded shadow-md bg-white">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 text-center">
                        <label htmlFor="avatar" className="block font-medium mb-2">Avatar</label>
                        <input
                            type="file"
                            id="avatar"
                            {...register('avatar', {
                                required: 'Avatar file is required'
                            })}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {errors.avatar && (
                            <p style={{ color: 'red' }}>{errors.avatar.message}</p>
                        )}
                    </div>
                    {[
                        { label: "Name", id: "name", validation: { required: "Name is required" } },
                        { label: "Email", id: "email", type: "email", validation: { required: "Email is required" } },
                        { label: "Password", id: "password", type: "password", validation: { required: "Password is required", minLength: { value: 6, message: "Minimum length of password should be 6" } } },
                        { label: "Contact", id: "contact", validation: { required: "Contact is required" } },
                        { label: "Experience", id: "experience", validation: { required: "Experience is required" } },
                        { label: "Qualification", id: "qualification", validation: { required: "Qualification is required" } },
                        { label: "About", id: "about", validation: { required: "About is required" } },
                        { label: "Enrollment Number", id: "enrollmentNumber", validation: { required: "Enrollment Number is required", pattern: { value: /^[A-Z]{2}\d{5}\/\d{2}$/, message: "Invalid enrollment number format" } } },
                    ].map((field) => (
                        <div key={field.id} className="mb-4">
                            <label htmlFor={field.id} className="block font-medium mb-1">{field.label}</label>
                            <input
                                type={field.type || "text"}
                                id={field.id}
                                {...register(field.id, field.validation)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors[field.id] && <p className="text-red-500 text-sm mt-1">{errors[field.id].message}</p>}
                        </div>
                    ))}
                    <div className="mb-4">
                        <label htmlFor="location" className="block font-medium mb-1">Location</label>
                        <select
                            id="location"
                            {...register('location', { required: "Location is required" })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select a location</option>
                            <option value="New Delhi">New Delhi</option>
                            <option value="Prayagraj">Prayagraj</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Kolkata">Kolkata</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Bangalore">Bangalore</option>
                        </select>
                        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="specialization" className="block font-medium mb-1">Specialization</label>
                        <select
                            id="specialization"
                            {...register('specialization', { required: "Specialization is required" })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select a specialization</option>
                            <option value="Criminal lawyer">Criminal lawyer</option>
                            <option value="Corporate lawyer">Corporate lawyer</option>
                            <option value="Civil lawyer">Civil lawyer</option>
                            <option value="Intellectual property lawyer">Intellectual property lawyer</option>
                            <option value="Tax lawyer">Tax lawyer</option>
                            <option value="Labour lawyer">Labour lawyer</option>
                            <option value="Immigration lawyer">Immigration lawyer</option>
                            <option value="Government lawyer">Government lawyer</option>
                            <option value="Bankruptcy lawyer">Bankruptcy lawyer</option>
                        </select>
                        {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                    {displayText && <p className="text-green-500 text-sm mt-4 text-center">{displayText}</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
