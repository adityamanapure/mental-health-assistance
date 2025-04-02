import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login/', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', formData.username);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to continue your journey to wellness</p>
                </div>
                {error && <div className="auth-error">{error}</div>}
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <div className="input-icon">
                            <i className="fas fa-user"></i>
                            <input 
                                type="text" 
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-icon">
                            <i className="fas fa-lock"></i>
                            <input 
                                type="password" 
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-options">
                        <label className="checkbox-container">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            Remember me
                        </label>
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                        
                    </button>
                </form>
                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/register">Register Now</Link></p>
                </div>
            </div>
            <div className="auth-image">
                <div className="overlay">
                    <div className="auth-quote">
                        <h2>"Peace of mind is not the absence of conflict, but the ability to cope with it."</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
