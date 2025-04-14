import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

// Create Theme Context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Get the theme from localStorage or use dark-theme as default
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'dark-theme';
        }
        return 'light-theme';
    });

    // Effect to apply theme to body element and store in localStorage
    useEffect(() => {
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(theme);
        
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
        }
        
        return () => {
            document.body.classList.remove(theme);
        };
    }, [theme]);

    // Function to toggle between themes
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === "dark-theme" ? "light-theme" : "dark-theme");
    };

    // Context value
    const value = {
        theme,
        setTheme,
        toggleTheme,
        isDarkTheme: theme === 'dark-theme'
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ThemeProvider;