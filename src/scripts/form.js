document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  // Only target real inputs (avoid Netlify hidden fields)
  const inputs = form.querySelectorAll(
    'input:not([type="hidden"]):not([name="bot-field"]), textarea',
  );

  /* =========================
     VALIDATION
  ========================= */

  inputs.forEach((input) => {
    input.addEventListener("input", () => validateField(input));
    input.addEventListener("blur", () => validateField(input));
  });

  function validateField(input) {
    const group = input.closest(".form-group");
    if (!group) return true;

    const error = group.querySelector(".error");

    let isValid = true;

    if (input.name === "name") {
      if (input.value.trim().length < 2) {
        error.textContent = "Enter your name";
        isValid = false;
      }
    }

    if (input.name === "email") {
      if (!validateEmail(input.value)) {
        error.textContent = "Enter a valid email";
        isValid = false;
      }
    }

    if (input.name === "message") {
      if (input.value.trim().length < 10) {
        error.textContent = "Message must be at least 10 characters";
        isValid = false;
      }
    }

    // Reset animation states
    group.classList.remove("valid", "invalid");
    void group.offsetWidth;

    if (input.value.trim() === "") {
      error.textContent = "";
      return false;
    }

    if (isValid) {
      group.classList.add("valid");
      error.textContent = "";
    } else {
      group.classList.add("invalid");
    }

    return isValid;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* =========================
     BLOCK SUBMIT IF INVALID
  ========================= */

  form.addEventListener("submit", (e) => {
    let valid = true;

    inputs.forEach((input) => {
      if (!validateField(input)) valid = false;
    });

    //  Stop submission if invalid
    if (!valid) {
      e.preventDefault();
    }
  });
});
