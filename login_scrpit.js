import { auth } from './firebase.js';

document.addEventListener("DOMContentLoaded", function () {
    
const googleLoginButton = document.querySelector(".google-login");
googleLoginButton.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
        .signInWithPopup(provider)
        .then((result) => {
          // Redirect to home page
          window.location.href = "home.html";
        })
        .catch((error) => {
          console.error("Error during Google login:", error);
        });
    });
    
const signInForm = document.getElementById('sign-in-form');
    if (signInForm) {
        signInForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('sign-in-email').value;
            const password = document.getElementById('sign-in-password').value;

            try {
                await auth.signInWithEmailAndPassword(email, password);
                alert("Sign In Successful! Redirecting...");
                window.location.href = "index.html"; // Redirect to home/dashboard
            } catch (error) {
                alert(error.message);
            }
        });
    }
});