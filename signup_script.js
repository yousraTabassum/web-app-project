// signup.js

// Wait until page fully loads
document.addEventListener('DOMContentLoaded', function() {
    const signUpForm = document.getElementById('sign-up-form');
  
    signUpForm.addEventListener('submit', async function(event) {
      event.preventDefault(); // prevent page reload
  
      // Get values from input fields
      const firstName = document.getElementById('first-name').value.trim();
      const lastName = document.getElementById('last-name').value.trim();
      const email = document.getElementById('sign-up-email').value.trim();
      const password = document.getElementById('sign-up-password').value.trim();
  
      // Simple validation
      if (!firstName || !lastName || !email || !password) {
        alert('Please fill all fields!');
        return;
      }
  
      console.log('Signup Data:', { firstName, lastName, email, password });
  
      // 🚀 Here you can send data to backend later
      // For now, redirect after "fake signup"
      alert('Signup successful!');
      window.location.href = 'homepage.html';
    });
  });
  