//ChangeTHeme.js

const themeBtn = document.getElementById('theme-btn');
const modeIcon = document.getElementById('mode-icon');
const body = document.body;

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        modeIcon.textContent = 'dark_mode';
        document.getElementById('logo').src = '../src/assets/logo_light_2.jpg';
        document.getElementById('menu-logo').src = '../src/assets/logo_light_2.jpg';
    } else {
        modeIcon.textContent = 'light_mode';
        document.getElementById('logo').src = '../src/assets/logo_dark_1.jpg';
        document.getElementById('menu-logo').src = '../src/assets/logo_dark_1.jpg';
    }
});

// Menu toggle hovermenu.js
const menuBtn = document.getElementById('menu-btn');
const mainMenu = document.getElementById('main-menu');
const mainContent = document.querySelector('main');

menuBtn.addEventListener('click', () => {
    mainMenu.classList.toggle('active');
    mainContent.classList.toggle('menu-active');
    
    // Animate the menu button
    anime({
        targets: menuBtn,
        rotate: mainMenu.classList.contains('active') ? 180 : 0,
        duration: 200,
        easing: 'easeInOutQuad'
    });
});

        // User dropdown
const userBtn = document.getElementById('user-btn');
const accountDropdown = document.getElementById('accountDropdown');

userBtn.addEventListener('click', () => {
    accountDropdown.classList.toggle('active');
});

// Close dropdowns when clicking outside Userdropdown.js
document.addEventListener('click', (e) => {
    if (!userBtn.contains(e.target)) {
        accountDropdown.classList.remove('active');
    }
    
    if (!mainMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mainMenu.classList.remove('active');
        mainContent.classList.remove('menu-active');
        anime({
            targets: menuBtn,
            rotate: 0,
            duration: 500,
            easing: 'easeInOutQuad'
        });
    }
});

        // Submenu toggle
const submenuParents = document.querySelectorAll('.has-submenu > a');

submenuParents.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = item.parentElement;
        const submenu = parent.querySelector('.submenu');
        
        parent.classList.toggle('active');
        
        // Toggle animation for submenu
        if (parent.classList.contains('active')) {
            submenu.classList.add('active');
        } else {
            submenu.classList.remove('active');
        }
    });
});

        // Page load animations
document.addEventListener('DOMContentLoaded', () => {
// Animate dashboard cards
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

// Animate the menu icon
anime({
    targets: '#menu-btn',
    scale: [0, 1],
    rotate: [180, 0],
    opacity: [0, 1],
    duration: 1000,
    delay: 200,
    easing: 'easeOutElastic(1, .5)'
});

// Animate progress bar
setTimeout(() => {
    document.getElementById('popular-items-progress').style.width = '75%';
}, 1000);

            // Create sales chart with updated colors
            const ctx = document.getElementById('sales-chart');
            const myChart3 = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Weekly Sales',
                        data: [1254, 890, 1380, 950, 1450, 1920, 1680],
                        borderColor: '#6366f1', // Updated to primary color
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        color: 'rgb(255,255,255)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#6366f1',
                        pointRadius: 4,
                        pointHoverRadius: 6.
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.05)' // Updated with text-light color
                            },
                            ticks: {
                                color:'#6366f1',
                                callback: function(value) {
                                    return '₹' + value;
                                }
                            }
                        },
                        x: {
                            grid: {
                                
                                color: 'rgba(241, 245, 249, 0.05)' // Updated with text-light color
                            },
                            ticks:{
                                color:'#6366f1'
                            }
                        }
                    }
                }
            });

            // Animate table rows
            const tableRows = document.querySelectorAll('#transaction-table-body tr');
            anime({
                targets: tableRows,
                opacity: [0, 1],
                translateX: [20, 0],
                delay: anime.stagger(100),
                easing: 'easeOutQuad'
            });
        });

        // Create hover animation for table rows
        const tableRows = document.querySelectorAll('tbody tr');
        tableRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                anime({
                    targets: row,
                    backgroundColor: 'rgba(241, 245, 249, 0.05)', // Updated with text-light color
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
            
            row.addEventListener('mouseleave', () => {
                anime({
                    targets: row,
                    backgroundColor: 'rgba(241, 245, 249, 0)',
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });

        // Action button hover effect
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                anime({
                    targets: btn,
                    scale: 1.05,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                anime({
                    targets: btn,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });


        