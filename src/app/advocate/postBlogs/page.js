"use client"
import React, { useState } from 'react';

const BlogPostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const advocateId = localStorage.getItem('advocateID'); // Fetch advocateID from localStorage

  const handlePostBlog = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Start submitting

    try {
      const response = await fetch('http://localhost:5217/api/v1/blogs/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'advocateId': advocateId // Send advocateId in headers
        },
        body: JSON.stringify({ title, body, advocateId }), // Ensure advocateId is sent along with title and body
      });

      if (!response.ok) {
        throw new Error('Failed to post blog');
      }

      // Handle success
      setSubmissionStatus('success');
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Error posting blog:', error);
      setSubmissionStatus('error');
    } finally {
      setSubmitting(false); // End submitting
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-300 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Post a Blog</h2>
        
        <form onSubmit={handlePostBlog} className="mb-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="body" className="block text-gray-700">Body:</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="advocateId" className="block text-gray-700">Advocate ID:</label>
            <input
              type="text"
              id="advocateId"
              value={advocateId}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {submitting ? 'Submitting...' : 'Post Blog'}
          </button>

          {submissionStatus === 'success' && (
            <p className="text-green-600 mt-2">Blog posted successfully!</p>
          )}

          {submissionStatus === 'error' && (
            <p className="text-red-600 mt-2">Failed to post blog. Please try again later.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default BlogPostPage;
