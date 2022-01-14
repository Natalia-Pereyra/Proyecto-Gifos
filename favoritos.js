var mobileMenu = document.querySelector(".menu");
var burger = document.querySelector(".burger");
var cruz = document.querySelector(".cruz");
var menuImages = document.querySelector(".menu-imgs");
var modoNocturno = document.querySelector(".modo-nocturno");
var modoDiurno = document.querySelector(".modo-diurno");
var burgerModoNocturno = document.querySelector(".burger-modo-noc");
var cruzModoNocturno = document.querySelector(".cruz-modo-noc");
var searchIcon = document.getElementsByClassName("search-icon");


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

modoNocturno.addEventListener("click", changeModoNocturno);
modoDiurno.addEventListener("click", changeModoNocturno);
burger.addEventListener("click", showMenu);
cruz.addEventListener("click", showMenu);
burgerModoNocturno.addEventListener("click", showMenuModoNocturno);
cruzModoNocturno.addEventListener("click", showMenuModoNocturno);


var galleryImagesDiv = document.getElementById("gallery-images");
var apiKey = `&api_key=OmE7QZS97YExac8Bv5bjnEPvgPK9fhh8`;        

function trendingGallery() {

  let apiTrending = `https://api.giphy.com/v1/gifs/trending?${apiKey}&limit=3&rating=g`;
  
  
  fetch(apiTrending) 
  .then(response => response.json())
  .then(data => {
    
    for(let i = 0 ; i < 3; i++) {
         let trendingGifosHTML = "";

      galleryImagesDiv.innerHTML += `<div class="image-container">
     <img class="gallery-img" id="prueba-modal" src=${data.data[i].images.original.url} alt="${data.data[i].title}">
                 
     <div class="overlay">
      <div class="overlay-links">
        <a href="#"><img src="./Images/icon-download.svg" alt="Descargar GIFO"></a>
        <a href="#"><img src="./Images/icon-fav.svg" alt="Agregar a favoritos"></a>
        <a href="#"><img class="hover-aumentar" src="./Images/icon-max-normal.svg" alt="Aumentar GIFO"></a>
      </div>
        <p class="overlay-user">${data.data[i].username}</p>
        <p class="overlay-titulo-GIFO"><strong>${data.data[i].title}</strong></p>
     </div>
  </div>`;

  galleryImagesDiv[i] += trendingGifosHTML;
  console.log(data.data[i].username);
      }
     })
     .catch(err => console.log(err));
}
trendingGallery();

 
