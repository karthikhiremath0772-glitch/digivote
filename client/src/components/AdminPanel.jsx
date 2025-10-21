import React, { useEffect, useState } from 'react';
import CandidateCard from '../components/CandidateCard';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/candidates')
      .then(res => res.json())
      .then(setCandidates);
  }, []);

  const handleSave = async (updatedCandidate) => {
    const res = await fetch('/api/candidates/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCandidate),
    });

    if (res.ok) {
      const newList = candidates.map(c =>
        c.id === updatedCandidate.id ? updatedCandidate : c
      );
      setCandidates(newList);
    }
  };

  const handleStartVoting = () => {
    navigate('/vote');
  };

  return (
    <section>
      <h2>🧑‍💼 Candidate Profiles</h2>

      <div className="card-grid">
        {candidates.map(c => (
          <CandidateCard key={c.id} candidate={c} onSave={handleSave} />
        ))}
      </div>

      <button onClick={handleStartVoting} style={{ marginTop: '2rem' }}>
        🟢 Start Voting
      </button>
    </section>
  );
}
