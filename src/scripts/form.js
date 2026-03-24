document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const inputs = form.querySelectorAll(
    'input:not([type="hidden"]):not([name="bot-field"]), textarea',
  );

  const modal = document.getElementById("success-modal");
  const closeBtn = document.getElementById("close-modal");

  /* ===== VALIDATION ===== */

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

  /* ===== SUBMIT ===== */

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valid = true;

    inputs.forEach((input) => {
      if (!validateField(input)) valid = false;
    });

    if (!valid) return;

    const formData = new FormData(form);

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.status === 200 || res.type === "opaqueredirect") {
        if (modal) {
          modal.classList.add("active");
          modal.setAttribute("aria-hidden", "false");
        }

        form.reset();

        document.querySelectorAll(".form-group").forEach((group) => {
          group.classList.remove("valid", "invalid");
        });
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    }
  });

  /* ===== MODAL ===== */

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    }
  });
});
