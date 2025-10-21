import React, { useEffect, useState } from 'react';
import ResultsChart from '../components/ResultsChart';

export default function ResultsPage() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/results/summary')
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(e => setError(e.message || 'Failed to load results'));
  }, []);

  const announceResults = () => {
    if (!summary || !summary.counts) return;

    const winner = summary.counts.reduce((max, c) =>
      c.votes > max.votes ? c : max, summary.counts[0]
    );

    const intro = "Are you guys ready to see the results?";
    const voteLines = summary.counts
      .map(c => `${c.name} received ${c.votes} votes`)
      .join(', ');
    const finale = `Congratulations to ${winner.name}, who received ${winner.votes} votes — the highest among all candidates!`;

    const fullMessage = `${intro} ${voteLines}. ${finale}`;

    const msg = new SpeechSynthesisUtterance(fullMessage);
    msg.lang = 'en-IN'; // Optional: use 'kn-IN' for Kannada
    msg.rate = 1;
    msg.pitch = 1;
    window.speechSynthesis.speak(msg);
  };

  if (error) return <p>Error: {error}</p>;
  if (!summary) return <p>Loading results…</p>;

  return (
    <section>
      <h2>📊 Results Dashboard</h2>
      <p>Total Votes: {summary.totalVotes}</p>
      <ResultsChart data={summary.counts} />
      <button onClick={announceResults} style={{
        marginTop: '1rem',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '6px'
      }}>
        🔊 Announce Results
      </button>
    </section>
  );
}
