var input = document.querySelector("#search-text-input");
var apiKey = `&api_key=OmE7QZS97YExac8Bv5bjnEPvgPK9fhh8`;

var form = document.querySelector("#search-form");
var searchValue = "";
var btnVerMas = document.getElementById("button-ver-mas");

function trendingExamplesHome() {
  let trendingHome = document.getElementById("trending-examples");
  let apiKey = `&api_key=OmE7QZS97YExac8Bv5bjnEPvgPK9fhh8`;
  let trendingHomeHTML = '';
  let apiTrending = `https://api.giphy.com/v1/trending/searches?${apiKey}`;
  
     fetch(apiTrending)
  .then(response => response.json())
  .then(data => { 

  for (let i = 0; i < 5 ; i++) {
      trendingHomeHTML += `${data.data[i]}, `;
  }
    trendingHome.innerHTML = trendingHomeHTML;
  });
}
trendingExamplesHome(); 


function showInput() {
    
    var apiUrl = `https://api.giphy.com/v1/gifs/search?${apiKey}&q=${input.value}&limit=25`;
    let resultsContainer = document.getElementById("results-container");
    let resultsSections = document.getElementById("results");
    let title = document.getElementById("title");
   
    btnVerMas.classList.add("show-btn-ver-mas");
    
    
fetch(apiUrl)         
    .then(response => response.json())
    .then(data =>  {
      
      for(let i = 0; i<12; i++) {
              let resultsContainerHTML = "";
            info = {}
            info.url = data.data[i].images.original.url;
            info.title = data.data[i].title;
            info.username = data.data[i].username;
              
              resultsContainer.innerHTML += gifContainer(info); 

            resultsContainer[i] += resultsContainerHTML;
        }
        title.innerHTML = input.value;
        if(input.value === "") {
          resultsSections.style.display = "none";
        } else {
          resultsSections.style.display = "block";
        }
        
     })
    .catch(err => console.log(err));
   }

   // Show more button

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

function showSuggestions() {
    
    var ulElement = document.getElementById("suggestions");
    ulElement.style.display = "block";
    let apiUrlSuggestions = `https://api.giphy.com/v1/gifs/search/tags?${apiKey}&q=${input.value}&limit=5`;
    
   fetch(apiUrlSuggestions)         
   .then(response => response.json())
   .then(data =>  {
       ulElement.innerHTML = "";
     data.data.forEach(function (tag) {
         
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

form.addEventListener("submit",function(event) {
    event.preventDefault();
    searchValue = input.value;
    showInput();
});
input.addEventListener("keyup", showSuggestions);












var galleryImagesDiv = document.getElementById("gallery-images");
        
  function trendingGallery() {

  let apiTrending = `https://api.giphy.com/v1/gifs/trending?${apiKey}&limit=12&rating=g`;
  
  
   fetch(apiTrending) 
  .then(response => response.json())
  .then(data => {
    
    for(let i = 0 ; i < 12; i++) {
         let trendingGifosHTML = "";

      galleryImagesDiv.innerHTML += `<div data-img class="image-container">
     <img class="gallery-img" id="prueba-modal" src=${data.data[i].images.original.url} alt="${data.data[i].title}">
                 
     <div class="overlay">
      <div class="overlay-links">
        <a href="#"><img src="./Images/icon-download.svg" alt="Descargar GIFO"></a>
        <a href="#"><img class="hover-favoritos" src="./Images/icon-fav.svg" alt="Agregar a favoritos"></a>
        <a href="#"><img class="hover-aumentar" src="./Images/icon-max-normal.svg" alt="Aumentar GIFO"></a>
      </div>
        <p class="overlay-user">${data.data[i].username}</p>
        <p class="overlay-titulo-GIFO"><strong>${data.data[i].title}</strong></p>
     </div>
  </div>`;

  galleryImagesDiv[i] += trendingGifosHTML;
}
})
.then(data => {
  
  // document.addEventListener("click", e => {
  //   if (!e.target.matches(".icon-favoritos")) return
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(galleryImagesDiv) )
  //   console.log(localStorage)
  // })

})
.catch(err => console.log(err));
}
trendingGallery();
  
  
// gallery carrousel 

const galleryDiv = document.querySelector(".gallery-images");
const rightArrow = document.querySelector(".arrow-icon-active");
const leftArrow = document.querySelector(".arrow-icon");

rightArrow.addEventListener("click", () => {
  galleryDiv.scrollLeft += galleryDiv.offsetWidth;
});

leftArrow.addEventListener("click", () => {
  galleryDiv.scrollLeft -= galleryDiv.offsetWidth;
});

// var iconAumentarOverlay = document.getElementsByClassName("hover-aumentar"); 
//   for(var i = 0; i < iconAumentarOverlay.length; i++) {
//   var myUrl = iconAumentarOverlay[i].getAttribute("data-img");
//   var myUser = iconAumentarOverlay[i].getAttribute("data-user");
//   iconAumentarOverlay[i].addEventListener("click", () => {
//     showModal(myUrl, myUser);

var iconAddFavoritos = Array.from(document.getElementsByClassName("hover-favoritos"));
iconAddFavoritos.forEach((element) => {
element.addEventListener("click", e => {
  e.preventDefault();
  console.log(e)
})
})
// for (let i = 0; i< iconAddFavoritos.length; i++) {
//   iconAddFavoritos[i].addEventListener("click", e => {
//     console.log(iconAddFavoritos[i]);
//   })
// }

// const LOCAL_STORAGE_KEY = "FAVORITOS_GIFOS"
// function favoritos() {
//   document.addEventListener("click", e => {
//     if (!e.target.matches(".icon-favoritos")) return
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trendingGifosHTML) )
//     localStorage.getItem(JSON.parse(LOCAL_STORAGE_KEY));
//   })
// }

  // function saveCart() {
  //   sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart))
  //   }

  //   function loadCart() {
  //   const cart = sessionStorage.getItem(SESSION_STORAGE_KEY)
  //   return JSON.parse(cart) || [] // If there's nothing in out session storage, we will default into an empty array
  //   }


  // function addModalEvent() { // how does it know the img I'm pressing is the one it should display in the modal?
   
  // var iconAumentarOverlay = document.getElementsByClassName("hover-aumentar"); 
  // for(var i = 0; i < iconAumentarOverlay.length; i++) {
  // var myUrl = iconAumentarOverlay[i].getAttribute("data-img");
  // var myUser = iconAumentarOverlay[i].getAttribute("data-user");
  // iconAumentarOverlay[i].addEventListener("click", () => {
  //   showModal(myUrl, myUser);
  // });
  // }}


// function showModal(url, user) {
//  modalUser.innerText = user; 
//   imageAumentada.src = url;
//   modal.style.display = "block";  
// }


         

          
          function gifContainer(info) {

  let gif_container =   `<div class="result-template">
                        <img src="${info.url}" alt="${info.title}" class="imagen-prueba">
                        <div class="overlay">
                            <div class="overlay-links">
                               <img src="./Images/icon-fav.svg" alt="agregar a Favoritos" class="hover-favoritos">
                               <img src="./Images/icon-download.svg" alt="descargar GIFO" class="hover-descargar">
                               <img src="./Images/icon-max-normal.svg" alt="aumentar GIFO" class="hover-aumentar">
                            </div> 
                               <p class="overlay-user">${info.username}</p>
                               <p class="overlay-titulo-GIFO"><strong>${info.title}</strong></p>
                        </div>
                    </div>`;

  return gif_container;
}









