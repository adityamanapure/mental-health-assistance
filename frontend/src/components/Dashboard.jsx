import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [moodData, setMoodData] = useState([]);
    const [journalEntries, setJournalEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        setUserName(localStorage.getItem('username') || 'User');
        
        const fetchDashboardData = async () => {
            try {
                const [moodResponse, journalResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/mood/mood-entries/'),
                    axios.get('http://localhost:8000/api/journal-entries/')
                ]);
                
                setMoodData(moodResponse.data.slice(0, 7));
                setJournalEntries(journalResponse.data.slice(0, 3));
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchDashboardData();
    }, []);

    // Calculate time of day greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    // Get current date in nice format
    const getCurrentDate = () => {
        return new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    // Generate sample mood data if API doesn't return any
    const generateMoodChart = () => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const moodColors = {
            'Great': '#4CAF50',
            'Good': '#8BC34A',
            'Okay': '#FFC107',
            'Low': '#FF9800',
            'Bad': '#F44336'
        };
        
        if (moodData.length === 0) {
            return (
                <div className="no-data-message">
                    <i className="far fa-frown"></i>
                    <p>No mood data recorded yet</p>
                    <Link to="/mood-tracker" className="action-button">
                        Track Your First Mood
                    </Link>
                </div>
            );
        }
        
        return (
            <div className="mood-chart">
                {moodData.map((entry, index) => (
                    <div className="chart-bar" key={index}>
                        <div 
                            className="mood-bar"
                            style={{
                                height: `${(entry.intensity / 5) * 100}%`,
                                backgroundColor: moodColors[entry.mood] || '#4CAF50'
                            }}
                        ></div>
                        <div className="day-label">{days[index % 7]}</div>
                    </div>
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading your wellness dashboard...</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div className="greeting-section">
                    <h1>{getGreeting()}, {userName}!</h1>
                    <p className="current-date">{getCurrentDate()}</p>
                </div>
                <div className="quick-actions">
                    <button className="action-button">
                        <i className="fas fa-plus"></i> New Journal Entry
                    </button>
                    <button className="action-button">
                        <i className="far fa-smile"></i> Log Mood
                    </button>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-card mood-summary-card">
                    <div className="card-header">
                        <h2><i className="far fa-smile"></i> Mood Trends</h2>
                        <Link to="/mood-tracker" className="view-all">View All</Link>
                    </div>
                    <div className="card-content">
                        {generateMoodChart()}
                    </div>
                </div>

                <div className="dashboard-card journal-summary-card">
                    <div className="card-header">
                        <h2><i className="fas fa-book"></i> Recent Journal Entries</h2>
                        <Link to="/journal" className="view-all">View All</Link>
                    </div>
                    <div className="card-content">
                        {journalEntries.length > 0 ? (
                            <div className="journal-entries-list">
                                {journalEntries.map((entry, index) => (
                                    <div className="journal-entry-card" key={index}>
                                        <div className="entry-header">
                                            <h3>{entry.title}</h3>
                                            <span className="entry-date">
                                                {new Date(entry.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="entry-preview">
                                            {entry.content.substring(0, 100)}...
                                        </p>
                                        <div className="entry-footer">
                                            <span className={`entry-status ${entry.is_draft ? 'draft' : 'published'}`}>
                                                {entry.is_draft ? 'Draft' : 'Published'}
                                            </span>
                                            <button className="read-more">Read More</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-data-message">
                                <i className="far fa-file-alt"></i>
                                <p>No journal entries yet</p>
                                <Link to="/journal" className="action-button">
                                    Write Your First Entry
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="dashboard-card wellbeing-tips-card">
                    <div className="card-header">
                        <h2><i className="fas fa-lightbulb"></i> Wellbeing Tips</h2>
                    </div>
                    <div className="card-content">
                        <div className="wellbeing-tip">
                            <div className="tip-icon">
                                <i className="fas fa-walking"></i>
                            </div>
                            <div className="tip-content">
                                <h3>Take a mindful walk</h3>
                                <p>Even 10 minutes of walking outside can boost your mood and energy levels.</p>
                            </div>
                        </div>
                        <div className="wellbeing-tip">
                            <div className="tip-icon">
                                <i className="fas fa-water"></i>
                            </div>
                            <div className="tip-content">
                                <h3>Stay hydrated</h3>
                                <p>Drinking enough water can improve concentration and reduce fatigue.</p>
                            </div>
                        </div>
                        <div className="wellbeing-tip">
                            <div className="tip-icon">
                                <i className="fas fa-bed"></i>
                            </div>
                            <div className="tip-content">
                                <h3>Prioritize sleep</h3>
                                <p>Aim for 7-9 hours of quality sleep for optimal physical and mental health.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-card quick-chat-card">
                    <div className="card-header">
                        <h2><i className="fas fa-comment-dots"></i> Wellness Assistant</h2>
                        <Link to="/chatbot" className="view-all">Full Chat</Link>
                    </div>
                    <div className="card-content">
                        <div className="chat-preview">
                            <div className="chat-message bot">
                                <div className="message-bubble">How are you feeling today?</div>
                            </div>
                            <div className="quick-responses">
                                <button>I'm feeling great!</button>
                                <button>I'm a bit stressed</button>
                                <button>I need some motivation</button>
                                <button>I want to talk about something</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;