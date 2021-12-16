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


var modal = document.getElementById("modal");
var iconAumentarOverlay = document.getElementsByClassName("hover-aumentar");
var totalIcons = iconAumentarOverlay.length;
var modalSpan = document.getElementsByClassName("close-modal")[0];
var pruebaModalDos = document.getElementById("arrow-icon");

function showModal() {
  let imageAumentada = document.getElementsByClassName("image-aumentada");
  modal.style.display = "block";

}
function closeModal() {
  modal.style.display = "none";
}

modalSpan.addEventListener("click", closeModal);
for(var i = 0; i < totalIcons; i++) {
  iconAumentarOverlay[i].addEventListener("click", showModal);
}
// pruebaModalDos.addEventListener("click", showModal);





function trendingExamplesHome() {

  let trendingHome = document.getElementById("trending-examples");
  let apiKey = `&api_key=OmE7QZS97YExac8Bv5bjnEPvgPK9fhh8`;
  let trendingHomeHTML = '';
  let apiTrending = `https://api.giphy.com/v1/trending/searches?${apiKey}`;

  fetch(apiTrending)
  .then(response => response.json())
  .then(data => {

    for (let i = 0; i < 5; i++) {
      var trendingData = `${data.data[i]}, `;
      var UpperCaseTrending = trendingData[0].toUpperCase() + trendingData.slice(1);
     
      // var lastPosition = UpperCaseTrending.length;
      // lastPosition[i].replace(",", ".");
      // trendingData = data.data[i];

      trendingHomeHTML += UpperCaseTrending;
    }
    trendingHome.innerHTML += trendingHomeHTML;
    
  });
}
trendingExamplesHome();


var form = document.querySelector("#search-form");
var searchValue = "";
var apiKey = `&api_key=OmE7QZS97YExac8Bv5bjnEPvgPK9fhh8`;
var input = document.querySelector("#search-text-input");

function showInput() {
    
    var apiUrl = `https://api.giphy.com/v1/gifs/search?${apiKey}&q=${searchValue}&limit=12`;
    let resultsContainer = document.getElementById("results-container");
    let resultsSection = document.getElementById("results");
    let title = document.getElementById("title");
    
    
fetch(apiUrl)         
    .then(response => response.json())
    .then(data =>  {
      
      for(let i = 0; i<12; i++) {
              let resultsContainerHTML = "";

              resultsContainer.innerHTML += 
                    `<div class="result-template">
                        <img src="${data.data[i].images.original.url}" alt="${data.data[i].title}" class="imagen-prueba">
                        <div class="overlay">
                            <div class="overlay-links">
                               <img src="./Images/icon-fav.svg" alt="agregar a Favoritos" class="hover-favoritos">
                               <img src="./Images/icon-download.svg" alt="descargar GIFO" class="hover-descargar">
                               <img src="./Images/icon-max-normal.svg" alt="aumentar GIFO" class="hover-aumentar">
                            </div> 
                               <p class="overlay-user">${data.data[i].username}</p>
                               <p class="overlay-titulo-GIFO"><strong>${data.data[i].title}</strong></p>
                        </div>
                    </div>`;

            resultsContainer[i] += resultsContainerHTML;
        }
        title.innerHTML = input.value[0].toUpperCase() + input.value.slice(1);
        
     })
    .catch(err => console.log(err));
   }

form.addEventListener("submit", function(event) {
  event.preventDefault();
  searchValue = input.value;
  showInput();
});



function showSuggestions() {
   let ulElement = document.getElementById("suggestions");
   ulElement.style.display = "block";
   let apiUrlSuggestions = `https://api.giphy.com/v1/gifs/search/tags?${apiKey}&q=${input.value}&limit=5`;

   fetch(apiUrlSuggestions)
   .then(response => response.json())
   .then(data => {
     ulElement.innerHTML = "";
     data.data.forEach(function(tag) {

       let newLi = document.createElement("li");
       let newImage = document.createElement("img");
       newLi.classList.add("list-suggestions");
       newImage.classList.add("search-icon-gris");
       newImage.src = "./Images/search.svg";

       newLi.append(newImage);
       newLi.innerHTML += tag.name;
       newLi.addEventListener("click", function() {
         searchValue = tag.name;
         showInput();
       })
       ulElement.append(newLi);
     })
   })
   .catch(err => console.log(err));
}

input.addEventListener("keyup", showSuggestions);
// searchIcon.addEventListener("click", showInput);


var galleryImagesDiv = document.getElementById("gallery-images");
        
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

// function trendingGallery() {
//   let apiTrending = `https://api.giphy.com/v1/gifs/trending?${apiKey}&limit=3&rating=g`;
  
  
//    fetch(apiTrending) 
//   .then(response => response.json())
//   .then(data => {
    
//     for(let i = 0 ; i < 3; i++) {

//          var imageContainer = document.createElement("div");
//          var galleryImagesDiv = document.getElementById("gallery-images");
//          var trendingGifos = document.createElement("img");
//          var overlayDiv = document.createElement("div");
//          let overlayLinksDiv = document.createElement("div");
//          overlayLinksDiv.classList.add("overlay-links");
//          overlayDiv.appendChild(overlayLinksDiv);
         
//          let overlayLinkDescarga = document.createElement("img");
//          let overlayLinkFullScreen = document.createElement("img");
//          let overlayLinkFav = document.createElement("img");
//          overlayLinkFav.classList.add("hover-favoritos");
//          overlayLinkFav.src = "./Images/icon-fav.svg";
//          overlayLinkDescarga.classList.add("hover-descargar");
//          overlayLinkDescarga.src = "./Images/icon-download.svg"
//          overlayLinkFullScreen.classList.add("hover-aumentar");
//          overlayLinkFullScreen.src = "./Images/icon-max-normal.svg";
//          overlayLinksDiv.append(overlayLinkFav, overlayLinkDescarga, overlayLinkFullScreen);
         
//          let pElementOne = document.createElement("p");
//          pElementOne.classList.add("overlay-titulo-GIFO");
//          pElementOne.innerHTML = `${data.data[i].username}`;
//          let pElementTwo = document.createElement("p");
//          pElementTwo.classList.add("overlay-user");
//          pElementTwo.innerText = `${data.data[i].title}`
//          overlayDiv.append(pElementOne, pElementTwo);
         
//          imageContainer.classList.add("image-container");
//          overlayDiv.classList.add("overlay");
//          trendingGifos.classList.add("gallery-img");
//          imageContainer.appendChild(trendingGifos);
//          imageContainer.appendChild(overlayDiv);

//          trendingGifos.src = `${data.data[i].images.original.url}`;

//          galleryImagesDiv.appendChild(imageContainer);

//         // trendingGifos.src = trendingGifosSrc;
        
//       }
//      });
// }
// trendingGallery();
 
