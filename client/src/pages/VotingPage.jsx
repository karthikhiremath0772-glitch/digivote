import React, { useEffect, useState } from 'react';
import './VotingPage.css';

export default function VotingPage() {
  const [candidates, setCandidates] = useState([]);
  const [votingClosed, setVotingClosed] = useState(false);

  useEffect(() => {
    fetch('/api/candidates')
      .then(res => res.json())
      .then(setCandidates);
  }, []);

  const handleVote = (candidateId) => {
    const voterId = `voter-${Date.now()}`;
    fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ candidateId, voterId })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          const msg = new SpeechSynthesisUtterance("Vote recorded successfully!");
          msg.lang = 'en-IN';
          window.speechSynthesis.speak(msg);
          alert("✅ Vote recorded successfully!");
        }
      });
  };

  return (
    <section>
      <h2 className="vote-heading">🗳️ Cast Your Vote</h2>


      {!votingClosed && (
        <div className="vertical-list">
          {candidates.map(c => (
            <div key={c.id} className="vote-card">
              <div className="card-content">
                <img src={`/images/${c.photo}`} alt={c.name} className="candidate-photo" />
                <div className="text-block">
                  <h3>{c.name}</h3>
                  <p className="party-label">Party: {c.party}</p>
                  <p className="animated-label">{c.description}</p>
                </div>
              </div>
              <button onClick={() => handleVote(c.id)}>🗳️ Submit Vote</button>
            </div>
          ))}
        </div>
      )}

      {!votingClosed && (
        <div className="stop-button-container">
          <button className="stop-btn" onClick={() => setVotingClosed(true)}>
            🛑 Stop Voting
          </button>
        </div>
      )}


      {votingClosed && (
        <a href="/results">
          <button>📢 Announce Results</button>
        </a>
      )}
    </section>
  );
}
