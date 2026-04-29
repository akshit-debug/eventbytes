import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventListing from './pages/EventListing';
import EventStream from './pages/EventStream';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventListing />} />
        <Route path="/event/:id" element={<EventStream />} />
      </Routes>
    </Router>
  );
}

export default App;
