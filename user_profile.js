// Function to load and display quiz scores
function loadScores() {
    try {
      // Retrieve scores from localStorage or initialize empty array
      const scores = JSON.parse(localStorage.getItem('quizScores')) || [];
      const tbody = document.querySelector('#scoresTable tbody');
      
      // Clear existing table content
      tbody.innerHTML = '';
  
      // Handle case when no scores exist
      if (scores.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3">No quiz results yet. Complete a quiz to see your scores here.</td></tr>';
        return;
      }
  
      // Sort scores by date (newest first)
      scores.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      // Populate the table with score data
      scores.forEach(score => {
        const tr = document.createElement('tr');
        
        // Format date for display
        const formattedDate = new Date(score.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
  
        tr.innerHTML = `
          <td>${formattedDate}</td>
          <td>${score.score}/${score.total}</td>
          <td>${score.percentage}%</td>
        `;
        
        // Add color coding based on performance
        if (score.percentage >= 80) {
          tr.classList.add('high-score');
        } else if (score.percentage >= 50) {
          tr.classList.add('medium-score');
        } else {
          tr.classList.add('low-score');
        }
        
        tbody.appendChild(tr);
      });
  
    } catch (error) {
      console.error('Error loading quiz scores:', error);
      const tbody = document.querySelector('#scoresTable tbody');
      tbody.innerHTML = '<tr><td colspan="3">Error loading quiz results. Please try again.</td></tr>';
    }
  }
  
  // Function to save a new quiz score
  function saveQuizScore(score, total) {
    try {
      const percentage = Math.round((score / total) * 100);
      const newScore = {
        date: new Date().toISOString(),
        score: score,
        total: total,
        percentage: percentage
      };
  
      // Get existing scores or initialize empty array
      const scores = JSON.parse(localStorage.getItem('quizScores')) || [];
      
      // Add new score
      scores.push(newScore);
      
      // Store updated array
      localStorage.setItem('quizScores', JSON.stringify(scores));
      
      // Refresh the display
      loadScores();
      
      return true;
    } catch (error) {
      console.error('Error saving quiz score:', error);
      return false;
    }
  }
  
  // Initialize when page loads
  document.addEventListener('DOMContentLoaded', function() {
    loadScores();
    
    // If you need to clear scores for testing (uncomment if needed)
    // localStorage.removeItem('quizScores');
  });