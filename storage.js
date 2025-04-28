// js/storage.js

// Save material to localStorage
function saveMaterial(title, content) {
    let materials = JSON.parse(localStorage.getItem('materials')) || [];
    materials.push({ title, content, uploadedAt: new Date().toISOString() });
    localStorage.setItem('materials', JSON.stringify(materials));
  }
  
  // Get all materials
  function getMaterials() {
    return JSON.parse(localStorage.getItem('materials')) || [];
  }
  
  // Save quiz score
  function saveQuizScore(score) {
    localStorage.setItem('lastQuizScore', score);
  }
  
  // Get quiz score
  function getQuizScore() {
    return parseInt(localStorage.getItem('lastQuizScore')) || 0;
  }
  