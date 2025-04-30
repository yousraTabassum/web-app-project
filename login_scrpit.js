// login.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
  
    loginForm.addEventListener('submit', async function(event) {
      event.preventDefault(); // prevent page reload
  
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value.trim();
  
      if (!email || !password) {
        alert('Please enter email and password!');
        return;
      }
  
      console.log('Login Data:', { email, password });
  
      // 🚀 Here you can send data to backend later
      // For now, pretend login successful
      alert('Login successful!');
      window.location.href = 'homepage.html';
    });
  });
  