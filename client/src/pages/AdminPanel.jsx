import React, { useEffect, useState } from 'react';
import CandidateCard from '../components/CandidateCard';
import EditCandidateForm from '../components/EditCandidateForm';

export default function AdminPanel() {
  const [candidates, setCandidates] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch('/api/candidates')
      .then(res => res.json())
      .then(setCandidates);
  }, []);

  const handleSave = async (updated) => {
    const res = await fetch('/api/candidates/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });

    if (res.ok) {
      setCandidates(prev =>
        prev.map(c => (c.id === updated.id ? updated : c))
      );
      setEditing(null);
    }
  };

  return (
    <section>
      <h2>🧑‍💼 Candidate Profiles</h2>

      <div className="scroll-row" style={{ display: 'flex', overflowX: 'auto', paddingBottom: '1rem' }}>
        {candidates.map(c => (
          <CandidateCard key={c.id} candidate={c} onEdit={setEditing} />
        ))}
      </div>

      {editing && <EditCandidateForm candidate={editing} onSave={handleSave} />}

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <a href="/vote">
          <button style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px' }}>
            🟢 Start Voting
          </button>
        </a>
      </div>
    </section>
  );
}
