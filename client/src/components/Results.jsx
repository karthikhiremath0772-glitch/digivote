import React, { useEffect, useState } from 'react';

export default function Results() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch('/api/results/summary')
      .then(r => r.json())
      .then(setSummary)
      .catch(() => setSummary({ counts: [], totalVotes: 0 }));
  }, []);

  if (!summary) return <p>Loading results…</p>;

  return (
    <section>
      <h2>Results</h2>
      <p>Total votes: {summary.totalVotes}</p>
      <ul>
        {summary.counts.map(c => (
          <li key={c.id}>{c.name}: {c.votes}</li>
        ))}
      </ul>
    </section>
  );
}
