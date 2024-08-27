import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [mcqs, setMcqs] = useState([]);
  const [answers, setAnswers] = useState({});
  const [marks, setMarks] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [allAnswered, setAllAnswered] = useState(false);
  const [quizType, setQuizType] = useState(""); // State for quiz type
  const [showModal, setShowModal] = useState(true); // State to show modal
  const [inputValue, setInputValue] = useState(""); // State for input field
  const [highlightedAnswers, setHighlightedAnswers] = useState({}); // State for highlighting correct answers
  const resultsRef = useRef(null); // Reference to the results container

  useEffect(() => {
    if (quizType) {
      fetch('https://mcqs-generator.vercel.app/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ job: quizType })
      })
      .then(response => response.json())
      .then(data => {
        setMcqs(data.mcqs);
        setTotalQuestions(data.mcqs.length);
      });
    }
  }, [quizType]);

  const handleChange = (e, index) => {
    const updatedAnswers = {
      ...answers,
      [index]: e.target.value
    };
    setAnswers(updatedAnswers);

    setAllAnswered(mcqs.length === Object.keys(updatedAnswers).length);
  };

  const checkAnswers = () => {
    if (!allAnswered) {
      alert('Please answer all questions before submitting.');
      return;
    }

    let correct = 0;
    const correctAnswersMap = {};

    mcqs.forEach((mcq, index) => {
      if (answers[index] === mcq.answer[0]) {
        correct++;
        correctAnswersMap[index] = true; // Mark this question as having the correct answer selected
      } else {
        correctAnswersMap[index] = false; // Mark this question as having the wrong answer
      }
    });

    const computedMarks = ((correct / mcqs.length) * 100).toFixed(1);
    setMarks(computedMarks);
    setCorrectAnswers(correct);
    setHighlightedAnswers(correctAnswersMap); // Set the highlight state
    setSubmitted(true);

    // Scroll to the results container
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setQuizType(inputValue.trim());
      setShowModal(false); // Close modal after submission
    } else {
      alert('Please enter a quiz type.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500">
      {/* Modal for quiz type input */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Enter Quiz Type</h2>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
              placeholder="Enter quiz type..."
            />
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">MCQS Generator</h1>
          <div className="flex space-x-4">
            <button
              onClick={checkAnswers}
              className={`px-4 py-2 ${allAnswered ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} text-white font-semibold rounded-lg transition-colors`}
              disabled={!allAnswered}
            >
              Submit
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-white">MCQ Test</h1>
          {mcqs.map((mcq, index) => (
            <div
              key={index}
              className={`mb-6 p-6 rounded-lg shadow-md ${highlightedAnswers[index] === true ? 'bg-green-100' : highlightedAnswers[index] === false ? 'bg-red-100' : 'bg-white'}`}
            >
              <p className="font-semibold text-lg mb-4">{index + 1}. {mcq.question}</p>
              <div className="space-y-2">
                {Object.entries(mcq.options).map(([key, value]) => (
                  <label key={key} className="block">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={key}
                      checked={answers[index] === key}
                      onChange={(e) => handleChange(e, index)}
                      className="mr-2"
                      disabled={submitted} // Disable inputs after submission
                    />
                    <span className={`text-gray-700 ${submitted && key === mcq.answer[0] ? 'font-bold text-green-600' : ''}`}>{key}. {value}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Display Results */}
          {submitted && (
            <div
              ref={resultsRef}
              className="mt-8 p-6 bg-white rounded-lg shadow-md text-center"
            >
              <p className="text-2xl font-bold text-green-600">Results:</p>
              <p className="text-lg mt-2">Total Questions: {totalQuestions}</p>
              <p className="text-lg">Correct Answers: {correctAnswers}</p>
              <p className="text-lg">Marks: {marks}%</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-gray-600">© 2024 MCQS Generator Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
