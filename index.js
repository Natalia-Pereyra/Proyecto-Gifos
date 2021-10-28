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

function searchForm(event) {
  event.preventDefault();
 
  
  console.log(searchTextInput);
  // let h2 = document.querySelector("h2");

  // h2.innerHTML = `Searching for ${searchTextInput}`;
}
let searchTextInput = document.querySelector("#search-text-input");
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchForm);