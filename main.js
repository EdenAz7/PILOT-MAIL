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

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDno2DbwkSYnpHJKN7WHbTQv9pGIk0bQok",
  authDomain: "data-vizit.firebaseapp.com",
  projectId: "data-vizit",
  storageBucket: "data-vizit.appspot.com",
  messagingSenderId: "340567121801",
  appId: "1:340567121801:web:b22cc202f66f12db044b58",
  measurementId: "G-PGW4QV6BVH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const app = firebase.app();  // App instance
const analytics = firebase.analytics();  // Analytics instance


document.getElementById('quiz-container').addEventListener('submit', async function (event) {
  event.preventDefault();
  const fullName = document.getElementById('fullName').value;
  const values = Array.from(ratings).map(rating => {
    const stars = rating.querySelectorAll('.star');
    return Array.from(stars).filter(star => star.classList.contains('active')).length;
  });

  const average = values.reduce((acc, val) => acc + val, 0) / values.length;

  const currentDate = new Date().toLocaleString();

  try {
    // Save data to Firebase Firestore
    await db.collection("customerDetails").add({
      fullName,
      ratings: values,
      averageRating: average.toFixed(2),
      submissionTime: currentDate,
    });

    // Display success modal
    goodModal.style.display = "block";
    
    // Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = 'https://fr.trustpilot.com/evaluate/vizit-demenagement.fr';
    }, 2000);
  } catch (error) {
    console.error('Error saving data to Firebase:', error);

    // Display error modal
    badModal.style.display = "block";
    
    // Close window after 3 seconds
    setTimeout(() => {
      document.body.innerHTML = '';
      setTimeout(() => {
        window.close();
      }, 1000);
    }, 3000);
  }
});