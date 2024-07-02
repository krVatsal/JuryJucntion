"use client"
import React, { useEffect, useState } from 'react';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5217/api/v1/blogs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const data = await response.json();
      setBlogs(data.data);
      console.log(data.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full p-6 bg-white border border-gray-300 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Blogs</h2>
        
        {blogs.length === 0 ? (
          <p className="text-center text-gray-700">No blogs available.</p>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div key={blog._id} className="border border-gray-300 rounded-md p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h3>
                <p className="text-gray-700 mb-4">{blog.body}</p>
                <p className="text-sm text-gray-500">Written by: {blog.advocateName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
