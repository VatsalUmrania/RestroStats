document.addEventListener('DOMContentLoaded', () => {
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
});