// js/quiz.js

let quizData = [];
let quizIndex = 0;
let score = 0;

function generateQuizFromMaterials() {
  const materials = getMaterials();

  quizData = [];

  materials.forEach(mat => {
    const sentences = mat.content.split('.');
    sentences.forEach(sentence => {
      sentence = sentence.trim();
      if (sentence.length > 10) {
        const words = sentence.split(' ');
        if (words.length > 3) {
          const randomIndex = Math.floor(Math.random() * words.length);
          const answer = words[randomIndex].replace(/[^a-zA-Z]/g, '');
          words[randomIndex] = "_____";
          const question = words.join(' ');
          quizData.push({ question, answer });
        }
      }
    });
  });

  if (quizData.length === 0) {
    alert('No materials available for quiz.');
  } else {
    startQuiz();
  }
}

function startQuiz() {
  quizIndex = 0;
  score = 0;
  displayQuestion();
}

function displayQuestion() {
  const quizArea = document.getElementById('quizArea');
  quizArea.innerHTML = '';

  if (quizIndex < quizData.length) {
    const current = quizData[quizIndex];
    quizArea.innerHTML = `
      <h3>Q${quizIndex + 1}: ${current.question}</h3>
      <input type="text" id="userAnswer" placeholder="Type your answer">
      <button onclick="submitAnswer()">Submit Answer</button>
    `;
  } else {
    quizArea.innerHTML = `<h2>Your Score: ${score}/${quizData.length}</h2>`;
    saveQuizScore(score);
  }
}

function submitAnswer() {
  const userAnswer = document.getElementById('userAnswer').value.trim().toLowerCase();
  const correctAnswer = quizData[quizIndex].answer.toLowerCase();

  if (userAnswer === correctAnswer) {
    score++;
  }
  quizIndex++;
  displayQuestion();
}

window.onload = generateQuizFromMaterials;
