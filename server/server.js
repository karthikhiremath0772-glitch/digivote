const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const DB = path.join(__dirname, "..", "database");

// ✅ Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});

// ✅ Serve uploaded images
app.use('/images', express.static(path.join(__dirname, '..', 'client', 'public', 'images')));

// ✅ Utility functions
function readJSON(name) {
  const p = path.join(DB, name);
  if (!fs.existsSync(p)) return [];
  try {
    let raw = fs.readFileSync(p, "utf8") || "";
    if (raw.length && raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
    raw = raw.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "").trim();
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error("MALFORMED JSON in", p, e.message);
    return [];
  }
}

function writeJSON(name, data) {
  const p = path.join(DB, name);
  fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
}

// ✅ Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", time: new Date().toISOString() });
});

// ✅ Get candidates
app.get("/api/candidates", (req, res) => {
  try {
    const list = readJSON("candidates.json");
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Upload image
const upload = multer({
  dest: path.join(__dirname, "..", "client", "public", "images"),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ filename: req.file.filename });
});

// ✅ Update candidate
app.post("/api/candidates/update", (req, res) => {
  try {
    const updated = req.body;
    const list = readJSON("candidates.json");
    const index = list.findIndex(c => c.id === updated.id);
    if (index === -1) return res.status(404).json({ error: "Candidate not found" });
    list[index] = updated;
    writeJSON("candidates.json", list);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Vote
app.post("/api/vote", (req, res) => {
  try {
    const { voterId, candidateId } = req.body;
    if (!voterId || !candidateId) return res.status(400).json({ error: "Missing fields" });
    const votes = readJSON("votes.json");
    if (votes.find(v => v.voterId === voterId)) return res.status(400).json({ error: "Already voted" });
    votes.push({ voterId, candidateId, ts: Date.now() });
    writeJSON("votes.json", votes);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Results summary
app.get("/api/results/summary", (req, res) => {
  try {
    const votes = readJSON("votes.json");
    const candidates = readJSON("candidates.json");
    const counts = candidates.map(c => ({
      id: c.id,
      name: c.name,
      votes: votes.filter(v => v.candidateId === c.id).length
    }));
    res.json({ counts, totalVotes: votes.length });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server listening", PORT));
