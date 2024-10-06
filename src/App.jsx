import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signin from './pages/Signin';
import Dashboard from './component/Dashboard';
import Home from './pages/Home';
import UserProfile from './component/UserProfile';
import ForgotPassword from './component/ForgotPassword';
import RegisterForm from './component/RegisterForm';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token exists
  return token ? children : <Navigate to="/" replace />; // Redirect to Signin if no token
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        
        {/* Protected Routes */}
        <Route
          path="/registerform"
          element={
           
              <RegisterForm />
           
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-resume"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

