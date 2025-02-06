import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBudget from './pages/CreateBudget';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-budget" element={<CreateBudget />} />
      </Routes>
    </Router>
  );
}

export default App;
