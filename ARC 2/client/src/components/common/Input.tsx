import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input className="input-field" {...props} />
    </div>
  );
};

export default Input;
