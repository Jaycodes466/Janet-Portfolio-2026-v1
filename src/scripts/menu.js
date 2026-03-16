const menu = document.querySelector(".mobile-menu");
const toggle = document.querySelector(".menu-toggle");

toggle.addEventListener("click", () => {
  menu.classList.toggle("open");
  toggle.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});
