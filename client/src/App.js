import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConflictDetailPage from './pages/ConflictDetailPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/conflict/:id" element={<ConflictDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
