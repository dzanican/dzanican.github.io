import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar name="John Smith" role="Software Engineer" />
      <div className="main-content">
        <Header showUtilizationWarning={true} />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
