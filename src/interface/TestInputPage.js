// TestInputPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TestInputPage() {
  const [testTopic, setTestTopic] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setTestTopic(e.target.value);
  };

  const handleSubmit = () => {
    if (testTopic.trim()) {
      navigate(`/mcq-test?job=${encodeURIComponent(testTopic)}`);
    } else {
      alert('Please enter a test topic.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Test Input</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Enter Test Topic</h2>
          <input
            type="text"
            value={testTopic}
            onChange={handleInputChange}
            placeholder="Enter test topic"
            className="w-full px-4 py-2 mb-4 border rounded-lg"
          />
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Next
          </button>
        </div>
      </main>

      <footer className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-gray-600">© 2024 Interview Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default TestInputPage;
