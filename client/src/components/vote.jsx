<div
  key={c.id}
  className={`candidate-card ${selectedId === c.id ? 'selected' : ''}`}
  onClick={() => setSelectedId(c.id)}
>
  <div className="card-content">
    <img src={`/images/${c.photo}`} alt="Candidate" className="candidate-photo" />

    <div className="text-block">
      <h3>{c.name}</h3>
      <p className="party-label">Party: {c.party}</p>
      <p className="animated-label">{c.description}</p>
    </div>
  </div>

  <button className="vote-btn">🗳️ Submit Vote</button>
</div>

