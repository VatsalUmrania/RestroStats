import { useState } from 'react';
import PropTypes from 'prop-types';

const HeaderContainer = ({ theme, toggleTheme, logoLight, logoDark }) => {
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    
    // Close dropdown when clicking outside
    const handleClickOutside = (e) => {
        if (!e.target.closest('#user-btn') && isAccountDropdownOpen) {
            setIsAccountDropdownOpen(false);
        }
    };

    // Add event listener for outside clicks when dropdown is open
    if (typeof window !== 'undefined' && isAccountDropdownOpen) {
        window.addEventListener('click', handleClickOutside);
    }

    return (
        <div className="container">
            <a href="/home">
                <img 
                    id="logo" 
                    src={theme === "dark-theme" ? logoDark : logoLight} 
                    alt="Restrostat Logo"
                />
            </a>
            
            <div className="header-controls">
                <button 
                    id="theme-btn" 
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                        {theme === "dark-theme" ? 'light_mode' : 'dark_mode'}
                    </span>
                </button>
                
                <div className="account">
                    <button 
                        id="user-btn" 
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsAccountDropdownOpen(!isAccountDropdownOpen);
                        }}
                        aria-label="User account"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>account_circle</span>
                        <span className="notification-dot"></span>
                    </button>
                    
                    <div id="accountDropdown" className={`account-dropdown ${isAccountDropdownOpen ? 'active' : ''}`}>
                        <a href="#account-info">
                            <span className="material-symbols-outlined">info</span>
                            Account Info
                        </a>
                        <a href="#logout">
                            <span className="material-symbols-outlined">logout</span>
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

HeaderContainer.propTypes = {
    theme: PropTypes.string.isRequired,
    toggleTheme: PropTypes.func.isRequired,
    logoLight: PropTypes.string.isRequired,
    logoDark: PropTypes.string.isRequired
};

export default HeaderContainer;