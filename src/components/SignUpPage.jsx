import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom ';
import axios from 'axios ';
import '../styles/SignupPage.css';
import logoLight from '../assets/logo_light_2.jpg';

const SignupPage = () => {
    const [stage, setStage] = useState(1);
    const [progress, setProgress] = useState(0);
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [isConfirmTouched, setIsConfirmTouched] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        businessName: '',
        businessType: '',
        annualRevenue: '',
        numberOfEmployees: ''
    });
    const [error, setError] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formattedDateTime = now.toLocaleDateString('en-CA') + ' ' + now.toTimeString().split(' ')[0];
            setCurrentDateTime(formattedDateTime);
        };

        updateDateTime();
        const timer = setInterval(updateDateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    const calculateProgress = () => {
        const stageFields = {
            1: ['email', 'password', 'confirmPassword', 'username'],
            2: ['businessName', 'businessType', 'annualRevenue', 'numberOfEmployees']
        };

        const currentFields = stageFields[stage];
        const filledFields = currentFields.filter(field => formData[field].trim() !== '').length;
        return (filledFields / currentFields.length) * 100;
    };

    useEffect(() => {
        setProgress(calculateProgress());
    }, [formData, stage]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const passwordMatch = formData.password === formData.confirmPassword;

    const handleNext = (e) => {
        e.preventDefault();
        if (!passwordMatch) {
            alert("Passwords do not match. Please ensure both fields are identical.");
            return;
        }
        setIsConfirmTouched(false);
        setStage(2);
    };

    const handleBack = (e) => {
        e.preventDefault();
        setStage(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                ...formData,
                annualRevenue: parseFloat(formData.annualRevenue),
                numberOfEmployees: parseInt(formData.numberOfEmployees)
            });

            if (response.data.success) {
                setShowSuccessPopup(true);
                setTimeout(() => navigate('/home'), 2000);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <img id="logo" src={logoLight} alt="Restrostat Logo" />

                <div className="signup-header">
                    <h2>Create Your Account</h2>
                    <p className="subtitle">Join us today and start managing your business</p>
                    <div className="progress-container">
                        <div className="progress-steps">
                            <div className={`step ${stage >= 1 ? 'active' : ''}`}>
                                <div className="step-circle">1</div>
                                <span>Account Details</span>
                            </div>
                            <div className="progress-line">
                                <div className={`line ${stage === 2 ? 'active' : ''}`}></div>
                            </div>
                            <div className={`step ${stage === 2 ? 'active' : ''}`}>
                                <div className="step-circle">2</div>
                                <span>Business Info</span>
                            </div>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}>
                                <span className="progress-text">{Math.round(progress)}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {stage === 1 && (
                    <form onSubmit={handleNext} className="signup-form">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    placeholder="Choose a username"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-wrapper">
                                    <input
                                        type="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className="input-wrapper">
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={() => setIsConfirmTouched(true)}
                                        required
                                        placeholder="Confirm your password"
                                        className={isConfirmTouched && !passwordMatch ? 'input-error' : ''}
                                    />
                                </div>
                            </div>
                        </div>

                        {isConfirmTouched && !passwordMatch && (
                            <p className="error-message">Passwords do not match</p>
                        )}

                        <button
                            type="submit"
                            className="next-button"
                            disabled={!passwordMatch}
                        >
                            Continue to Business Info
                            <span className="button-icon">→</span>
                        </button>
                    </form>
                )}

                {stage === 2 && (
                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="form-group">
                            <label htmlFor="businessName">Business Name</label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    id="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your business name"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="businessType">Business Type</label>
                            <div className="input-wrapper">
                                <select
                                    id="businessType"
                                    value={formData.businessType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select business type</option>
                                    <option value="restaurant">Restaurant</option>
                                    <option value="cafe">Cafe</option>
                                    <option value="bar">Bar</option>
                                    <option value="hotel">Hotel</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="annualRevenue">Annual Revenue ($)</label>
                                <div className="input-wrapper">
                                    <input
                                        type="number"
                                        id="annualRevenue"
                                        value={formData.annualRevenue}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter annual revenue"
                                        min="0"
                                        step="1000"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="numberOfEmployees">Employees</label>
                                <div className="input-wrapper">
                                    <input
                                        type="number"
                                        id="numberOfEmployees"
                                        value={formData.numberOfEmployees}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter employee count"
                                        min="1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="button-group">
                            <button type="button" onClick={handleBack} className="back-button">
                                <span className="button-icon">←</span>
                                Back
                            </button>
                            <button type="submit" className="submit-button">
                                Create Account
                                <span className="button-icon">✓</span>
                            </button>
                        </div>
                    </form>
                )}

                {error && <div className="error-message">{error}</div>}
            </div>

            {showSuccessPopup && (
                <div className="success-popup-overlay">
                    <div className="success-popup">
                        <div className="success-icon">✓</div>
                        <h3>Account Created Successfully!</h3>
                        <p>Redirecting to dashboard...</p>
                    </div>
                </div>
            )}

            <div className="current-time">{currentDateTime}</div>
        </div>
    );
};

export default SignupPage;