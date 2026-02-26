const quizQuestions = [
  {
    question: "What is the atomic number of Oxygen?",
    options: ["6", "8", "10", "12"],
    correctAnswer: 1
  },
  {
    question: "Which element has the symbol 'Au'?",
    options: ["Silver", "Gold", "Aluminum", "Argon"],
    correctAnswer: 1
  },
  {
    question: "How many electrons does Carbon have?",
    options: ["4", "6", "8", "10"],
    correctAnswer: 1
  },
  {
    question: "Which noble gas is the heaviest?",
    options: ["Helium", "Neon", "Radon", "Xenon"],
    correctAnswer: 2
  },
  {
    question: "What is the atomic mass of Hydrogen?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 0
  },
  {
    question: "Which element is the most reactive metal?",
    options: ["Lithium", "Sodium", "Potassium", "Cesium"],
    correctAnswer: 3
  },
  {
    question: "What is the pH of pure water?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2
  },
  {
    question: "Which element forms the most compounds?",
    options: ["Nitrogen", "Oxygen", "Carbon", "Hydrogen"],
    correctAnswer: 2
  },
  {
    question: "What is the atomic number of Iron?",
    options: ["24", "26", "28", "30"],
    correctAnswer: 1
  },
  {
    question: "Which halogen is a liquid at room temperature?",
    options: ["Fluorine", "Chlorine", "Bromine", "Iodine"],
    correctAnswer: 2
  },
  {
  question: "What is the atomic number of Nitrogen?",
  options: ["5", "6", "7", "8"],
  correctAnswer: 2
},
{
  question: "Which element has the symbol 'Na'?",
  options: ["Nitrogen", "Neon", "Sodium", "Nickel"],
  correctAnswer: 2
},
{
  question: "What is the atomic number of Magnesium?",
  options: ["10", "11", "12", "13"],
  correctAnswer: 2
},
{
  question: "Which element is a metalloid?",
  options: ["Silicon", "Sulfur", "Sodium", "Scandium"],
  correctAnswer: 0
},
{
  question: "What is the atomic number of Chlorine?",
  options: ["15", "16", "17", "18"],
  correctAnswer: 2
},
{
  question: "Which gas is used in balloons?",
  options: ["Oxygen", "Hydrogen", "Helium", "Nitrogen"],
  correctAnswer: 2
},
{
  question: "What is the atomic number of Sodium?",
  options: ["9", "10", "11", "12"],
  correctAnswer: 2
},
{
  question: "Which element is liquid at room temperature?",
  options: ["Mercury", "Iron", "Copper", "Zinc"],
  correctAnswer: 0
},
{
  question: "What is the atomic number of Aluminum?",
  options: ["11", "12", "13", "14"],
  correctAnswer: 2
},
{
  question: "Which element is the lightest?",
  options: ["Hydrogen", "Helium", "Lithium", "Beryllium"],
  correctAnswer: 0
},
{
  question: "What is the atomic number of Phosphorus?",
  options: ["13", "14", "15", "16"],
  correctAnswer: 2
},
{
  question: "Which element has the highest electronegativity?",
  options: ["Oxygen", "Nitrogen", "Fluorine", "Chlorine"],
  correctAnswer: 2
},
{
  question: "What is the atomic number of Sulfur?",
  options: ["14", "15", "16", "17"],
  correctAnswer: 2
},
{
  question: "Which element is a noble gas?",
  options: ["Argon", "Oxygen", "Hydrogen", "Carbon"],
  correctAnswer: 0
},
{
  question: "What is the atomic number of Potassium?",
  options: ["18", "19", "20", "21"],
  correctAnswer: 1
},
{
  question: "Which element is used in thermometers?",
  options: ["Gallium", "Mercury", "Lead", "Tin"],
  correctAnswer: 1
},
{
  question: "What is the atomic number of Calcium?",
  options: ["18", "19", "20", "21"],
  correctAnswer: 2
},
{
  question: "Which element is essential for respiration?",
  options: ["Oxygen", "Carbon", "Nitrogen", "Hydrogen"],
  correctAnswer: 0
},
{
  question: "What is the atomic number of Titanium?",
  options: ["20", "21", "22", "23"],
  correctAnswer: 2
},
{
  question: "Which element is used in pencils?",
  options: ["Carbon", "Lead", "Iron", "Silicon"],
  correctAnswer: 0
},
{
  question: "What is the atomic number of Chromium?",
  options: ["22", "23", "24", "25"],
  correctAnswer: 2
},
{
  question: "Which element gives blood its red color?",
  options: ["Iron", "Copper", "Zinc", "Nickel"],
  correctAnswer: 0
},
{
  question: "What is the atomic number of Manganese?",
  options: ["23", "24", "25", "26"],
  correctAnswer: 2
},
{
  question: "Which element is used in stainless steel?",
  options: ["Nickel", "Chromium", "Zinc", "Lead"],
  correctAnswer: 1
},
{
  question: "What is the atomic number of Cobalt?",
  options: ["26", "27", "28", "29"],
  correctAnswer: 1
},
{
  question: "Which element has the symbol 'Cu'?",
  options: ["Copper", "Cobalt", "Calcium", "Carbon"],
  correctAnswer: 0
},
{
  question: "What is the atomic number of Nickel?",
  options: ["26", "27", "28", "29"],
  correctAnswer: 2
},
{
  question: "Which element is used in electrical wiring?",
  options: ["Iron", "Copper", "Aluminum", "Gold"],
  correctAnswer: 1
},
{
  question: "What is the atomic number of Zinc?",
  options: ["28", "29", "30", "31"],
  correctAnswer: 2
},
{
  question: "Which element is used in galvanization?",
  options: ["Zinc", "Tin", "Lead", "Silver"],
  correctAnswer: 0
},
{
  question: "What is the atomic number of Gallium?",
  options: ["29", "30", "31", "32"],
  correctAnswer: 2
},
{
  question: "Which element melts in your hand?",
  options: ["Gallium", "Iron", "Copper", "Nickel"],
  correctAnswer: 0
},
{
  question: "What is the atomic number of Germanium?",
  options: ["30", "31", "32", "33"],
  correctAnswer: 2
},
{
  question: "Which element is used in semiconductors?",
  options: ["Silicon", "Carbon", "Oxygen", "Iron"],
  correctAnswer: 0
},
{
  question: "What is the atomic number of Arsenic?",
  options: ["31", "32", "33", "34"],
  correctAnswer: 2
},
{
  question: "Which element is used in matchsticks?",
  options: ["Sulfur", "Phosphorus", "Carbon", "Nitrogen"],
  correctAnswer: 1
},
{
  question: "What is the atomic number of Selenium?",
  options: ["32", "33", "34", "35"],
  correctAnswer: 2
},
{
  question: "Which element is used in photography (old films)?",
  options: ["Silver", "Gold", "Iron", "Zinc"],
  correctAnswer: 0
},
{
  question: "What is the atomic number of Bromine?",
  options: ["34", "35", "36", "37"],
  correctAnswer: 1
},
{
  question: "Which element is used in neon lights?",
  options: ["Neon", "Argon", "Krypton", "Xenon"],
  correctAnswer: 0
},
{
  question: "What is the atomic number of Krypton?",
  options: ["34", "35", "36", "37"],
  correctAnswer: 2
},
{
  question: "Which element is the heaviest naturally occurring noble gas?",
  options: ["Xenon", "Radon", "Argon", "Krypton"],
  correctAnswer: 1
},
{
  question: "What is the atomic number of Rubidium?",
  options: ["36", "37", "38", "39"],
  correctAnswer: 1
},
{
  question: "Which element reacts violently with water?",
  options: ["Sodium", "Gold", "Iron", "Copper"],
  correctAnswer: 0
},
{
  question: "What is the atomic number of Strontium?",
  options: ["36", "37", "38", "39"],
  correctAnswer: 2
},
{
  question: "Which element is used in fireworks for red color?",
  options: ["Strontium", "Copper", "Barium", "Sodium"],
  correctAnswer: 0
},
{
  question: "What is the atomic number of Yttrium?",
  options: ["38", "39", "40", "41"],
  correctAnswer: 1
},
{
  question: "Which element is used in light bulb filaments?",
  options: ["Tungsten", "Iron", "Copper", "Aluminum"],
  correctAnswer: 0
},
{
  question: "What is the atomic number of Zirconium?",
  options: ["38", "39", "40", "41"],
  correctAnswer: 2
}
];

