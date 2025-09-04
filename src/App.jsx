// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TouristEmergencySimulation from "./inactive";
import TouristSafetySystem from "./approval";
import BlockchainTouristID from "./issueID";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TouristSafetySystem />} />
        <Route path="/safety" element={<TouristSafetySystem />} />
        <Route path="/emergency" element={<TouristEmergencySimulation />} />
        <Route path="/issueid" element={<BlockchainTouristID/>} />
      </Routes>
    </Router>
  );
}

export default App;
