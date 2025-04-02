// components/MoodTracker.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MoodTracker.css';

const MoodTracker = () => {
    const [moods, setMoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newMood, setNewMood] = useState({
        mood: '',
        intensity: 3,
        notes: ''
    });
    const [showMoodForm, setShowMoodForm] = useState(false);
    const [filterPeriod, setFilterPeriod] = useState('week');

    const moodOptions = [
        { value: 'Great', icon: '😁', color: '#4CAF50' },
        { value: 'Good', icon: '🙂', color: '#8BC34A' },
        { value: 'Okay', icon: '😐', color: '#FFC107' },
        { value: 'Low', icon: '😔', color: '#FF9800' },
        { value: 'Bad', icon: '😞', color: '#F44336' }
    ];

    useEffect(() => {
        fetchMoods();
    }, [filterPeriod]);

    const fetchMoods = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/mood/mood-entries/?period=${filterPeriod}`);
            setMoods(response.data);
        } catch (error) {
            console.error('Failed to fetch mood data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMoodChange = (mood) => {
        setNewMood({ ...newMood, mood: mood });
    };

    const handleIntensityChange = (e) => {
        setNewMood({ ...newMood, intensity: parseInt(e.target.value) });
    };

    const handleNotesChange = (e) => {
        setNewMood({ ...newMood, notes: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/mood/mood-entries/', newMood);
            setNewMood({ mood: '', intensity: 3, notes: '' });
            setShowMoodForm(false);
            fetchMoods();
        } catch (error) {
            console.error('Failed to save mood', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const getMoodIcon = (moodValue) => {
        const mood = moodOptions.find(m => m.value === moodValue);
        return mood ? mood.icon : '😐';
    };

    const getMoodColor = (moodValue) => {
        const mood = moodOptions.find(m => m.value === moodValue);
        return mood ? mood.color : '#FFC107';
    };

    if (loading && moods.length === 0) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading your mood history...</p>
            </div>
        );
    }

    return (
        <div className="mood-tracker-container">
            <div className="mood-tracker-header">
                <div className="header-content">
                    <h1>Mood Tracker</h1>
                    <p>Track how you feel to recognize patterns in your emotional wellbeing</p>
                </div>
                <button 
                    className="add-mood-button"
                    onClick={() => setShowMoodForm(!showMoodForm)}
                >
                    {showMoodForm ? 'Cancel' : 'Log New Mood'}
                </button>
            </div>

            {showMoodForm && (
                <div className="mood-form-container">
                    <form onSubmit={handleSubmit} className="mood-form">
                        <h2>How are you feeling right now?</h2>
                        <div className="mood-selector">
                            {moodOptions.map((option) => (
                                <button
                                    type="button"
                                    key={option.value}
                                    className={`mood-option ${newMood.mood === option.value ? 'selected' : ''}`}
                                    style={{ backgroundColor: newMood.mood === option.value ? option.color : 'transparent' }}
                                    onClick={() => handleMoodChange(option.value)}
                                >
                                    <span className="mood-icon">{option.icon}</span>
                                    <span className="mood-label">{option.value}</span>
                                </button>
                            ))}
                        </div>
                        
                        <div className="form-group">
                            <label>Intensity:</label>
                            <div className="slider-container">
                                <input 
                                    type="range" 
                                    min="1" 
                                    max="5" 
                                    value={newMood.intensity}
                                    onChange={handleIntensityChange}
                                    className="intensity-slider"
                                />
                                <div className="slider-labels">
                                    <span>Mild</span>
                                    <span>Moderate</span>
                                    <span>Strong</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label>Notes (optional):</label>
                            <textarea 
                                value={newMood.notes}
                                onChange={handleNotesChange}
                                placeholder="What's contributing to this feeling? Any triggers or observations?"
                                rows="3"
                            ></textarea>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="submit-mood-button"
                            disabled={!newMood.mood}
                        >
                            Save Mood
                        </button>
                    </form>
                </div>
            )}

            <div className="mood-filter-container">
                <div className="filter-options">
                    <button 
                        className={filterPeriod === 'week' ? 'active' : ''} 
                        onClick={() => setFilterPeriod('week')}
                    >
                        This Week
                    </button>
                    <button 
                        className={filterPeriod === 'month' ? 'active' : ''} 
                        onClick={() => setFilterPeriod('month')}
                    >
                        This Month
                    </button>
                    <button 
                        className={filterPeriod === 'year' ? 'active' : ''} 
                        onClick={() => setFilterPeriod('year')}
                    >
                        This Year
                    </button>
                </div>
            </div>

            <div className="mood-timeline">
                {moods.length > 0 ? (
                    moods.map((mood, index) => (
                        <div 
                            className="mood-entry" 
                            key={index}
                            style={{ borderLeftColor: getMoodColor(mood.mood) }}
                        >
                            <div className="mood-entry-icon" style={{ backgroundColor: getMoodColor(mood.mood) }}>
                                {getMoodIcon(mood.mood)}
                            </div>
                            <div className="mood-entry-content">
                                <div className="mood-entry-header">
                                    <h3>{mood.mood}</h3>
                                    <span className="mood-timestamp">{formatDate(mood.created_at)}</span>
                                </div>
                                <div className="mood-details">
                                    <span className="mood-intensity">Intensity: {mood.intensity}/5</span>
                                    {mood.notes && (
                                        <p className="mood-notes">{mood.notes}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">📊</div>
                        <h3>No mood entries found</h3>
                        <p>Start tracking your moods to see them appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoodTracker;