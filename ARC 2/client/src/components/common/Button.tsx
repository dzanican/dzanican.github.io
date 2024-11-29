import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, fullWidth, ...props }) => {
  return (
    <button 
      className={`button ${fullWidth ? 'full-width' : ''}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
