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
        try {
            let r = await fetch("http://localhost:5217/api/v1/client/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            let res = await r.text();
            console.log(data, res);
            if (isSubmitSuccessful) {
                reset();
                setDisplayText("Submitted successfully!");
                setTimeout(() => {
                    setDisplayText("");
                }, 2000);
                router.push("/");
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

                {[
                    { label: "Name", id: "name", validation: { required: "Name is required" } },
                    { label: "Email", id: "email", type: "email", validation: { required: "Email is required" } },
                    { label: "Password", id: "password", type: "password", validation: { required: "Password is required", minLength: { value: 6, message: "Minimum length of password should be 6" } } },
                    
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
