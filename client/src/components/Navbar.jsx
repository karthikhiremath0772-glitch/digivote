import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className={`nav-item fade-in delay-0 ${location.pathname === '/' ? 'active' : ''}`}>
          <Link to="/">🏠 Home</Link>
        </li>
        <li className={`nav-item fade-in delay-1 ${location.pathname === '/candidates' ? 'active' : ''}`}>
          <Link to="/candidates">👥 Candidates</Link>
        </li>
        <li className={`nav-item fade-in delay-2 ${location.pathname === '/vote' ? 'active' : ''}`}>
          <Link to="/vote">🗳️ Vote</Link>
        </li>
        <li className={`nav-item fade-in delay-3 ${location.pathname === '/results' ? 'active' : ''}`}>
          <Link to="/results">📊 Results</Link>
        </li>
      </ul>
    </nav>
  );
}
