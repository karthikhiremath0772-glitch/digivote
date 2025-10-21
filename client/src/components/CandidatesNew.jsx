import React, { useEffect, useState } from 'react';
import './CandidatesNew.css';

const candidates = [
  {
    id: 1,
    name: 'Alice Rao',
    party: 'Blue Party',
    color: '#007bff',
    icon: '👩‍💼',
    description: 'Former mayor focused on education reform and digital literacy.',
  },
  {
    id: 2,
    name: 'Bhaskar N',
    party: 'Green Party',
    color: '#4caf50',
    icon: '🧑‍🌾',
    description: 'Environmental activist promoting clean energy and sustainable farming.',
  },
  {
    id: 3,
    name: 'Chitra S',
    party: 'Red Party',
    color: '#e91e63',
    icon: '👩‍⚕️',
    description: 'Social worker advocating for women\'s rights and healthcare access.',
  },
];

export default function CandidatesNew() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 100); // delay to trigger animation
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="candidates-container">
      <h2 className={animate ? 'fade-in delay-0' : ''}>🧑‍💼 Candidate Profiles</h2>
      <div className="card-grid">
        {candidates.map((c, index) => (
          <div
            key={c.id}
            className={`candidate-card ${animate ? `fade-in delay-${index + 1}` : ''}`}
            style={{ borderColor: c.color }}
          >
            <div className="candidate-icon">{c.icon}</div>
            <h3>{c.name}</h3>
            <p className="party-label" style={{ color: c.color }}>
              Party: {c.party}
            </p>
            <p className="description">{c.description}</p>
            <button className="edit-btn">✏️ Edit</button>
          </div>
        ))}
      </div>
      <div className={`vote-button-container ${animate ? 'fade-in delay-4' : ''}`}>
        <button className="vote-btn">🟢 Start Voting</button>
      </div>
    </section>
  );
}
