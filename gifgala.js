import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJ7oZkbx_ap45yo2GEpj4xcdUKKJ7GPVE",
  authDomain: "gif-gala-5547f.firebaseapp.com",
  databaseURL: "https://gif-gala-5547f-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "gif-gala-5547f",
  storageBucket: "gif-gala-5547f.appspot.com",
  messagingSenderId: "426407831212",
  appId: "1:426407831212:web:22dbc40ab7d41fa822a109"
};

// Initialize Firebase with the provided configuration
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

const messagesInDB = ref(database, "messages");  
// Get DOM elements
const rsvpForm = document.getElementById('rsvp-form');
const emailInput = document.getElementById('email'); // Rename 'email' to 'emailInput'
const confirmationMessage = document.getElementById('confirmation-message');
const showList = document.getElementById('show-list');
const messageList = document.querySelector(".messages")
const attendanceDropdown = document.getElementById('attendance');
const messageField = document.getElementById('message-field');
const body = document.body;

// Event listener for the attendance dropdown
attendanceDropdown.addEventListener('change', (event) => {  
  if (event.target.value === 'yes') {
    messageField.style.display = 'block';
  } else {
    messageField.style.display = 'none';
  }
});

// Event listener for form submission
rsvpForm.addEventListener('submit', (event) => {  
  event.preventDefault(); // Prevent form submission

  const attendance = document.getElementById('attendance').value;
  const email = emailInput.value; // Get email value
  const message = document.getElementById('message').value;

  if (attendance === 'yes') {  
    // Save the submitted email and message to the Firebase Realtime Database
    saveMessageToDatabase(email, message);
    confirmationMessage.innerHTML = `🎉 Party on! We look forward to seeing you at the GIF Gala!`;
    body.style.backgroundImage = 'url("https://media.giphy.com/media/l2JHPB58MjfV8W3K0/giphy.gif")';
  } else if (attendance === 'no') {
    confirmationMessage.innerHTML = '😔 We will miss you at the GIF Gala!';
    body.style.backgroundImage = 'url("https://media.giphy.com/media/JER2en0ZRiGUE/giphy.gif")';
  }

  confirmationMessage.style.display = 'block';  
  rsvpForm.reset(); // Reset the form
});
// Function to save an email and message to the Firebase Realtime Database
function saveMessageToDatabase(email, message) { 
  // Push the email and message to the 'messages' node in the database
  push(messagesInDB, {
    email: email,
    message: message
  });
}
