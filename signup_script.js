import { auth } from './firebase.js';

// Handle Sign Up
document.addEventListener("DOMContentLoaded", function () {
    const signUpForm = document.getElementById('sign-up-form');
    if (signUpForm) {
        signUpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('sign-up-email').value;
            const password = document.getElementById('sign-up-password').value;

            try {
                await auth.createUserWithEmailAndPassword(email, password);
                alert("Sign Up Successful! Redirecting to Sign In...");
                window.location.href = "signin.html"; // Redirect to Sign In
            } catch (error) {
                alert(error.message);
            }
        });
    }
});