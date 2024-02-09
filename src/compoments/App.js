import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Weather from './Weather/Weather';
import News from './News';
import Pubs from './Pubs';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
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
          <Route path="/" element={<Weather />} />
          <Route path="/news" element={<News />} />
          <Route path="/pubs" element={<Pubs />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
