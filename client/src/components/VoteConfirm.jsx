import React, { useState } from 'react';

export default function VoteConfirm({ candidate, onBack }) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const submitVote = () => {
    setLoading(true);
    fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        candidateId: candidate.id,
        voterId: 'demo-user-002' // ✅ Required by backend
      })
    })
      .then(async res => {
        const text = await res.text();
        if (!res.ok) {
          console.error("POST /api/vote failed", res.status, text);
          throw new Error("Vote failed: " + res.status);
        }
        try {
          const data = JSON.parse(text);
          const message = data.ok ? 'Vote recorded successfully!' : 'Vote submitted!';
          setStatus(message);

          // ✅ Optional: voice confirmation
          const msg = new SpeechSynthesisUtterance(message);
          msg.lang = 'en-IN';
          window.speechSynthesis.speak(msg);
        } catch (e) {
          console.error("Invalid JSON from /api/vote:", text);
          setStatus('Vote submitted, but response was invalid.');
        }
      })
      .catch(e => {
        console.error("Vote error:", e);
        setStatus(e.message || 'Vote failed.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <section>
      <h2>Confirm Your Vote</h2>
      <p>You selected: <strong>{candidate.name}</strong> ({candidate.party})</p>
      <button onClick={submitVote} disabled={loading}>Submit Vote</button>
      <button onClick={onBack} disabled={loading}>Back</button>
      {status && <p>{status}</p>}
    </section>
  );
}
