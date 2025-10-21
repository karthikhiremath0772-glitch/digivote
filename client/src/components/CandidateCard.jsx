import React, { useEffect, useState } from 'react';
import './CandidateCard.css';

export default function CandidateCard({ candidate, onEdit }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`candidate-card ${animate ? 'fade-in' : ''}`}
      style={{ borderColor: candidate.color }}
    >
      <div className="top-row">
        <img
          src={`http://localhost:4000/images/${candidate.photo}`}
          alt={`${candidate.name} profile`}
          className="candidate-photo"
        />
        <img
          src={`http://localhost:4000/images/${candidate.partyLogo}`}
          alt={`${candidate.party} logo`}
          className="party-logo"
        />
      </div>

      <h3>{candidate.name}</h3>
      <p className="party-label" style={{ color: candidate.color }}>
        Party: {candidate.party}
      </p>
      <p className="description">{candidate.description}</p>

      <button className="edit-btn" onClick={() => onEdit(candidate)}>✏️ Edit</button>
    </div>
  );
}
