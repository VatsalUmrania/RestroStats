document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById('theme-btn');
    const body = document.body;
    const logo = document.getElementById('logo');
    const modeIcon = document.getElementById('mode-icon');

    const toggleTheme = () => {
        const isDark = body.classList.contains('dark-theme');
        const newTheme = isDark ? 'light-theme' : 'dark-theme';
        
        // Toggle theme classes
        body.classList.remove('dark-theme', 'light-theme');
        body.classList.add(newTheme);
        
        // Update logo
        if(logo) {
            logo.src = `../assets/logo_${newTheme === 'dark-theme' ? 'dark' : 'light'}.jpg`;
        }
        
        // Update theme icon
        if(modeIcon) {
            modeIcon.textContent = newTheme === 'dark-theme' ? 'light_mode' : 'dark_mode';
        }
        
        // Save to localStorage
        localStorage.setItem('theme', newTheme);
    };

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    body.classList.add(savedTheme);
    
    // Set initial logo and icon
    if(logo) {
        logo.src = `../assets/logo_${savedTheme === 'dark-theme' ? 'dark' : 'light'}.jpg`;
    }
    if(modeIcon) {
        modeIcon.textContent = savedTheme === 'dark-theme' ? 'light_mode' : 'dark_mode';
    }

    themeButton.addEventListener('click', toggleTheme);
});