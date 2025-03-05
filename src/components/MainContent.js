import React from 'react';
import QuizInterface from './QuizInterface';
import ScoringAndLifelines from './ScoringAndLifelines';
import Leaderboard from './Leaderboard';
import WelcomeScreen from './WelcomeScreen';

const MainContent = () => {
  return (
    <main className="main-content">
      <WelcomeScreen />
      <QuizInterface />
      <ScoringAndLifelines />
      <Leaderboard />
    </main>
  );
};

export default MainContent;
