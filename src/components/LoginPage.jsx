import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/LoginPage.css';
import logoLight from '../assets/logo_light_2.jpg';
import logoDark from '../assets/logo_dark_2.jpg';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light-theme';
        setIsDarkTheme(savedTheme === 'dark-theme');
        document.body.className = savedTheme;
    }, []);

    const toggleTheme = () => {
        const newTheme = isDarkTheme ? 'light-theme' : 'dark-theme';
        setIsDarkTheme(!isDarkTheme);
        document.body.className = newTheme;
        localStorage.setItem('theme', newTheme);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/home');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className={`auth-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
            <div className="login-card">
                <img 
                    id="logo" 
                    src={isDarkTheme ? logoDark : logoLight} 
                    alt="Restrostat Logo"
                />
                
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-field">
                            <span className="material-symbols-outlined">mail</span>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-field">
                            <span className="material-symbols-outlined">lock</span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                placeholder="Enter your password"
                            />
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                <span className="material-symbols-outlined">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}

                    <div className="auth-options">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span>Remember me</span>
                        </label>
                        <a href="#forgot-password" className="forgot-password">
                            Forgot Password?
                        </a>
                    </div>

                    <div className="button-container">
                        <button type="submit" className="auth-button">
                            <span className="material-symbols-outlined">login</span>
                            Sign In
                        </button>
                        <button 
                            type="button" 
                            className="auth-button signup-button"
                            onClick={() => navigate('/sign-up')}
                        >
                            <span className="material-symbols-outlined">person_add</span>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>

            <button 
                id="theme-btn" 
                className="auth-theme-toggle" 
                onClick={toggleTheme}
                aria-label="Toggle theme"
            >
                <span className="material-symbols-outlined">
                    {isDarkTheme ? 'light_mode' : 'dark_mode'}
                </span>
            </button>
        </div>
    );
};

export default LoginPage;