import React, { useState } from 'react';

const ScoringAndLifelines = ({ questions, userAnswers }) => {
  const [score, setScore] = useState(0);
  const [lifelineUsed, setLifelineUsed] = useState(false);

  const calculateScore = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (question.answer === userAnswers[index]) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  const useLifeline = () => {
    if (!lifelineUsed) {
      setLifelineUsed(true);
      // Implement 50/50 lifeline logic here
      alert('50/50 Lifeline used!');
    }
  };

  return (
    <div className="scoring-and-lifelines">
      <h2>Score: {score}</h2>
      <button onClick={calculateScore}>Calculate Score</button>
      <button onClick={useLifeline} disabled={lifelineUsed}>
        Use 50/50 Lifeline
      </button>
    </div>
  );
};

export default ScoringAndLifelines;
