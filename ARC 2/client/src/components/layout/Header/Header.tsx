import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  showUtilizationWarning?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showUtilizationWarning = false }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <header className="header">
      {showUtilizationWarning && (
        <div className="utilization-warning">
          <i className="fas fa-exclamation-triangle"></i>
          Utilization is below the target threshold.
        </div>
      )}
      <div className="header-actions">
        <button onClick={handleLogout} className="logout-button">
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
