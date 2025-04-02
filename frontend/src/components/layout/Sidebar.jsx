import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>Menu</h3>
            </div>
            <ul className="sidebar-menu">
                <li>
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                        <i className="fas fa-home"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/mood-tracker" className={({ isActive }) => isActive ? 'active' : ''}>
                        <i className="far fa-smile"></i>
                        <span>Mood Tracker</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/journal" className={({ isActive }) => isActive ? 'active' : ''}>
                        <i className="fas fa-book"></i>
                        <span>Journal</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/chatbot" className={({ isActive }) => isActive ? 'active' : ''}>
                        <i className="fas fa-comment-dots"></i>
                        <span>Wellbeing Assistant</span>
                    </NavLink>
                </li>
            </ul>
            <div className="sidebar-footer">
                <div className="help-card">
                    <i className="fas fa-hands-helping"></i>
                    <h4>Need help?</h4>
                    <p>Our support team is ready to assist you</p>
                    <button>Contact Support</button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;