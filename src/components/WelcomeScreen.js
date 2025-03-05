import React, { useState } from 'react';
import firebase from '../services/firebaseService';

const WelcomeScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await firebase.login(email, password);
      } else {
        await firebase.signup(email, password);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="welcome-screen">
      <h1>Welcome to Million-</h1>
      <div className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleAuth}>
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Switch to Sign Up' : 'Switch to Log In'}
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
