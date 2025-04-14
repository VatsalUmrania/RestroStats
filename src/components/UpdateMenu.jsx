import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import '../styles/update_menu.css';
import logoLight from '../assets/logo_light_2.jpg';
import logoDark from '../assets/logo_dark_1.jpg';
import HeaderContainer from './HeaderContainer';
import NavigationMenu from './NavigationMenu';
import { ThemeProvider, useTheme } from './ThemeProvider';

const UpdateMenuContent = () => {
    // Get theme from context
    const { theme, toggleTheme } = useTheme();
    
    // Component state
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([
        { id: '001', name: 'Burger', category: 'Food', price: '10.00' },
        // You can add more initial menu items here
    ]);
    const [newItem, setNewItem] = useState({ name: '', category: 'Food', price: '' });
    const mainContentRef = useRef(null);

    // Outside click handler for menu
    useEffect(() => {
        const handleOutsideClick = (e) => {
            const menu = document.querySelector('.vertical-menu');
            const menuBtn = document.getElementById('menu-btn');
            
            if (isMenuOpen && menu && !menu.contains(e.target) && 
                menuBtn && !menuBtn.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };
        
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isMenuOpen]);

    // Update main content class when menu state changes
    useEffect(() => {
        if (mainContentRef.current) {
            if (isMenuOpen) {
                mainContentRef.current.classList.add('menu-active');
            } else {
                mainContentRef.current.classList.remove('menu-active');
            }
        }
    }, [isMenuOpen]);

    // Animation effects
    useEffect(() => {
        // Animate form and table
        anime.timeline({
            easing: 'easeOutExpo',
        }).add({
            targets: '.add-item-form',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800
        }).add({
            targets: '.table-container',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            offset: '-=600'
        });

        // Animate table rows
        const tableRows = document.querySelectorAll('#menu-table tbody tr');
        anime({
            targets: tableRows,
            opacity: [0, 1],
            translateX: [20, 0],
            delay: anime.stagger(100),
            easing: 'easeOutQuad'
        });

        // Setup action button animations
        setupButtonAnimations();
    }, []);

    // Action button animations
    const setupButtonAnimations = () => {
        const actionButtons = document.querySelectorAll('.action-btn');
        
        actionButtons.forEach(btn => {
            // Add mouseenter event
            btn.addEventListener('mouseenter', () => {
                anime({
                    targets: btn,
                    scale: 1.05,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
            
            // Add mouseleave event
            btn.addEventListener('mouseleave', () => {
                anime({
                    targets: btn,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    };

    // Form handlers
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNewItem({
            ...newItem,
            [id.replace('new-item-', '')]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Generate a unique ID (simplified for example)
        const newId = (menuItems.length + 1).toString().padStart(3, '0');
        
        setMenuItems([
            ...menuItems,
            {
                id: newId,
                name: newItem.name,
                category: newItem.category,
                price: newItem.price
            }
        ]);
        
        // Reset form
        setNewItem({ name: '', category: 'Food', price: '' });
    };

    // Delete item handler
    const handleDeleteItem = (id) => {
        setMenuItems(menuItems.filter(item => item.id !== id));
    };

    // Account dropdown toggle
    const toggleAccountDropdown = () => {
        const dropdown = document.getElementById('accountDropdown');
        dropdown.classList.toggle('show');
    };

    return (
        <div className={`update-menu-page ${theme}`}>
            {/* Header Component */}
            <HeaderContainer 
                theme={theme}
                toggleTheme={toggleTheme}
                logoLight={logoLight}
                logoDark={logoDark}
            />

            {/* Navigation Menu Component */}
            <NavigationMenu 
                theme={theme}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                logoLight={logoLight}
                logoDark={logoDark}
            />
            
            {/* Main Content */}
            <main ref={mainContentRef} className={`updatemenu-container ${isMenuOpen ? 'menu-active' : ''}`}>
                <h1 className="page-title">Update Menu</h1>

                {/* Add New Item Form */}
                <div className="add-item-form card">
                    <h2 className="form-title">Add New Menu Item</h2>
                    <form id="add-item-form" className="grid-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="new-item-name">Item Name</label>
                            <input 
                                type="text" 
                                id="new-item-name" 
                                className="modern-input" 
                                placeholder="Enter item name" 
                                required
                                value={newItem.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="new-item-category">Category</label>
                            <div className="select-wrapper">
                                <select 
                                    id="new-item-category" 
                                    className="modern-select" 
                                    required
                                    value={newItem.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="Food">Food</option>
                                    <option value="Beverage">Beverage</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="new-item-price">Price</label>
                            <div className="price-input">
                                <span className="currency">₹</span>
                                <input 
                                    type="number" 
                                    id="new-item-price" 
                                    className="modern-input" 
                                    placeholder="0.00" 
                                    step="0.01" 
                                    required
                                    value={newItem.price}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <button type="submit" className="submit-btn primary-action">
                            <span className="material-symbols-outlined">add</span>
                            Add Item
                        </button>
                    </form>
                </div>

                {/* Menu Table */}
                <div className="table-container card">
                    <table id="menu-table" className="modern-table">
                        <thead>
                            <tr>
                                <th>Item ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menuItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            value={item.name} 
                                            className="editable-input"
                                            onChange={(e) => {
                                                const updatedItems = menuItems.map(i => 
                                                    i.id === item.id ? {...i, name: e.target.value} : i
                                                );
                                                setMenuItems(updatedItems);
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <div className={`category-pill ${item.category}`}>{item.category}</div>
                                    </td>
                                    <td>
                                        <div className="price-input">
                                            <span className="currency">₹</span>
                                            <input 
                                                type="number" 
                                                value={item.price} 
                                                step="0.01" 
                                                className="editable-input price-field"
                                                onChange={(e) => {
                                                    const updatedItems = menuItems.map(i => 
                                                        i.id === item.id ? {...i, price: e.target.value} : i
                                                    );
                                                    setMenuItems(updatedItems);
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td className="actions-cell">
                                            <button 
                                                className="action-btn save-btn" 
                                                title="Save Changes"
                                            >
                                                <span className="material-symbols-outlined">save</span>
                                            </button>
                                            <button 
                                                className="action-btn delete-btn" 
                                                title="Delete Item"
                                                onClick={() => handleDeleteItem(item.id)}
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

// The main UpdateMenu component wrapped with ThemeProvider
const UpdateMenu = () => {
    return (
        <ThemeProvider>
            <UpdateMenuContent />
        </ThemeProvider>
    );
};

export default UpdateMenu;