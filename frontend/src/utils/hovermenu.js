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
