let quizData = [];
let quizIndex = 0;
let score = 0;
let quizStarted = false;

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('startQuiz').addEventListener('click', startQuiz);
  document.getElementById('nextQuestion').addEventListener('click', nextQuestion);
  document.getElementById('submitQuiz').addEventListener('click', submitQuiz);
  
  generateQuizFromMaterials();
});

function generateQuizFromMaterials() {
  try {
    const materials = getMaterials() || [];
    quizData = [];

    materials.forEach(mat => {
      if (mat.content) {
        const sentences = mat.content.split(/[.!?]+/).filter(s => s.trim().length > 15);
        
        sentences.forEach(sentence => {
          const words = sentence.trim().split(/\s+/);
          if (words.length >= 5) {
            const suitableWords = words.filter(w => w.length > 3 && /[a-zA-Z]/.test(w));
            if (suitableWords.length > 0) {
              const randomIndex = Math.floor(Math.random() * suitableWords.length);
              const answer = suitableWords[randomIndex].replace(/[^a-zA-Z0-9]/g, '');
              const blanked = sentence.replace(suitableWords[randomIndex], '_____');
              quizData.push({
                question: blanked.trim(),
                answer: answer.toLowerCase(),
                original: sentence.trim()
              });
            }
          }
        });
      }
    });

    updateQuizStatus();
  } catch (error) {
    console.error("Quiz generation error:", error);
    document.getElementById('quizContent').innerHTML = 
      '<p class="error">Error generating quiz. Please try again.</p>';
  }
}

function updateQuizStatus() {
  const statusElement = document.getElementById('quizContent');
  if (quizData.length === 0) {
    statusElement.innerHTML = '<p>No quiz questions could be generated from your materials.</p>';
  } else {
    statusElement.innerHTML = `<p>Ready with ${quizData.length} questions generated from your materials.</p>`;
  }
}

function startQuiz() {
  if (quizData.length === 0) {
    alert('Please upload study materials first.');
    return;
  }

  quizIndex = 0;
  score = 0;
  quizStarted = true;
  document.getElementById('result').innerHTML = '';
  document.getElementById('startQuiz').disabled = true;
  document.getElementById('nextQuestion').disabled = false;
  document.getElementById('submitQuiz').disabled = true;
  displayCurrentQuestion();
}

function displayCurrentQuestion() {
  const quizArea = document.getElementById('quizArea');
  if (quizIndex < quizData.length) {
    const current = quizData[quizIndex];
    quizArea.innerHTML = `
      <div class="question">
        <h3>Question ${quizIndex + 1} of ${quizData.length}</h3>
        <p>${current.question}</p>
        <input type="text" id="userAnswer" placeholder="Your answer...">
        <button id="checkAnswer">Check Answer</button>
      </div>
    `;
    document.getElementById('checkAnswer').addEventListener('click', checkAnswer);
  } else {
    endQuiz();
  }
}

function checkAnswer() {
  const userAnswer = document.getElementById('userAnswer').value.trim().toLowerCase();
  const correctAnswer = quizData[quizIndex].answer;
  const resultElement = document.getElementById('result');

  if (userAnswer === correctAnswer) {
    score++;
    resultElement.innerHTML = `<p class="correct">✓ Correct! The answer was "${correctAnswer}"</p>`;
  } else {
    resultElement.innerHTML = `<p class="incorrect">✗ Incorrect. The answer was "${correctAnswer}"</p>`;
  }

  document.getElementById('nextQuestion').disabled = false;
  document.getElementById('checkAnswer').disabled = true;
}

function nextQuestion() {
  quizIndex++;
  document.getElementById('nextQuestion').disabled = true;
  document.getElementById('submitQuiz').disabled = quizIndex < quizData.length - 1;
  displayCurrentQuestion();
}

function submitQuiz() {
  endQuiz();
}

function endQuiz() {
  quizStarted = false;
  const percentage = Math.round((score / quizData.length) * 100);
  document.getElementById('quizArea').innerHTML = `
    <div class="result">
      <h2>Quiz Completed</h2>
      <p>Your score: ${score}/${quizData.length} (${percentage}%)</p>
      ${percentage >= 70 ? '<p class="correct">Well done!</p>' : '<p class="incorrect">Keep practicing!</p>'}
    </div>
  `;
  document.getElementById('startQuiz').disabled = false;
  document.getElementById('submitQuiz').disabled = true;
  document.getElementById('nextQuestion').disabled = true;
  
  // Save quiz results
  if (typeof saveQuizScore === 'function') {
    saveQuizScore(score, quizData.length);
  }
}