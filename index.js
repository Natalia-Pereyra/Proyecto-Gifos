function showMenu(event) {
   mobileMenu.classList.toggle("active");
   menuImages.classList.toggle("open");
}

function changeModoNocturno(event) {
  event.preventDefault();
  document.body.classList.toggle("body-modo-nocturno");
  modoNocturno.classList.toggle("hide-modo-nocturno");
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
let modoDiurno = document.querySelector(".modo-diurno");
let burgerModoNocturno = document.querySelector(".burger-modo-noc");
let cruzModoNocturno = document.querySelector(".cruz-modo-noc");



modoNocturno.addEventListener("click", changeModoNocturno);
modoDiurno.addEventListener("click", changeModoNocturno);

burger.addEventListener("click", showMenu);
cruz.addEventListener("click", showMenu);

burgerModoNocturno.addEventListener("click", showMenuModoNocturno);
cruzModoNocturno.addEventListener("click", showMenuModoNocturno);


function showModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

let modal = document.getElementById("modal");
let image = document.getElementById("prueba-modal");
let modalSpan = document.getElementsByClassName("close-modal")[0];
image.addEventListener("click", showModal);
modalSpan.addEventListener("click", closeModal);

function showInput(event) {
event.preventDefault();

fetch(apiUrl)
.then(response => response.json())
.then(data => image.setAttribute("src", data.data[0].images.original.url))
.catch(err => console.log(err));

}


let input = document.querySelector("#search-text-input");
let apiKey = `&api_key=OmE7QZS97YExac8Bv5bjnEPvgPK9fhh8`;
let apiUrl = `https://api.giphy.com/v1/gifs/search?${apiKey}&q=${input.value}`;
let formInput = document.querySelector("#form");
let prueba = document.getElementById("prueba-imagen");
let image = document.getElementsByClassName("hero-img");
form.addEventListener("submit", showInput);