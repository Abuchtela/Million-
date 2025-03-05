import React, { useState, useEffect } from 'react';

const QuizInterface = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch questions from Firestore or a local source
    const fetchQuestions = async () => {
      const fetchedQuestions = [
        {
          question: 'What is the capital of France?',
          options: ['Paris', 'London', 'Berlin', 'Madrid'],
          answer: 'Paris',
        },
        {
          question: 'What is 2 + 2?',
          options: ['3', '4', '5', '6'],
          answer: '4',
        },
        {
          question: 'What is the largest planet in our solar system?',
          options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
          answer: 'Jupiter',
        },
        {
          question: 'What is the boiling point of water?',
          options: ['90°C', '100°C', '110°C', '120°C'],
          answer: '100°C',
        },
        {
          question: 'What is the chemical symbol for gold?',
          options: ['Au', 'Ag', 'Pb', 'Fe'],
          answer: 'Au',
        },
      ];
      setQuestions(fetchedQuestions);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      handleNextQuestion();
    }
  }, [timer]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30);
    } else {
      // Quiz finished, show results
      alert(`Quiz finished! Your score is ${score}`);
    }
  };

  return (
    <div className="quiz-interface">
      {questions.length > 0 && (
        <div>
          <h2>{questions[currentQuestionIndex].question}</h2>
          <div className="options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
          <div className="timer">Time left: {timer} seconds</div>
        </div>
      )}
    </div>
  );
};

export default QuizInterface;
