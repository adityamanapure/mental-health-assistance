import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoodTracker = () => {
    const [moods, setMoods] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/mood/mood-entries/')
            .then(response => setMoods(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Mood Tracker</h2>
            {moods.map(mood => (
                <p key={mood.id}>{mood.mood} - {mood.intensity}</p>
            ))}
        </div>
    );
};

export default MoodTracker;
