// js/dashboard.js

function loadDashboard() {
    const userName = localStorage.getItem('userName') || 'Student';
    const userEmail = localStorage.getItem('userEmail') || 'student@example.com';
    const lastScore = getQuizScore();
    const materials = getMaterials();
  
    document.getElementById('userName').innerText = userName;
    document.getElementById('userEmail').innerText = userEmail;
    document.getElementById('quizScore').innerText = `Last Quiz Score: ${lastScore}`;
  
    const materialList = document.getElementById('dashboardMaterials');
    materialList.innerHTML = '';
  
    if (materials.length === 0) {
      materialList.innerHTML = '<p>No materials uploaded yet.</p>';
    } else {
      materials.forEach((mat, index) => {
        const item = document.createElement('li');
        item.textContent = `${index + 1}. ${mat.title}`;
        materialList.appendChild(item);
      });
    }
  }
  
  window.onload = loadDashboard;
  