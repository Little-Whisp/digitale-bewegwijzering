import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Weather from './Weather/Weather';
import News from './News/News';
import Pubs from './Pubs';

import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
};

const AppContent = () => {
  const routes = ['/', '/news', '/pubs'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(currentIndex => (currentIndex + 1) % routes.length);
    }, 20000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    navigate(routes[currentIndex]);
  }, [currentIndex, navigate]);

  return (
    <div>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="circle-link"></Link>
          </li>
          <li className="nav-item">
            <Link to="/news" className="circle-link"></Link>
          </li>
          <li className="nav-item">
            <Link to="/pubs" className="circle-link"></Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<TransitionPage><Weather /></TransitionPage>} />
        <Route path="/news" element={<TransitionPage><News /></TransitionPage>} />
        <Route path="/pubs" element={<TransitionPage><Pubs /></TransitionPage>} />
      </Routes>
    </div>
  );
};

const TransitionPage = ({ children }) => (
  <TransitionGroup>
    <CSSTransition timeout={300} classNames="fade">
      <div className="page">
        {children}
      </div>
    </CSSTransition>
  </TransitionGroup>
);

export default App;
