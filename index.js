function showMenu(event) {
   mobileMenu.classList.toggle("active");
   menuImages.classList.toggle("open");
  //  modoNocturno.innerHTML = "Modo Nocturno";
  // misGifos.innerHTML = "Mis Gifos";
  // favoritos.innerHTML = "Favoritos";
}

function changeModoNocturno(event) {
  event.preventDefault();
  document.body.classList.toggle("body-modo-nocturno");
  modoNocturno.classList.toggle("hide-modo-nocturno");
  // modoNocturno.setAttribute("src", "./Images/logo-mobile-modo-noct.svg");
  modoDiurno.classList.toggle("show-modo-diurno");
}

function showMenuModoNocturno(event) {
  event.preventDefault();
  mobileMenu.classList.toggle("active");
  menuImages.classList.toggle("open");
  burger.classList.toggle("modo-diurno");


}

let mobileMenu = document.querySelector(".menu");
let burger = document.querySelector(".burger");
let cruz = document.querySelector(".cruz");
let menuImages = document.querySelector(".menu-imgs");
let modoNocturno = document.querySelector(".modo-nocturno");
// let misGifos = document.querySelector(".mis-gifos");
// let favoritos = document.querySelector(".favoritos");
let modoDiurno = document.querySelector(".modo-diurno");
let burgerModoNocturno = document.querySelector(".burger-modo-noc");
let cruzModoNocturno = document.querySelector(".cruz-modo-noc");



modoNocturno.addEventListener("click", changeModoNocturno);
modoDiurno.addEventListener("click", changeModoNocturno);

burger.addEventListener("click", showMenu);
cruz.addEventListener("click", showMenu);

burgerModoNocturno.addEventListener("click", showMenuModoNocturno);
cruzModoNocturno.addEventListener("click", showMenuModoNocturno);

// function searchForm(event) {
//   event.preventDefault();
 
  
//   console.log(searchTextInput);
//   // let h2 = document.querySelector("h2");

//   // h2.innerHTML = `Searching for ${searchTextInput}`;
// }
// let searchTextInput = document.querySelector("#search-text-input");
// let form = document.querySelector("#search-form");
// form.addEventListener("submit", searchForm);