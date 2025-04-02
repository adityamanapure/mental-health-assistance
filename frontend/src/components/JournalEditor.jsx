import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/JournalEditor.css';

const JournalEditor = () => {
    const [entries, setEntries] = useState([]);
    const [currentEntry, setCurrentEntry] = useState({
        title: '',
        content: '',
        is_draft: false
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [savingAsDraft, setSavingAsDraft] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Create API instance - move outside the component or use useMemo
    const api = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    // Use useCallback to memoize the fetch function
    const fetchJournalEntries = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await api.get('/journal/journal-entries/');
            setEntries(response.data);
        } catch (error) {
            console.error('Failed to fetch journal entries', error.response?.data || error.message);
            setError('Failed to load journal entries. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [api]); // Include api in dependencies

    useEffect(() => {
        fetchJournalEntries();
    }, [fetchJournalEntries]); // Now depend on the memoized function

    const handleSaveEntry = async (isDraft = false) => {
        // Validate form
        if (!currentEntry.title.trim()) {
            setError('Please enter a title for your journal entry');
            return;
        }
        if (!currentEntry.content.trim()) {
            setError('Please write something in your journal entry');
            return;
        }

        setError('');
        setSaving(true);
        setSavingAsDraft(isDraft);
        try {
            const entryData = { ...currentEntry, is_draft: isDraft };
            const response = await api.post('/journal/journal-entries/', entryData);
            setEntries([response.data, ...entries]);
            setCurrentEntry({ title: '', content: '', is_draft: false });
            setSuccessMessage(`Journal entry ${isDraft ? 'saved as draft' : 'published'} successfully!`);
            
            // Clear success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Failed to save journal entry', error.response?.data || error.message);
            setError(error.response?.data?.detail || 'Failed to save journal entry. Please try again.');
        } finally {
            setSaving(false);
            setSavingAsDraft(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const truncateContent = (content, maxLength = 150) => {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + '...';
    };

    return (
        <div className="journal-container">
            <div className="journal-editor">
                <h2>My Journal</h2>
                <p className="journal-subtitle">Write down your thoughts, feelings, and experiences</p>
                
                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                
                <div className="journal-form">
                    <input 
                        className="journal-title-input"
                        placeholder="Entry Title"
                        value={currentEntry.title}
                        onChange={(e) => setCurrentEntry({...currentEntry, title: e.target.value})}
                    />
                    <textarea 
                        className="journal-content-textarea"
                        placeholder="Write your thoughts..."
                        value={currentEntry.content}
                        onChange={(e) => setCurrentEntry({...currentEntry, content: e.target.value})}
                        rows={10}
                    />
                    <div className="journal-actions">
                        <button 
                            className="save-draft-btn" 
                            onClick={() => handleSaveEntry(true)}
                            disabled={saving}
                        >
                            {saving && savingAsDraft ? 'Saving...' : 'Save Draft'}
                        </button>
                        <button 
                            className="publish-btn" 
                            onClick={() => handleSaveEntry(false)}
                            disabled={saving}
                        >
                            {saving && !savingAsDraft ? 'Publishing...' : 'Publish Entry'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="journal-entries">
                <h3>Your Journal Entries</h3>
                
                {loading ? (
                    <div className="loading-spinner">Loading entries...</div>
                ) : entries.length === 0 ? (
                    <div className="no-entries-message">
                        <i className="fas fa-book-open"></i>
                        <p>No journal entries yet. Start writing your thoughts!</p>
                    </div>
                ) : (
                    <div className="entries-list">
                        {entries.map(entry => (
                            <div key={entry.id} className={`entry-card ${entry.is_draft ? 'draft' : 'published'}`}>
                                <div className="entry-header">
                                    <h4>{entry.title}</h4>
                                    <span className={`entry-status ${entry.is_draft ? 'draft-status' : 'published-status'}`}>
                                        {entry.is_draft ? 'Draft' : 'Published'}
                                    </span>
                                </div>
                                <p className="entry-content">{truncateContent(entry.content)}</p>
                                <div className="entry-footer">
                                    <small className="entry-date">{formatDate(entry.created_at)}</small>
                                    <button className="read-more-btn">Read More</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JournalEditor;