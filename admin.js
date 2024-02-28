// Retrieve customer details from localStorage
const customerDetails = JSON.parse(localStorage.getItem('customerDetails')) || [];

// Check if customerDetails is an array before proceeding
if (!Array.isArray(customerDetails)) {
  console.error('Invalid customerDetails data in localStorage');
  // Optionally, you could clear or reset the localStorage in case of invalid data
  // localStorage.removeItem('customerDetails');
}

// Display customer details on the admin page
const customerList = document.getElementById('customerList');

// Fetch customer details from Firebase Firestore
db.collection("customerDetails").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const customer = doc.data();
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      Customer: ${customer.fullName}, 
      Average Rating: ${customer.averageRating}, 
      Submitted: ${customer.submissionTime}
      <button onclick="deleteCustomer('${doc.id}')">Delete</button>`;
    customerList.appendChild(listItem);
  });
});

// Function to delete a customer entry
function deleteCustomer(docId) {
  // Remove the customer entry from Firebase Firestore
  db.collection("customerDetails").doc(docId).delete().then(() => {
    // Reload the page to reflect the changes in the list
    location.reload();
  }).catch((error) => {
    console.error("Error deleting document: ", error);
  });
}

// Function to navigate to the home page
function goToHomePage() {
  window.location.href = 'index.html';
}