let currentQuestion = 0;
let userAnswers = [];
let quizStarted = false;
let selectedQuestions = [];

// Function to shuffle and select 10 random questions
function initializeQuiz() {
  // Shuffle all questions and select 10 random ones
  const shuffled = quizQuestions.sort(() => Math.random() - 0.5);
  selectedQuestions = shuffled.slice(0, 10);
}

document.addEventListener('DOMContentLoaded', function() {
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const retakeBtn = document.getElementById('retakeBtn');

  nextBtn.addEventListener('click', handleNext);
  prevBtn.addEventListener('click', handlePrevious);
  if (retakeBtn) {
    retakeBtn.addEventListener('click', retakeQuiz);
  }

  // Initialize quiz with random questions
  initializeQuiz();
  loadQuestion();
});

function loadQuestion() {
  const question = selectedQuestions[currentQuestion];
  const questionContainer = document.getElementById('question-container');
  const optionsContainer = document.getElementById('options');
  const progressContainer = document.getElementById('progress');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  // Update question
  document.getElementById('question').textContent = `${currentQuestion + 1}. ${question.question}`;

  // Clear and load options
  optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-primary btn-lg';
    btn.textContent = option;
    btn.addEventListener('click', () => selectAnswer(index, btn));
    
    // Highlight previously selected answer
    if (userAnswers[currentQuestion] === index) {
      btn.classList.add('active');
      btn.classList.remove('btn-outline-primary');
      btn.classList.add('btn-primary');
    }

    optionsContainer.appendChild(btn);
  });

  // Update progress - always show 10 questions
  progressContainer.textContent = `Question ${currentQuestion + 1} of 10`;

  // Update button visibility
  if (currentQuestion === 0) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'block';
  }

  // Check if this is the last question (always 10)
  if (currentQuestion === 9) {
    nextBtn.textContent = 'Finish';
  } else {
    nextBtn.textContent = 'Next';
  }
}

