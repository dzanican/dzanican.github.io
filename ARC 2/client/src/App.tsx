import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Employee from './pages/Employee/Employee';
import Manager from './pages/Manager/Manager';
import './App.css';

// Protected Route component
const ProtectedRoute: React.FC<{
  element: React.ReactElement;
  allowedRole: string;
}> = ({ element, allowedRole }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return element;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/employee/*"
            element={
              <ProtectedRoute
                element={<Employee />}
                allowedRole="employee"
              />
            }
          />
          <Route
            path="/manager/*"
            element={
              <ProtectedRoute
                element={<Manager />}
                allowedRole="manager"
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
