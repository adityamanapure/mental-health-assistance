import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username') || 'User';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <span className="logo">Mindful</span>
            </div>
            <div className="navbar-menu">
                <div className="search-bar">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="navbar-end">
                <div className="notifications">
                    <i className="far fa-bell"></i>
                </div>
                <div className="user-profile">
                    <img src={`https://ui-avatars.com/api/?name=${username}&background=random`} alt="profile" />
                    <div className="user-dropdown">
                        <span className="username">{username}</span>
                        <button className="logout-btn" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i> Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;