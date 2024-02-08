import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Routes
import Weather from './Weather/Weather';
import News from './News';
import './styles/App.css';
import Pubs from './Pubs';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Weer</Link>
            </li>
            <li>
              <Link to="/news">Nieuws</Link>
            </li>
            <li>
              <Link to="/pubs">Kroegen</Link>
            </li>
          </ul>
        </nav>

        <Routes> {/* Wrap Routes around Route components */}
          <Route path="/" element={<Weather />} /> {/* Use element prop */}
          <Route path="/news" element={<News />} />
          <Route path="/pubs" element={<Pubs />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
