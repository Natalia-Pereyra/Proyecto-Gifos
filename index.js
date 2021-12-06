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
var iconAumentarOverlay = document.getElementById("hover-aumentar");
var modalSpan = document.getElementsByClassName("close-modal")[0];

function showModal() {
  let imageAumentada = document.getElementsByClassName("image-aumentada");
  modal.style.display = "block";

}

function closeModal() {
  modal.style.display = "none";
}

iconAumentarOverlay.addEventListener("click", showModal);
modalSpan.addEventListener("click", closeModal);




function trendingExamplesHome() {

  let trendingHome = document.getElementById("trending-examples");
  let apiKey = `&api_key=OmE7QZS97YExac8Bv5bjnEPvgPK9fhh8`;
  let trendingHomeHTML = '';
  let apiTrending = `https://api.giphy.com/v1/trending/searches?${apiKey}`;

  fetch(apiTrending)
  .then(response => response.json())
  .then(data => {

    for (let i = 0; i < 5; i++) {
      trendingHomeHTML += `${data.data[i]}, `;
    }
    trendingHome.innerHTML = trendingHomeHTML;
  });
}
trendingExamplesHome();


var form = document.querySelector("#search-form");
var searchValue = "";
var apiKey = `&api_key=OmE7QZS97YExac8Bv5bjnEPvgPK9fhh8`;
var input = document.querySelector("#search-text-input");

function showInput() {
  let apiUrl = `https://api.giphy.com/v1/gifs/search?${apiKey}&q=${searchValue}&limit=12`;
  let resultsContainer = document.getElementById("results-container");
  let resultsContainerHTML = '';
  let title = document.getElementById("title");
  

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    resultsContainer.innerHTML = "";
     data.data.forEach(function (input) {
            var templateImage = document.createElement("img");
            templateImage.classList.add("imagen-prueba");
            templateImage.src = `${input.images.fixed_width.url}`;

            let resultTemplateDiv = document.createElement("div");
            resultTemplateDiv.classList.add("result-template");
            resultsContainer.appendChild(resultTemplateDiv);
            resultTemplateDiv.appendChild(templateImage);
             
            let overlayDiv = document.createElement("div");
            overlayDiv.classList.add("overlay");
            resultTemplateDiv.appendChild(overlayDiv);

            let overlayLinksDiv = document.createElement("div");
            overlayLinksDiv.classList.add("overlay-links");
            overlayDiv.appendChild(overlayLinksDiv);

            let overlayLinkFav = document.createElement("img");
            let overlayLinkDescarga = document.createElement("img");
            let overlayLinkFullScreen = document.createElement("img");
            overlayLinkFav.classList.add("hover-favoritos");
            overlayLinkFav.src = "./Images/icon-fav.svg";
            overlayLinkDescarga.classList.add("hover-descargar");
            overlayLinkDescarga.src = "./Images/icon-download.svg"
            overlayLinkFullScreen.classList.add("hover-aumentar");
            overlayLinkFullScreen.src = "./Images/icon-max-normal.svg";
            overlayLinksDiv.append(overlayLinkFav, overlayLinkDescarga, overlayLinkFullScreen);

            let pElementOne = document.createElement("p");
            pElementOne.classList.add("overlay-titulo-GIFO");
            pElementOne.innerText = input.value;
            let pElementTwo = document.createElement("p");
            pElementTwo.classList.add("overlay-user");
             overlayDiv.append(pElementOne, pElementTwo);
    
            console.log(input);
        })
        title.innerHTML = input.value;
        
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

