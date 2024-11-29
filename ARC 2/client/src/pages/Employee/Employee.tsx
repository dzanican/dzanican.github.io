import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../../components/layout/Layout/Layout';
import Activity from './Activity/Activity';
import WeeklyUtilization from './WeeklyUtilization/WeeklyUtilization';
import CustomerService from './CustomerService/CustomerService';
import Reports from './Reports/Reports';
import './Employee.css';

// Placeholder component for dashboard
const Dashboard = () => <div>Dashboard Content</div>;

const Employee: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/utilization" element={<WeeklyUtilization />} />
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Layout>
  );
};

export default Employee;
