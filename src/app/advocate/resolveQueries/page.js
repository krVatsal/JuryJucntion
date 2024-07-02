"use client"
import React, { useEffect, useState } from 'react';

const AdvocateQuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const advocateId = localStorage.getItem('advocateID'); // Get advocateId from localStorage
      const response = await fetch('http://localhost:5217/api/v1/advocate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'advocateId': advocateId // Send advocateId in headers
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      setQuestions(data.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handlePostAnswer = async (questionId) => {
    try {
      const advocateId = localStorage.getItem('advocateID'); // Get advocateId from localStorage
      const response = await fetch(`http://localhost:5217/api/v1/advocate/questions/${questionId}/answer`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'advocateId': advocateId // Send advocateId in headers
        },
        body: JSON.stringify({ answer: newAnswer }), // Ensure only answer is sent
      });

      if (!response.ok) {
        throw new Error('Failed to post answer');
      }

      // Assuming you want to refresh the questions list after posting answer
      fetchQuestions();
    } catch (error) {
      console.error('Error posting answer:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-300 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Answer Questions</h2>
        
        {questions.length === 0 ? (
          <p className="text-center text-gray-700">No questions to answer.</p>
        ) : (
          <div className="space-y-4">
            {questions.map((question) => (
              <div key={question._id} className="border border-gray-300 rounded-md p-4">
                <p className="text-lg font-semibold">{question.question}</p>
                <p className="text-sm text-gray-700">Advocate Type: {question.advocateType}</p>
                <p className="text-gray-700">{question.answer ? `Answer: ${question.answer}` : 'No answer yet'}</p>
                
                {!question.answer && (
                  <div className="mt-4">
                    <label htmlFor={`answer-${question._id}`} className="block text-gray-700">Your Answer:</label>
                    <textarea
                      id={`answer-${question._id}`}
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                    <button onClick={() => handlePostAnswer(question._id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2">Post Answer</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvocateQuestionsPage;
