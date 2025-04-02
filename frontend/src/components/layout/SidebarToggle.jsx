import React from 'react';
import '../../styles/Sidebar.css';

const SidebarToggle = ({ isOpen, toggle }) => {
  return (
    <button 
      className="sidebar-toggle"
      onClick={toggle}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
    >
      <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
    </button>
  );
};

export default SidebarToggle;