import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple role check based on username
    if (username === 'FSE123') {
      localStorage.setItem('role', 'employee');
      navigate('/employee');
    } else if (username === 'FSM123') {
      localStorage.setItem('role', 'manager');
      navigate('/manager');
    } else {
      setError('Invalid credentials. Use FSE123 for employee or FSM123 for manager view.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Employee Utilization Tracker</h1>
        <p className="login-subtitle">Login to your account</p>
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="error-message">{error}</div>}
          
          <Button type="submit" fullWidth>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
