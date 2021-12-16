var input = document.querySelector("#search-text-input");
var apiKey = `&api_key=OmE7QZS97YExac8Bv5bjnEPvgPK9fhh8`;

var form = document.querySelector("#search-form");
var searchValue = "";

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
        title.innerHTML = input.value;
        
     })
    .catch(err => console.log(err));
   }

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






