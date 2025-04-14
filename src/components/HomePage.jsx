import { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js/auto';
import '../styles/home_new.css';
import logoLight from '../assets/logo_light_2.jpg';
import logoDark from '../assets/logo_dark_1.jpg';
import HeaderContainer from './HeaderContainer';
import NavigationMenu from './NavigationMenu';
import { ThemeProvider, useTheme } from './ThemeProvider';

Chart.register(...registerables);
const HomePageContent = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        setCurrentDate(formattedDate);
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            // Destroy existing chart instance if it exists
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            // Create new chart instance
            chartInstance.current = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Weekly Sales',
                        data: [1254, 890, 1380, 950, 1450, 1920, 1680],
                        borderColor: theme === 'dark' ? '#6366f1' : '#4f46e5',
                        backgroundColor: theme === 'dark' 
                            ? 'rgba(99, 102, 241, 0.1)' 
                            : 'rgba(79, 70, 229, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: theme === 'dark' ? '#6366f1' : '#4f46e5',
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
                            grid: { 
                                color: theme === 'dark' 
                                    ? 'rgba(255, 255, 255, 0.05)' 
                                    : 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                                color: theme === 'dark' ? '#6366f1' : '#4f46e5',
                                callback: (value) => `₹${value}`
                            }
                        },
                        x: {
                            grid: { 
                                color: theme === 'dark' 
                                    ? 'rgba(241, 245, 249, 0.05)' 
                                    : 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: { 
                                color: theme === 'dark' ? '#6366f1' : '#4f46e5' 
                            }
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [theme]); // Re-render chart when theme changes  
    

    return (
        <div className={`home-page ${theme}`}>
            <HeaderContainer theme={theme} toggleTheme={toggleTheme} logoLight={logoLight} logoDark={logoDark} />
            <NavigationMenu theme={theme} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} logoLight={logoLight} logoDark={logoDark} />
            
            <main className="dashboard-container">
                <div className="dashboard-header">
                    <h1 className="page-title">Dashboard</h1>
                    <div className="date-greeting">
                        <span className="material-symbols-outlined">calendar_today</span>
                        <span id="current-date">{currentDate}</span>
                    </div>
                </div>
                
                <div className="stats-grid">
                    <div className="stats-card primary">
                        <div className="card-content">
                            <span className="material-symbols-outlined">currency_rupee</span>
                            <h3>Today's Revenue</h3>
                            <p className="stat-value">₹2,450.00</p>
                            <div className="stat-trend positive">
                                <span className="material-symbols-outlined">trending_up</span>
                                +12.5%
                            </div>
                        </div>
                    </div>
                    <div className="stats-card secondary">
                        <div className="card-content">
                            <span className="material-symbols-outlined">receipt_long</span>
                            <h3>Total Orders</h3>
                            <p className="stat-value">84</p>
                            <div className="stat-trend negative">
                                <span className="material-symbols-outlined">trending_down</span>
                                -3.2%
                            </div>
                        </div>
                    </div>
                    <div className="stats-card accent">
                        <div className="card-content">
                            <span className="material-symbols-outlined">local_pizza</span>
                            <h3>Popular Item</h3>
                            <p className="stat-value">Margherita Pizza</p>
                            <div className="stat-meta">42 sold today</div>
                        </div>
                    </div>
                </div>
                
                <div className="content-grid">
                    <div className="cards" >
                        <h2>Sales Overview</h2>
                        <canvas ref={chartRef} ></canvas> {/* Add canvas element here */}
                    </div>
                    <div className="quick-actions card">
                        <h2>Quick Actions</h2>
                        <div className="action-grid">
                            <a href="./new-bill" className="action-card">
                                <span className="material-symbols-outlined">receipt</span>
                                New Bill
                            </a>
                            <a href="./view-bill" className="action-card">
                                <span className="material-symbols-outlined">list_alt</span>
                                View Bills
                            </a>
                            <a href="./update-menu" className="action-card">
                                <span className="material-symbols-outlined">restaurant</span>
                                Update Menu
                            </a>
                            <a href="./reports" className="action-card">
                                <span className="material-symbols-outlined">analytics</span>
                                Reports
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="recent-activity card">
                    <h2>Recent Activity</h2>
                    <div className="activity-list">
                        <div className="activity-item">
                            <span className="material-symbols-outlined">check_circle</span>
                            <div className="activity-content">
                                <p>New order #0451 completed</p>
                                <small>1 minute ago</small>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const HomePage = () => (
    <ThemeProvider>
        <HomePageContent />
    </ThemeProvider>
);

export default HomePage;
