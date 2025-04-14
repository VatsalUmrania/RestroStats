import { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import anime from 'animejs';
import '../styles/home1.css';
import logoLight from '../assets/logo_light_2.jpg';
import logoDark from '../assets/logo_dark_1.jpg';
import HeaderContainer from './HeaderContainer';
import NavigationMenu from './NavigationMenu';
import { ThemeProvider, useTheme } from './ThemeProvider';

const HomePageContent = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const mainContentRef = useRef(null);

    const [transactions] = useState([
        { date: '2024-03-01', billNo: 'INV-1001', amount: '₹125.50', status: 'paid' },
        { date: '2024-03-02', billNo: 'INV-1002', amount: '₹78.90', status: 'paid' },
        { date: '2024-03-03', billNo: 'INV-1003', amount: '₹205.75', status: 'pending' },
        { date: '2024-03-04', billNo: 'INV-1004', amount: '₹89.20', status: 'paid' },
        { date: '2024-03-05', billNo: 'INV-1005', amount: '₹150.00', status: 'pending' },
    ]);

    // Menu handling effects
    useEffect(() => {
        const handleOutsideClick = (e) => {
            const menu = document.querySelector('.vertical-menu');
            const menuBtn = document.getElementById('menu-btn');
            if (isMenuOpen && menu && !menu.contains(e.target) && menuBtn && !menuBtn.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };
        
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [isMenuOpen]);

    useEffect(() => {
        if (mainContentRef.current) {
            mainContentRef.current.classList.toggle('menu-active', isMenuOpen);
        }
    }, [isMenuOpen]);

    // Chart initialization
    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) chartInstance.current.destroy();
            
            chartInstance.current = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Weekly Sales',
                        data: [1254, 890, 1380, 950, 1450, 1920, 1680],
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#6366f1',
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(255, 255, 255, 0.05)' },
                            ticks: {
                                color: '#6366f1',
                                callback: value => '₹' + value
                            }
                        },
                        x: {
                            grid: { color: 'rgba(241, 245, 249, 0.05)' },
                            ticks: { color: '#6366f1' }
                        }
                    }
                }
            });
        }
        
        return () => chartInstance.current?.destroy();
    }, [theme]);

    // Animations
    useEffect(() => {
        anime.timeline({
            easing: 'easeOutExpo',
        }).add({
            targets: '.dashboard-card',
            opacity: [0, 1],
            translateY: [50, 0],
            delay: anime.stagger(100)
        }).add({
            targets: '.chart-container',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            offset: '-=600'
        }).add({
            targets: '.tracking-history',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            offset: '-=600'
        });

        anime({
            targets: '#transaction-table-body tr',
            opacity: [0, 1],
            translateX: [20, 0],
            delay: anime.stagger(100),
            easing: 'easeOutQuad'
        });

        // Hover effects
        const setupHoverEffects = () => {
            document.querySelectorAll('tbody tr, .action-btn').forEach(element => {
                element.addEventListener('mouseenter', () => anime({
                    targets: element,
                    ...(element.classList.contains('action-btn') 
                        ? { scale: 1.05 } 
                        : { backgroundColor: 'rgba(241, 245, 249, 0.05)' }),
                    duration: 300
                }));
                
                element.addEventListener('mouseleave', () => anime({
                    targets: element,
                    ...(element.classList.contains('action-btn') 
                        ? { scale: 1 } 
                        : { backgroundColor: 'rgba(241, 245, 249, 0)' }),
                    duration: 300
                }));
            });
        };

        setupHoverEffects();
    }, []);

    return (
        <div className={`home-page ${theme}`}>
            <HeaderContainer 
                theme={theme}
                toggleTheme={toggleTheme}
                logoLight={logoLight}
                logoDark={logoDark}
            />

            <NavigationMenu 
                theme={theme}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                logoLight={logoLight}
                logoDark={logoDark}
            />
            
            <main ref={mainContentRef} className={isMenuOpen ? 'menu-active' : ''}>
                <div className="dashboard-grid">
                    {[
                        { id: 'card1', title: "Today's Revenue", icon: 'payments', value: '₹1,458.50', label: '35 transactions', change: '12.5% vs yesterday', trend: 'positive' },
                        { id: 'card2', title: "Weekly Sales", icon: 'calendar_month', value: '₹8,245.75', label: 'Total for this week', change: '8.3% vs last week', trend: 'negative' },
                        { id: 'card3', title: "Popular Items", icon: 'restaurant_menu', value: 'Pizza', label: 'Top sellers this week' }
                    ].map((card, index) => (
                        <div key={card.id} className="dashboard-card">
                            <div className="card-title">
                                <h3>{card.title}</h3>
                                <div className="card-icon">
                                    <span className="material-symbols-outlined">{card.icon}</span>
                                </div>
                            </div>
                            <div className="stat-value">{card.value}</div>
                            <div className="stat-label">{card.label}</div>
                            {card.change && (
                                <div className={`stat-change ${card.trend}`}>
                                    <span className="material-symbols-outlined">
                                        {card.trend === 'positive' ? 'trending_up' : 'trending_down'}
                                    </span>
                                    <span>{card.change}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="chart-container">
                    <div className="card-title">
                        <h3>Sales Trend</h3>
                        <button className="action-btn">View Report</button>
                    </div>
                    <div style={{ width: '100%', height: '250px' }}>
                        <canvas ref={chartRef} id="sales-chart"></canvas>
                    </div>
                </div>
                
                <div className="tracking-history">
                    <h2>Transaction History</h2>
                    <table>
                        <thead>
                            <tr>
                                {['Date', 'Bill No.', 'Amount', 'Status', 'Action'].map((header, index) => (
                                    <th key={index} style={{ width: '20%' }}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody id="transaction-table-body">
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.billNo}</td>
                                    <td>{transaction.amount}</td>
                                    <td>
                                        <span className={`status ${transaction.status}`}>
                                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-btn">View</button>
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

const Reports = () => (
    <ThemeProvider>
        <HomePageContent />
    </ThemeProvider>
);

export default Reports;