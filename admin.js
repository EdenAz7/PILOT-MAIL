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

if (customerDetails.length === 0) {
  console.log('No customer details found.');
} else {
  customerDetails.forEach((customer, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `Customer: ${customer.fullName}, Average Rating: ${customer.averageRating}, Submitted: ${customer.submissionTime}
                          <button onclick="deleteCustomer(${index})">Delete</button>`;
    customerList.appendChild(listItem);
  });
}

// Function to delete a customer entry
function deleteCustomer(index) {
  // Remove the customer entry at the specified index
  customerDetails.splice(index, 1);
  // Update localStorage with the modified customerDetails array
  localStorage.setItem('customerDetails', JSON.stringify(customerDetails));
  // Reload the page to reflect the changes in the list
  location.reload();
}

// Function to navigate to the home page
function goToHomePage() {
  window.location.href = 'index.html';
}
