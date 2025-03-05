import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
};

export default App;
