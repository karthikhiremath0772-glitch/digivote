const express = require('express');
const cors = require('cors');
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

  console.log('✅ Vote received for:', candidateId);
  res.json({ message: 'Vote recorded successfully!' });
});

// ✅ Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});
