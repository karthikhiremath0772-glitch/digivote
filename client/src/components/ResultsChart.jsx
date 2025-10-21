import React from 'react';
import './ResultsPage.css';


export default function ResultsChart({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No results to display.</p>;
  }

  const maxVotes = Math.max(...data.map(c => c.votes), 1); // Avoid divide-by-zero

  return (
    <div style={{ marginTop: '1rem' }}>
      {data.map(c => (
        <div key={c.id} style={{ marginBottom: '12px' }}>
          <strong>{c.name}</strong> ({c.votes} votes)
          <div style={{
            background: '#007bff',
            height: '20px',
            width: `${(c.votes / maxVotes) * 100}%`,
            transition: 'width 0.5s ease'
          }} />
        </div>
      ))}
    </div>
  );
}
