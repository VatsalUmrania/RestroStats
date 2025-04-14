import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
// import '../styles/default.css';
import '../styles/viewbill.css';
import logoLight from '../assets/logo_light_2.jpg';
import logoDark from '../assets/logo_dark_1.jpg';
import HeaderContainer from './HeaderContainer';
import NavigationMenu from './NavigationMenu';
import { ThemeProvider, useTheme } from './ThemeProvider';

const ViewBillContent = () => {
    // Get theme from context
    const { theme, toggleTheme } = useTheme();
    
    // Component state
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const mainContentRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterValue, setFilterValue] = useState('all');

    // Sample bills data
    const [bills] = useState([
        { id: '001', customerName: 'John Doe', tableNumber: '5', totalAmount: '₹50.00', status: 'paid' },
        { id: '002', customerName: 'Jane Smith', tableNumber: '3', totalAmount: '₹75.00', status: 'unpaid' },
    ]);

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

    // Animate table rows and buttons on page load
    useEffect(() => {
        // Animate table rows
        const tableRows = document.querySelectorAll('#bills-table tbody tr');
        anime({
            targets: tableRows,
            opacity: [0, 1],
            translateX: [20, 0],
            delay: anime.stagger(100),
            easing: 'easeOutQuad'
        });

        // Setup button animations
        setupButtonAnimations();
    }, []); // Run only on initial mount
    
    // Action button hover effects
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

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle filter select change
    const handleFilterChange = (e) => {
        setFilterValue(e.target.value);
    };

    // Filter bills based on search term and filter value
    const filteredBills = bills.filter(bill => {
        const matchesSearch = bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             bill.id.includes(searchTerm);
        const matchesFilter = filterValue === 'all' || bill.status === filterValue;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className={`viewbill-page ${theme}`}>
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
            <main ref={mainContentRef} className={`viewbill-container ${isMenuOpen ? 'menu-active' : ''}`}>
                <h1>View Bills</h1>
                <div className="search-filter">
                    <input 
                        type="text" 
                        id="search-input" 
                        placeholder="Search bills..." 
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <select 
                        id="filter-select"
                        value={filterValue}
                        onChange={handleFilterChange}
                    >
                        <option value="all">All</option>
                        <option value="paid">Paid</option>
                        <option value="unpaid">Unpaid</option>
                    </select>
                </div>
                <table id="bills-table">
                    <thead>
                        <tr>
                            <th>Bill ID</th>
                            <th>Customer Name</th>
                            <th>Table Number</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBills.map((bill, index) => (
                            <tr key={index}>
                                <td>{bill.id}</td>
                                <td>{bill.customerName}</td>
                                <td>{bill.tableNumber}</td>
                                <td>{bill.totalAmount}</td>
                                <td>
                                    <span className={`status ${bill.status}`}>
                                        {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                                    </span>
                                </td>
                                <td>
                                    <button className="action-btn view-btn" title="View Bill">
                                        <span className="material-symbols-outlined">visibility</span>
                                    </button>
                                    <button className="action-btn edit-btn" title="Edit Bill">
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                    <button className="action-btn delete-btn" title="Delete Bill">
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

// The main ViewBill component wrapped with ThemeProvider
const ViewBill = () => {
    return (
        <ThemeProvider>
            <ViewBillContent />
        </ThemeProvider>
    );
};

export default ViewBill;