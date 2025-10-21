import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AdminPanel from './pages/AdminPanel';
import VotingPage from './pages/VotingPage';
import ResultsPage from './pages/ResultsPage';
import ChatPage from './pages/ChatPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/candidates' element={<AdminPanel />} />
        <Route path='/vote' element={<VotingPage />} />
        <Route path='/results' element={<ResultsPage />} />
        <Route path='/chat' element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}
