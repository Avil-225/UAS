function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

const DEMO_USERS = {
    'avillian@student.amikom.ac.id': 'password123',
    'admin@amikom.ac.id': 'admin123',
    'student@amikom.ac.id': 'student123'
};

function handleSignIn(event) {
    event.preventDefault();
    
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    
    if (DEMO_USERS[email] && DEMO_USERS[email] === password) {
        alert('Login berhasil! Redirecting...');
        window.location.href = '../pages/dashboard.html';
    } else {
        alert('Email atau password salah!\n\nDemo accounts:\n- avillian@student.amikom.ac.id / password123\n- admin@amikom.ac.id / admin123');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleSignIn);
    }
});