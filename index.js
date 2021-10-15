function showMenu(event) {
   mobileMenu.classList.toggle("active");
   modoNocturno.innerHTML = "Modo Nocturno";
  misGifos.innerHTML = "Mis Gifos";
  favoritos.innerHTML = "Favoritos";
}
let mobileMenu = document.querySelector(".menu");
let burger = document.querySelector(".burger");
let modoNocturno = document.querySelector(".modo-nocturno");
let misGifos = document.querySelector(".mis-gifos");
let favoritos = document.querySelector(".favoritos");
burger.addEventListener("click", showMenu);