function selectAnswer(index, btn) {
  userAnswers[currentQuestion] = index;
  
  // Remove active class from all buttons
  const buttons = document.querySelectorAll('#options button');
  buttons.forEach(button => {
    button.classList.remove('active');
    button.classList.add('btn-outline-primary');
    button.classList.remove('btn-primary');
  });

  // Add active class to selected button
  btn.classList.add('active');
  btn.classList.remove('btn-outline-primary');
  btn.classList.add('btn-primary');
}

function handleNext() {
  if (currentQuestion < 9) {
    currentQuestion++;
    loadQuestion();
  } else {
    showResults();
  }
}

function handlePrevious() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
}

function showResults() {
  let score = 0;
  let resultsHTML = '';

  userAnswers.forEach((answer, index) => {
    const question = selectedQuestions[index];
    const isCorrect = answer === question.correctAnswer;
    if (isCorrect) {
      score++;
    }

    resultsHTML += `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${index + 1}. ${question.question}</h5>
          <p class="card-text">Your answer: <strong>${question.options[answer]}</strong></p>
          <p class="card-text">Correct answer: <strong class="text-success">${question.options[question.correctAnswer]}</strong></p>
          <span class="badge ${isCorrect ? 'bg-success' : 'bg-danger'}">${isCorrect ? 'Correct' : 'Incorrect'}</span>
        </div>
      </div>
    `;
  });

  const percentage = Math.round((score / 10) * 100);

  document.getElementById('score').textContent = score;
  document.getElementById('total').textContent = '10';
  document.getElementById('percentage').textContent = `${percentage}% - ${getPerformanceMessage(percentage)}`;
  document.getElementById('results-details').innerHTML = resultsHTML;

  document.getElementById('quiz-content').style.display = 'none';
  document.getElementById('results-container').style.display = 'block';
}

function retakeQuiz() {
  currentQuestion = 0;
  userAnswers = [];
  // Initialize with a new set of 10 random questions
  initializeQuiz();
  document.getElementById('quiz-content').style.display = 'block';
  document.getElementById('results-container').style.display = 'none';
  loadQuestion();
}

function getPerformanceMessage(percentage) {
  if (percentage === 100) return "Perfect Score! 🌟";
  if (percentage >= 90) return "Excellent! 🎉";
  if (percentage >= 80) return "Great Job! 👏";
  if (percentage >= 70) return "Good Work! 😊";
  if (percentage >= 60) return "Passed! 📚";
  return "Keep Studying! 💪";
}

const accent = "#ffb347";
