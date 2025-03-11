# MCQ Generator

An interactive web application that generates multiple-choice questions based on user-defined topics.

## Features

- Dynamic MCQ generation based on user input
- Interactive quiz interface with immediate feedback
- Score calculation and results display
- Responsive design for various screen sizes
- Visual feedback for correct and incorrect answers

## Technologies Used

- React.js
- Tailwind CSS
- Fetch API for backend communication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mcq-generator.git
cd mcq-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. When you first load the application, you'll be prompted to enter a quiz topic
2. Type your desired quiz subject (e.g., "JavaScript Fundamentals", "World History", "Biology")
3. The application will generate a set of multiple-choice questions related to your topic
4. Select an answer for each question
5. Click the "Submit" button when you've answered all questions
6. View your results, including total score and correct answers

## API Integration

The application communicates with a backend API to generate questions:

- Endpoint: `https://mcqs-generator.vercel.app/generate`
- Method: POST
- Request Body: `{ "job": "your-quiz-topic" }`
- Response: JSON object containing generated MCQs

## Customization

You can easily customize the UI by modifying the Tailwind CSS classes in the component files.



## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project uses a custom MCQ generation API
- UI design inspired by modern quiz applications
