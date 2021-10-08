function showMenu(event) {
   mobileMenu.classList.toggle("active");
}
let mobileMenu = document.querySelector(".menu");
let burger = document.querySelector(".burger");
burger.addEventListener("click", showMenu);