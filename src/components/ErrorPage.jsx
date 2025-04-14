// src/components/ErrorPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f4f4f9',
        color: '#333',
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        gap: '10px',
    };

    const errorCodeStyle = {
        fontSize: '96px',
        fontWeight: 'bold',
        color: '#ff1111',
        margin: '0',
    };

    const errorMessageStyle = {
        fontSize: '20px',
        color: '#555',
        margin: '0',
    };

    const homeLinkStyle = {
        display: 'inline-block',
        padding: '10px 20px',
        background: '#6366f1',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        transition: 'background 0.3s ease',
        fontWeight: 'bold',
        marginTop: '15px',
    };

    const homeLinkHoverStyle = {
        background: '#3b7bbf',
    };

    return (
        <div style={containerStyle}>
            <h1 style={errorCodeStyle}>404</h1>
            <p style={errorMessageStyle}>Oops! Page Not Found.</p>
            <Link to="/" style={homeLinkStyle} onMouseOver={e => e.currentTarget.style.background = homeLinkHoverStyle.background} onMouseOut={e => e.currentTarget.style.background = '#4a90e2'}>
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
