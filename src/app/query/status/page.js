"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const QueryStatusPage = () => {
    const [queries, setQueries] = useState([]);
    const [advocateName, setadvocateName] = useState([]);
    const router = useRouter();
    let clientId = '';

    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
        clientId = localStorage.getItem("clientID");
    }

    useEffect(() => {
        // Fetch data from backend API
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5217/api/v1/query/status', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'clientId': clientId
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch query status');
                }

                const data = await response.json();
                console.log(data)
                if (Array.isArray(data.data.queries)) {
                    setQueries(data.data.queries); 
                    setadvocateName(data.data.advocateNames); 
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (error) {
                console.error('Error fetching query status:', error);
                // Handle error, e.g., show error message
            }
        };

        fetchData();
    }, [clientId]);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-300 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Query Status</h2>
                {queries.length === 0 ? (
                    <p className="text-center text-gray-700">Loading...</p>
                ) : (
                    <div className="space-y-4">
                        {queries.map((query) => (
                            <div key={query._id} className="border border-gray-300 rounded-md p-4">
                                <p className="text-lg font-semibold">{query.name}</p>

                                <p className="text-gray-700">Advocate: {advocateName[query.advocateId] || "Unknown"}</p>
                                <p className="text-gray-700">Status: {query.status || "Under Process"}</p>
                                <p className="text-gray-700">About the case: {query.about_the_case}</p>
                                <p className="text-gray-700">Date of submission: {new Date(query.createdAt).toLocaleDateString()}</p>
                                {/* Add more details as needed */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QueryStatusPage;
