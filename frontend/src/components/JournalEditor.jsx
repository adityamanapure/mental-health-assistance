import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JournalEditor = () => {
    const [entries, setEntries] = useState([]);
    const [currentEntry, setCurrentEntry] = useState({
        title: '',
        content: '',
        is_draft: false
    });

    useEffect(() => {
        const fetchJournalEntries = async () => {
            try {
                const response = await axios.get('/api/journal-entries/');
                setEntries(response.data);
            } catch (error) {
                console.error('Failed to fetch journal entries', error);
            }
        };
        fetchJournalEntries();
    }, []);

    const handleSaveEntry = async (isDraft = false) => {
        try {
            const entryData = { ...currentEntry, is_draft: isDraft };
            const response = await axios.post('/api/journal-entries/', entryData);
            setEntries([response.data, ...entries]);
            setCurrentEntry({ title: '', content: '', is_draft: false });
        } catch (error) {
            console.error('Failed to save journal entry', error);
        }
    };

    return (
        <div>
            <h2>Journal</h2>
            <input 
                placeholder="Entry Title"
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry({...currentEntry, title: e.target.value})}
            />
            <textarea 
                placeholder="Write your thoughts..."
                value={currentEntry.content}
                onChange={(e) => setCurrentEntry({...currentEntry, content: e.target.value})}
            />
            <div>
                <button onClick={() => handleSaveEntry(false)}>Publish</button>
                <button onClick={() => handleSaveEntry(true)}>Save Draft</button>
            </div>

            <div>
                <h3>Your Entries</h3>
                {entries.map(entry => (
                    <div key={entry.id}>
                        <h4>{entry.title}</h4>
                        <p>{entry.content}</p>
                        <small>{entry.is_draft ? 'Draft' : 'Published'}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JournalEditor;
