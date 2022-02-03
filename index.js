// Menu 
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

// Modal 

var modal = document.getElementById("modal");
var modalSpan = document.getElementsByClassName("close-modal")[0];


var imageAumentada = document.getElementById("img-aumentada");
var modalUser = document.getElementById("modal-user");


function showModal(url, user) {
 modalUser.innerText = user; 
  imageAumentada.src = url;
  modal.style.display = "block";  
}
function closeModal() {
  modal.style.display = "none";
}

modalSpan.addEventListener("click", closeModal);

//Trending Examples 

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
      trendingHomeHTML += UpperCaseTrending;
    }
    trendingHome.innerHTML += trendingHomeHTML;
    });
}
trendingExamplesHome();


// Search form

var form = document.querySelector("#search-form");
var apiKey = `&api_key=OmE7QZS97YExac8Bv5bjnEPvgPK9fhh8`;
var input = document.querySelector("#search-text-input");
var searchValue = "";
var btnVerMas = document.getElementById("button-ver-mas");

function showInput() {
    
    var apiUrl = `https://api.giphy.com/v1/gifs/search?${apiKey}&q=${input.value}&limit=12`;
    let resultsContainer = document.getElementById("results-container");
    let title = document.getElementById("title");
    btnVerMas.classList.add("show-btn-ver-mas");
    resultsContainer.innerHTML = "";
    
    
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
                               <img src="./Images/icon-max-normal.svg" data-img = "${data.data[i].images.original.url}" alt="aumentar GIFO" class="hover-aumentar">
                            </div> 
                               <p class="overlay-user">${data.data[i].username}</p>
                               <p class="overlay-titulo-GIFO"><strong>${data.data[i].title}</strong></p>
                        </div>
                    </div>`;

                    resultsContainer[i] += resultsContainerHTML;
        }
        title.innerHTML = input.value[0].toUpperCase() + input.value.slice(1);
        
        

     })
     .then(data => {
       addModalEvent();
     })
    .catch(err => console.log(err));
   }

form.addEventListener("submit", function(event) {
  event.preventDefault();
  showInput(searchValue);
});

// Ver Más Button

   btnVerMas.addEventListener("click", (e) => {
     e.preventDefault();
     var apiUrl = `https://api.giphy.com/v1/gifs/search?${apiKey}&q=${input.value}&limit=25`;
     let resultsContainer = document.getElementById("results-container");
     btnVerMas.style.display = "none"; 

     fetch(apiUrl)
     .then(response => response.json())
     .then(data => {

           for(let i = 13; i < 25; i++) {
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
     })
     .catch(err => console.log(err))

   })

// Dropdown Suggestions

function showSuggestions() {
   let ulElement = document.getElementById("suggestions");
   

   if(input.value == "") {
     ulElement.style.display = "none";
   } else {
    
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
         showInput(tag.name);
         input.value = tag.name;
         const element = document.querySelector('#results')
        const topPos = element.getBoundingClientRect().top + window.pageYOffset

window.scrollTo({
  top: topPos, // scroll so that the element is at the top of the view
  behavior: 'smooth' // smooth scroll
})
         
       })
       ulElement.append(newLi);
     })
   })
   .catch(err => console.log(err));
}
   }
input.addEventListener("keyup", showSuggestions);

// Trending Gallery Images

var galleryImagesDiv = document.getElementById("gallery-images");
        
function trendingGallery() {
  let apiTrending = `https://api.giphy.com/v1/gifs/trending?${apiKey}&limit=12&rating=g`;
  
  
  fetch(apiTrending) 
  .then(response => response.json())
  .then(data => {
    
    for(let i = 0 ; i < 12; i++) {
         let trendingGifosHTML = "";

      galleryImagesDiv.innerHTML += `<div class="image-container">
     <img class="gallery-img" src=${data.data[i].images.original.url} alt="${data.data[i].title}">
                 
     <div class="overlay">
      <div class="overlay-links">
        <a href="#"><img src="./Images/icon-download.svg" alt="Descargar GIFO"></a>
        <a href="#"><img class="add-to-favoritos" src="./Images/icon-fav.svg" alt="Agregar a favoritos"></a>
        <a href="#"><img class="hover-aumentar" data-img = "${data.data[i].images.original.url}" src="./Images/icon-max-normal.svg" alt="Aumentar GIFO"></a>
      </div>
        <p class="overlay-user" data-user = "${data.data[i].username}">${data.data[i].username}</p>
        <p class="overlay-titulo-GIFO"><strong>${data.data[i].title}</strong></p>
     </div>
  </div>`;

  galleryImagesDiv[i] += trendingGifosHTML;
      }
     })
     .then(data => {
       addModalEvent();
    })
    .catch(err => console.log(err));
  }
  trendingGallery();


  
  function addModalEvent() { // how does it know the img I'm pressing is the one it should display in the modal?
   
  var iconAumentarOverlay = document.getElementsByClassName("hover-aumentar"); 
  for(var i = 0; i < iconAumentarOverlay.length; i++) {
  var myUrl = iconAumentarOverlay[i].getAttribute("data-img");
  var myUser = iconAumentarOverlay[i].getAttribute("data-user");
  iconAumentarOverlay[i].addEventListener("click", () => {
    showModal(myUrl, myUser);
  });
  }}

  

//Trending Gallery Slider

const galleryDiv = document.querySelector(".gallery-images");
const rightArrow = document.querySelector(".arrow-icon-active");
const leftArrow = document.querySelector(".arrow-icon");

rightArrow.addEventListener("click", () => {
  galleryDiv.scrollLeft += galleryDiv.offsetWidth;
});

leftArrow.addEventListener("click", () => {
  galleryDiv.scrollLeft -= galleryDiv.offsetWidth;
});

//Crear Gifos 

// var plusSign = document.getElementById("plus-sign");
// plusSign.addEventListener("click", (e) => {
//   plusSign.src = "./Images/CTA-crear-gifo-hover";
//   console.log(e)
// })


// const btnComenzar = document.getElementById("comenzar");
// const numberOne = document.getElementById("number-one");
// const tituloCamara = document.getElementById("titulo-camara");
// const textoCamara = document.getElementById("texto-camara");

// btnComenzar.addEventListener("click", e => {
//   e.preventDefault();
//   btnComenzar.style.display = "none";
//   numberOne.classList.add("number-one-hover");
//   tituloCamara.innerText = "¿Nos das acceso a tu cámara?";
//   textoCamara.innerText = "El acceso a tu cámara será válido sólo por el tiempo en el que estés creando el GIFO";
// });


// Add Gifos to Favoritos

// var addToFavoritos = document.querySelectorAll(".add-to-favoritos");

// function saveToFavoritos () {

// for(let i=0; i < addToFavoritos.length; i++) {
//   addToFavoritos[i].addEventListener("click", e => {
//     localStorage.setItem("url", JSON.parse(gif-container))
    
//     });
// }}


//puedo usar document.addEventListener("click", (e)) => {
// let btnFavoritos = 
// ler gifConatiner = 
// if (e.target !=== btnFavoritos) return
// localStorage.setItem(LOCAL_STORAGE_KEY, gifContainer)
//}