document.addEventListener('DOMContentLoaded', () => {
    // Password toggle
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.getElementById('password');
    
    if(passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            passwordToggle.querySelector('span').textContent = 
                type === 'password' ? 'visibility' : 'visibility_off';
        });
    }

    // Form validation
    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.querySelector('[name="remember"]').checked;

            // Simple validation
            if(!email || !password) {
                alert('Please fill in all fields');
                return;
            }

            // Simulate authentication
            // In real application, implement proper authentication
            localStorage.setItem('isAuthenticated', 'true');
            if(rememberMe) {
                localStorage.setItem('rememberUser', 'true');
            }

            // Redirect to dashboard
            window.location.href = 'index.html';
        });
    }

    // Check authentication state
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if(isAuthenticated && window.location.pathname.endsWith('login.html')) {
        window.location.href = 'index.html';
    }
});