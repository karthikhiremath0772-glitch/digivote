import React, { useState } from 'react';
import './VotingChatbot.css';

export default function VotingChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    const botMsg = { role: 'bot', content: data.reply };
    setMessages(prev => [...prev, botMsg]);
    setInput('');
  };

  return (
    <div className="chatbox">
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>💬 Voting Assistant</h3>
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={m.role}>{m.content}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask about voting..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
