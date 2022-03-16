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
var modalSpan = document.querySelectorAll(".close-modal")[0];


var imageAumentada = document.getElementById("img-aumentada");
var modalUser = document.getElementById("modal-user");
var modalTitle = document.getElementById("modal-titulo-gifo");


function showModal(url, user, title) {
  imageAumentada.src = url;
  modalUser.innerText = user; 
  modalTitle.innerText = title;
  modal.style.display = "block"; 
}

function closeModal() {
  modal.style.display = "none";
}


 modalSpan.addEventListener("click", closeModal);


// Function Gifos Container

 function gifContainer(info) {

  let gif_container =  `<div class="result-template">
                        <img src="${info.url}" alt="${info.title}" class="imagen-prueba">
                        <div class="overlay">
                            <div class="overlay-links">
                               <img src="./Images/icon-fav.svg" alt="agregar a Favoritos" data-img = "${info.url}" data-user = "${info.username}" data-title = "${info.title}" class="hover-favoritos add-to-favoritos">
                               <img src="./Images/icon-download.svg" alt="descargar GIFO" class="hover-descargar">
                               <img src="./Images/icon-max-normal.svg" data-img = "${info.url}" data-user = "${info.username}" data-title = "${info.title}" alt="aumentar GIFO" class="hover-aumentar">
                            </div> 
                               <p class="overlay-user" data-user = "${info.username}">${info.username}</p>
                               <p class="overlay-titulo-GIFO"><strong>${info.title}</strong></p>
                        </div>
                    </div>`;


  return gif_container;
}

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
              
            info = {}
            info.url = data.data[i].images.original.url;
            info.title = data.data[i].title;
            info.username = data.data[i].username;

            resultsContainer.innerHTML += gifContainer(info);
          }
          title.innerHTML = input.value[0].toUpperCase() + input.value.slice(1);
    })
     .then(data => {
       addModalEvent();
       saveToFavoritos();
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
            
            info = {}
            info.url = data.data[i].images.original.url;
            info.title = data.data[i].images.title;
            info.username = data.data[i].images.username;

              resultsContainer.innerHTML += gifContainer(info);
           }
     })
     .then(data => {
       addModalEvent();
       saveToFavoritos();
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

          info = {};
          info.url = data.data[i].images.original.url;
          info.title = data.data[i].title;
          info.username = data.data[i].username;

          galleryImagesDiv.innerHTML += gifContainer(info);
          
         
          let imagenPrueba = document.querySelector(".imagen-prueba")
          let resultTemplate = document.querySelector(".result-template");
          resultTemplate.classList.remove("result-template");
          resultTemplate.classList.add("image-container");
          imagenPrueba.classList.remove("imagen-prueba");
          imagenPrueba.classList.add("gallery-img");
      }
     })
     .then(data => {
       addModalEvent();
       saveToFavoritos();
    })
    .catch(err => console.log(err));
  }
  trendingGallery();


  
  function addModalEvent() { // how does it know the img I'm pressing is the one it should display in the modal?

  var iconAumentarOverlay = document.getElementsByClassName("hover-aumentar"); 

  for(var i = 0; i < iconAumentarOverlay.length; i++) {
  iconAumentarOverlay[i].addEventListener("click", e => {
      var myUrl = e.target.getAttribute("data-img");
      var myUser = e.target.getAttribute("data-user");
      var myTitle = e.target.getAttribute("data-title");
    showModal(myUrl, myUser, myTitle);
  });
  }}

  

//Trending Gallery Slider

const galleryDiv = document.querySelector(".gallery-images");
const rightArrow = document.querySelector(".arrow-icon-active");
const leftArrow = document.querySelector(".arrow-icon");
const rightArrowDarkMode = document.querySelector("#arrow-right-modo-noc");
const leftArrowDarkMode = document.querySelector("#arrow-left-modo-noc");

rightArrow.addEventListener("click", () => {
  galleryDiv.scrollLeft += galleryDiv.offsetWidth;
});
rightArrowDarkMode.addEventListener("click", () => {
  galleryDiv.scrollLeft += galleryDiv.offsetWidth;
});


leftArrow.addEventListener("click", () => {
  galleryDiv.scrollLeft -= galleryDiv.offsetWidth;
});
leftArrowDarkMode.addEventListener("click", () => {
  galleryDiv.scrollLeft += galleryDiv.offsetWidth;
});



// Add Gifos to Favoritos

var resultTemplate = [];
var addToFavoritos = document.getElementsByClassName("add-to-favoritos");
const LOCAL_STORAGE_KEY = "FAVORITOS_STORAGE";


function saveToFavoritos () {
  
  for(let i=0; i < addToFavoritos.length; i++) {
      addToFavoritos[i].addEventListener("click", e => {
         
        arrayFavoritos = loadFavoritos();
        var objetoGifo = {} 
        objetoGifo.myUrl = e.target.getAttribute("data-img");
        objetoGifo.myUser = e.target.getAttribute("data-user");
        objetoGifo.myTitle = e.target.getAttribute("data-title");
        e.preventDefault()
       
        
        var r = 0;
        for(let i = 0; i < arrayFavoritos.length; i++) {
          if(arrayFavoritos[i].myUrl == objetoGifo.myUrl) {
            r = 1;
          }
        }
        if(r == 0) {
          arrayFavoritos.push(objetoGifo);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(arrayFavoritos));
        }
        });
      }
    }
              
            
            var galleryFavoritos = document.getElementById("gallery-favoritos");
            
            function loadFavoritos() {
              const gifoValue = localStorage.getItem(LOCAL_STORAGE_KEY);
              const gifFavoritos =  JSON.parse(gifoValue) || [];
              return gifFavoritos;
              }

             function displayInFavoritos() {
              const gifo = localStorage.getItem(LOCAL_STORAGE_KEY).JSON.parse(array)
             }
            
          
        


