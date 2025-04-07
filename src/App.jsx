import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';   // Import HomePage
import SignUpPage from './pages/SignUpPage'; // Import AboutPage
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />       {/* Home route */}
          <Route path="/SignUpPage" element={<SignUpPage />} /> {/* SignUpPageroute */}
          <Route path="/Dashboard" element={<Dashboard />} />   {/* Dashboard */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
