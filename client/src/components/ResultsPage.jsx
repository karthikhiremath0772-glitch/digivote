import React, { useEffect, useState } from 'react';
import './ResultsPage.css';

export default function ResultsPage() {
  const [results, setResults] = useState([]);

 useEffect(() => {
  fetch('/api/results')
    .then(res => res.json())
    .then(data => {
      const resultList = Array.isArray(data) ? data : data.data;
      setResults(resultList || []);
    });
}, []);


  const maxVotes = Math.max(...results.map(r => r.votes), 0);

  return (
    <section>
      <h2 className="results-heading">📊 Election Results</h2>
      <div className="results-grid">
        {results.map(r => (
          <div key={r.id} className={`result-card ${r.votes === maxVotes ? 'winner' : ''}`}>
            <img src={`/images/${r.photo}`} alt={r.name} className="result-photo" />
            <h3>{r.name}</h3>
            <p className="party-label">{r.party}</p>
            <p className="vote-count">🗳️ {r.votes} votes</p>
          </div>
        ))}
      </div>
    </section>
  );
}
