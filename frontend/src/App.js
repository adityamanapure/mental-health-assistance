import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import SidebarToggle from './components/layout/SidebarToggle';
import Dashboard from './components/Dashboard';
import Registration from './components/auth/Registration';
import Login from './components/auth/Login';
import MoodTracker from './components/MoodTracker';
import JournalEditor from './components/JournalEditor';
import Chatbot from './components/Chatbot';

import './styles/App.css';

function App() {
    // Simple auth check - in a real app, you'd use context/state management
    const isAuthenticated = localStorage.getItem('token') !== null;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Router>
        <div className="app-container">
            {isAuthenticated && <Navbar />}
            <div className="content-wrapper">
                {isAuthenticated && (
                    <>
                        <Sidebar className={sidebarOpen ? 'visible' : 'collapsed'} />
                        <SidebarToggle isOpen={sidebarOpen} toggle={toggleSidebar} />
                        {!sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
                    </>
                )}
                <main className="main-content">
                        <Routes>
                            <Route path="/register" element={<Registration />} />
                            <Route path="/login" element={<Login />} />
                            <Route 
                                path="/dashboard" 
                                element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
                            />
                            <Route 
                                path="/mood-tracker" 
                                element={isAuthenticated ? <MoodTracker /> : <Navigate to="/login" />} 
                            />
                            <Route 
                                path="/journal" 
                                element={isAuthenticated ? <JournalEditor /> : <Navigate to="/login" />} 
                            />
                            <Route 
                                path="/chatbot" 
                                element={isAuthenticated ? <Chatbot /> : <Navigate to="/login" />} 
                            />
                            <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;

