import React, { useState, useEffect } from 'react';
import firebase from '../services/firebaseService';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [dailyWinner, setDailyWinner] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const leaderboardData = await firebase.getLeaderboard();
      setLeaderboard(leaderboardData);
      determineDailyWinner(leaderboardData);
    };

    fetchLeaderboard();
  }, []);

  const determineDailyWinner = (leaderboardData) => {
    if (leaderboardData.length > 0) {
      const winner = leaderboardData.reduce((prev, current) => (prev.score > current.score ? prev : current));
      setDailyWinner(winner);
    }
  };

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((user, index) => (
          <li key={index}>
            {user.name}: {user.score}
          </li>
        ))}
      </ul>
      {dailyWinner && (
        <div className="daily-winner">
          <h3>Daily Winner</h3>
          <p>{dailyWinner.name} with a score of {dailyWinner.score}</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
