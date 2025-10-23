const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Critical for parsing JSON body

// ✅ Candidate list
app.get('/api/candidates', (req, res) => {
  res.json([
    { id: 'candidate-1', name: 'Alice Rao', party: 'Blue' },
    { id: 'candidate-2', name: 'Bhaskar N', party: 'Green' },
    { id: 'candidate-3', name: 'Chitra S', party: 'Red' }
  ]);
});

// ✅ Vote route with full logging
app.post('/api/vote', (req, res) => {
  console.log('Received vote request');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);

  const { candidateId } = req.body;
  if (!candidateId) {
    console.log('❌ Missing candidateId');
    return res.status(400).json({ error: 'Missing candidateId' });
  }

  // ✅ Save vote to votes.json
  const votesPath = path.join(__dirname, '../database/votes.json');
  const votes = fs.existsSync(votesPath)
    ? JSON.parse(fs.readFileSync(votesPath, 'utf-8'))
    : [];

  votes.push({ candidateId, timestamp: Date.now() });
  fs.writeFileSync(votesPath, JSON.stringify(votes, null, 2));

  console.log('✅ Vote recorded for:', candidateId);
  res.json({ message: 'Vote recorded successfully!' });
});

// ✅ Results summary route (used by frontend)
app.get('/api/results/summary', (req, res) => {
  const votesPath = path.join(__dirname, '../database/votes.json');
  const candidatesPath = path.join(__dirname, '../database/candidates.json');

  const votes = fs.existsSync(votesPath)
    ? JSON.parse(fs.readFileSync(votesPath, 'utf-8'))
    : [];

  const candidates = fs.existsSync(candidatesPath)
    ? JSON.parse(fs.readFileSync(candidatesPath, 'utf-8'))
    : [];

  const counts = candidates.map(c => ({
    id: c.id,
    name: c.name,
    votes: votes.filter(v => v.candidateId === c.id).length
  }));

  res.json({
    counts,
    totalVotes: votes.length
  });
});

// ✅ Start server
const PORT = 4004;
app.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});
