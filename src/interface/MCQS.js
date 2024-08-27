import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.png'
function App() {
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [marks, setMarks] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [allAnswered, setAllAnswered] = useState(false);
  const [quizType, setQuizType] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [highlightedAnswers, setHighlightedAnswers] = useState({});
  const resultsRef = useRef(null);

  useEffect(() => {
    if (quizType) {
      setLoading(true);
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
        setLoading(false);
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
        correctAnswersMap[index] = true;
      } else {
        correctAnswersMap[index] = false;
      }
    });

    const computedMarks = ((correct / mcqs.length) * 100).toFixed(1);
    setMarks(computedMarks);
    setCorrectAnswers(correct);
    setHighlightedAnswers(correctAnswersMap);
    setSubmitted(true);

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
      setShowModal(false);
    } else {
      alert('Please enter a quiz type.');
    }
  };

  const resetQuiz = () => {
    // Reset all states to initial values
    setMcqs([]);
    setLoading(false);
    setAnswers({});
    setMarks(0);
    setTotalQuestions(0);
    setCorrectAnswers(0);
    setSubmitted(false);
    setAllAnswered(false);
    setQuizType("");
    setShowModal(true);
    setInputValue("");
    setHighlightedAnswers({});
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500">
      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></div>
            <p className="text-white mt-4 text-lg font-semibold">Loading...</p>
          </div>
        </div>
      )}

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

<header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
  <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    <div className="flex items-center space-x-3">
      {/* Logo Image */}
      <img src={logo} alt="Logo" className="h-10 w-10" />
      <h1 className="text-2xl font-bold text-gray-800">Quiz Generator</h1>
    </div>
    <div className="flex space-x-4">
      <button
        onClick={resetQuiz}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
      >
        Try Again
      </button>
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
      <main className="container mx-auto px-4 py-8 flex-grow mt-16">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-white">Quiz </h1>

          {/* Display Results at the Top */}
          {submitted && (
            <div
              ref={resultsRef}
              className="mb-8 p-6 bg-white rounded-lg shadow-md text-center"
            >
              <p className="text-2xl font-bold text-green-600">Results:</p>
              <p className="text-lg mt-2">Total Questions: {totalQuestions}</p>
              <p className="text-lg">Correct Answers: {correctAnswers}</p>
              <p className="text-lg">Marks: {marks}%</p>
            </div>
          )}

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
                      disabled={submitted}
                    />
                    <span className={`text-gray-700 ${submitted && key === mcq.answer[0] ? 'font-bold text-green-600' : ''}`}>{key}. {value}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-gray-600">© 2024 Quiz Generator Platform. All rights reserved.</p>
        </div>
      </footer>
   
    </div>
  );
}


export default App;
