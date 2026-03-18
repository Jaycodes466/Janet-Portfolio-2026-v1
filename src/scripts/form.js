const form = document.querySelector(".contact-form");

form.addEventListener("submit", (e) => {
  let valid = true;

  const name = form.name;
  const email = form.email;
  const message = form.message;

  clearErrors();

  if (name.value.trim().length < 2) {
    showError(name, "Please enter your name");
    valid = false;
  }

  if (!validateEmail(email.value)) {
    showError(email, "Enter a valid email");
    valid = false;
  }

  if (message.value.trim().length < 10) {
    showError(message, "Message must be at least 10 characters");
    valid = false;
  }

  if (!valid) e.preventDefault();
});

function showError(input, message) {
  const error = input.parentElement.querySelector(".error");
  error.textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
