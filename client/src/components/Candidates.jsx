import React, { useEffect, useState } from 'react';
import VoteConfirm from './VoteConfirm';

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/candidates')
      .then(async res => {
        if (!res.ok) {
          const text = await res.text();
          console.error("GET /api/candidates failed", res.status, text);
          throw new Error("Server returned " + res.status);
        }
        try {
          return await res.json();
        } catch (e) {
          const text = await res.text();
          console.error("GET /api/candidates invalid JSON. status:", res.status, "body:", text);
          throw e;
        }
      })
      .then(data => { setCandidates(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(e => { console.error("Candidates fetch error:", e); setError(e.message || String(e)); setLoading(false); });
  }, []);

  if (loading) return <p>Loading candidates…</p>;
  if (error) return <p>Error: {error}</p>;
  if (selected) return <VoteConfirm candidate={selected} onBack={() => setSelected(null)} />;

  return (
    <section>
      <h2>Choose a candidate</h2>
      <ul>
        {candidates.map(c => (
          <li key={c.id}>
            <button onClick={() => setSelected(c)}>{c.name} — {c.party}</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
