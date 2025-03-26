import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/auth/register/', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Registration failed', error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})}/>
            <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})}/>
            <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})}/>
            <button type="submit">Register</button>
        </form>
    );
};

export default Registration;
