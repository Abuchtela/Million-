import React from 'react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><a href="#welcome">Welcome</a></li>
          <li><a href="#quiz">Quiz</a></li>
          <li><a href="#scoring">Scoring</a></li>
          <li><a href="#leaderboard">Leaderboard</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
