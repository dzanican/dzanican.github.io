import React from 'react';
import { NavLink } from 'react-router-dom';
import profileImage from '../../../assets/profile-default.svg';
import './Sidebar.css';

interface SidebarProps {
  name: string;
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ name, role }) => {
  return (
    <div className="sidebar">
      <div className="profile-section">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <div className="profile-info">
          <span className="profile-name">{name}</span>
          <span className="profile-role">{role}</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink 
          to="/employee"
          className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          end
        >
          <i className="fas fa-chart-line"></i>
          Dashboard
        </NavLink>
        <NavLink 
          to="/employee/activity"
          className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
        >
          <i className="fas fa-tasks"></i>
          Activity
        </NavLink>
        <NavLink 
          to="/employee/utilization"
          className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
        >
          <i className="fas fa-clock"></i>
          Weekly Utilization
        </NavLink>
        <NavLink 
          to="/employee/customer-service"
          className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
        >
          <i className="fas fa-headset"></i>
          Customer Service
        </NavLink>
        <NavLink 
          to="/employee/reports"
          className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
        >
          <i className="fas fa-file-alt"></i>
          My Reports
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
