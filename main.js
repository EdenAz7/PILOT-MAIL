var badModal = document.getElementById("badModal");
var goodModal = document.getElementById("goodModal");
const ratings = document.querySelectorAll('.rating');

ratings.forEach(rating => {
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.classList.add('star');
    star.innerHTML = '★';
    star.addEventListener('click', () => rateQuestion(rating, i));
    rating.appendChild(star);
  }
});

function rateQuestion(rating, value) {
  const stars = rating.querySelectorAll('.star');
  stars.forEach((star, index) => {
    star.classList.toggle('active', index < value);
  });
}

const customerDetails = JSON.parse(localStorage.getItem('customerDetails')) || [];

document.getElementById('quiz-container').addEventListener('submit', function (event) {

  event.preventDefault();
  const fullName = document.getElementById('fullName').value;
  const values = Array.from(ratings).map(rating => {
    const stars = rating.querySelectorAll('.star');
    const activeStars = Array.from(stars).filter(star => star.classList.contains('active')).length;
    if (activeStars === 0) {
      alert('Veuillez évaluer toutes les questions avant de soumettre.');
      throw new Error('Unrated question found');
    }
    return activeStars;
  });

  const average = values.reduce((acc, val) => acc + val, 0) / values.length;

  const currentDate = new Date().toLocaleString();
  customerDetails.push({
    fullName,
    ratings: values,
    averageRating: average.toFixed(2),
    submissionTime: currentDate, // Add submission time to customer details
  });
  
  localStorage.setItem('customerDetails', JSON.stringify(customerDetails));

  if (average >= 3.8) {
    setTimeout(() => {
      window.location.href = 'https://fr.trustpilot.com/evaluate/vizit-demenagement.fr';
    }, 2000);
    goodModal.style.display = "block";
  } else {
    setTimeout(() => {
      document.body.innerHTML = '';
      setTimeout(() => {
        window.close();
      }, 1000);
    }, 3000);
    badModal.style.display = "block";
  }
});
function updateValue(spanId, value) {
  document.getElementById(spanId).textContent = value;
}

document.getElementById('loginButton').addEventListener('click', function () {
  const username = prompt('Enter your username:');
  const password = prompt('Enter your password:');

  // Check username and password
  if (username === 'edenaz' && password === '318764446') {
    // Redirect to admin page and display customer details
    window.location.href = 'admin-page.html';
  } else {
    alert('Invalid credentials. Please try again.');
  }
});
