import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import PropTypes from 'prop-types';
import '../styles/default.css';

const NavigationMenu = ({ theme, isMenuOpen, setIsMenuOpen, logoLight, logoDark }) => {
    const [activeSubmenuIndex, setActiveSubmenuIndex] = useState(null);
    const menuBtnRef = useRef(null);
    const closeBtnRef = useRef(null);

    // Toggle submenu functionality
    const toggleSubmenu = (index, e) => {
        e.preventDefault();
        setActiveSubmenuIndex(prevIndex => prevIndex === index ? null : index);
    };

    // Animation for menu button
    useEffect(() => {
        if (menuBtnRef.current) {
            anime({
                targets: menuBtnRef.current,
                rotate: isMenuOpen ? 180 : 0,
                duration: 200,
                easing: 'easeInOutQuad'
            });
        }
    }, [isMenuOpen]);

    // Initial menu button animation
    useEffect(() => {
        anime({
            targets: menuBtnRef.current,
            scale: [0, 1],
            rotate: [180, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: 200,
            easing: 'easeOutElastic(1, .5)'
        });
    }, []);

    // Toggle menu function
    const handleMenuToggle = () => {
        setIsMenuOpen(prev => !prev);
    };

    // Close the menu
    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* Menu Toggle Button */}
            <button 
                id="menu-btn"
                ref={menuBtnRef}
                className="menu-toggle" 
                onClick={handleMenuToggle}
                aria-label="Open menu"
            >
                <span className="material-symbols-outlined">menu</span>
            </button>

            {/* Sidebar Menu */}
            <nav id="main-menu" className={`vertical-menu ${isMenuOpen ? 'active' : ''}`}>
                <img 
                    id="menu-logo" 
                    src={theme === "dark-theme" ? logoDark : logoLight} 
                    alt="Menu Logo"
                />
                
                <ul>
                    <li className={`has-submenu ${activeSubmenuIndex === 0 ? 'active' : ''}`}>
                        <a href="#bill-system" onClick={(e) => toggleSubmenu(0, e)}>
                            Bill System
                        </a>
                        <ul className={`submenu ${activeSubmenuIndex === 0 ? 'active' : ''}`}>
                            <li><a href="./new-bill">Generate New Bill</a></li>
                            <li><a href="./view-bill">View/Edit Bills</a></li>
                            <li><a href="./payment-history">Payment History</a></li>
                        </ul>
                    </li>
                    
                    <li className={`has-submenu ${activeSubmenuIndex === 1 ? 'active' : ''}`}>
                        <a href="#inventory" onClick={(e) => toggleSubmenu(1, e)}>
                            Menu
                        </a>
                        <ul className={`submenu ${activeSubmenuIndex === 1 ? 'active' : ''}`}>
                            <li><a href="./view-menu">View Menu</a></li>
                            <li><a href="./update-menu">Update Menu</a></li>
                        </ul>
                    </li>
                    
                    <li>
                        <a href="./reports">Reports & Analytics</a>
                    </li>
                </ul>
                
                {/* Close Button */}
                <button
                    ref={closeBtnRef}
                    id="menu-close"
                    className={`menu-close-button ${isMenuOpen ? 'visible' : ''}`}
                    onClick={handleMenuClose}
                    aria-label="Close menu"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </nav>
        </>
    );
};

NavigationMenu.propTypes = {
    theme: PropTypes.string.isRequired,
    isMenuOpen: PropTypes.bool.isRequired,
    setIsMenuOpen: PropTypes.func.isRequired,
    logoLight: PropTypes.string.isRequired,
    logoDark: PropTypes.string.isRequired
};

export default NavigationMenu;
