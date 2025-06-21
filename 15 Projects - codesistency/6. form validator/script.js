const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

 // Email regex that covers most common email formats
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


form.addEventListener('submit', function(e){
    e.preventDefault()
})