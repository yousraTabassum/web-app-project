import { auth } from './firebase.js'; // Import Firebase auth

// Sign In Handler
document.getElementById('sign-in-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('sign-in-email').value;
    const password = document.getElementById('sign-in-password').value;

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        alert("Sign In Successful!");
    } catch (error) {
        alert(error.message);
    }
});

// Log In Handler
document.getElementById('log-in-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('log-in-email').value;
    const password = document.getElementById('log-in-password').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        alert("Log In Successful!");
    } catch (error) {
        alert(error.message);
    }
});

// Toggle between Sign In and Log In forms
document.getElementById('go-to-sign-up').addEventListener('click', () => {
    document.getElementById('sign-in-container').style.display = 'none';
    document.getElementById('log-in-container').style.display = 'block';
});

document.getElementById('go-to-sign-in').addEventListener('click', () => {
    document.getElementById('log-in-container').style.display = 'none';
    document.getElementById('sign-in-container').style.display = 'block';
});
