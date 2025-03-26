import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/auth/Registration';
import MoodTracker from './components/MoodTracker';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Registration />} />
                <Route path="/mood-tracker" element={<MoodTracker />} />
            </Routes>
        </Router>
    );
}

export default App;
