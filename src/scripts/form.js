const form = document.querySelector(".contact-form");
const inputs = form.querySelectorAll("input, textarea");

// Modal refs
const modal = document.getElementById("success-modal");
const closeBtn = document.getElementById("close-modal");

inputs.forEach((input) => {
  input.addEventListener("input", () => validateField(input));
  input.addEventListener("blur", () => validateField(input));
});

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // always prevent default now

  let valid = true;

  inputs.forEach((input) => {
    if (!validateField(input)) valid = false;
  });

  if (!valid) return; // stop if invalid

  const formData = new FormData(form);

  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });

    if (res.ok) {
      // ✅ Show modal
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");

      form.reset();

      // Reset validation UI
      document.querySelectorAll(".form-group").forEach((group) => {
        group.classList.remove("valid", "invalid");
      });

      // Optional auto close
      setTimeout(() => {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
      }, 3000);
    } else {
      alert("Something went wrong.");
    }
  } catch (err) {
    alert("Submission failed.");
  }
});

// Close modal
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  });
}

// Click outside
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

// ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }
});
