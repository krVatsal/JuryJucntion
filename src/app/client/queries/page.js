"use client"
import React, { useEffect, useState } from 'react';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [advocateType, setAdvocateType] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:5217/api/v1/questions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      if (Array.isArray(data.data)) {
        setQuestions(data.data); // Ensure data.data is an array of questions
      } else {
        setQuestions([]); // Set empty array if data.data is not an array
      }
    }
    catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handlePostQuestion = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5217/api/v1/questions/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ question: newQuestion, advocateType }), // Include advocateType in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to post question');
      }

    //   const data = await response.json();
    //   setQuestions(data.data); // Update the questions list with the latest data
      setNewQuestion(''); // Clear the input field after posting
      setAdvocateType(''); // Clear advocateType after posting
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  const handleSelectChange = (event) => {
    setAdvocateType(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-300 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Questions and Answers</h2>
        
        <form onSubmit={handlePostQuestion} className="mb-6">
          <div className="mb-4">
            <label htmlFor="question" className="block text-gray-700">Post a new question:</label>
            <textarea
              id="question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="advocateType" className="block text-gray-700">Select Advocate Type:</label>
            <select
              id="advocateType"
              value={advocateType}
              onChange={handleSelectChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select...</option>
              <option value="Criminal lawyer">Criminal Lawyer</option>
              <option value="Corporate lawyer">Corporate Lawyer</option>
              <option value="Civil lawyer">Civil Lawyer</option>
              <option value="Intellectual property lawyer">Intellectual Property Lawyer</option>
              <option value="Tax lawyer">Tax Lawyer</option>
              <option value="Labour lawyer">Labour Lawyer</option>
              <option value="Immigration lawyer">Immigration Lawyer</option>
              <option value="Government lawyer">Government Lawyer</option>
              <option value="Bankruptcy lawyer">Bankruptcy Lawyer</option>
            </select>
          </div>
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Post Question</button>
        </form>

        {Array.isArray(questions) && questions.length === 0 ? (
          <p className="text-center text-gray-700">No questions yet.</p>
        ) : (
          <div className="space-y-4">
            {questions.map((question) => (
              <div key={question._id} className="border border-gray-300 rounded-md p-4">
                <p className="text-lg font-semibold">{question.question}</p>
                <p className="text-sm ">{question.advocateType}</p>
                <p className="text-gray-700">{question.answer || 'No answer yet'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;

