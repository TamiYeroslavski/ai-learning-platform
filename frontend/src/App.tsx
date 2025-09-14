import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import LoginSelection from './pages/LoginSelection';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSelection />} />
        <Route path="/register" element={<Register />} />
  <Route path="/admin-login" element={<AdminLogin />} />
  <Route path="/dashboard/:userId" element={<Dashboard />} />
  <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
