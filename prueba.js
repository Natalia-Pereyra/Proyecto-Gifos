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
                resultsContainer.innerHTML = "";
        data.data.forEach(function (input) {
            

            var templateImage = document.createElement("img");
            templateImage.classList.add("imagen-prueba");
            templateImage.src = `${input.images.original.url}`;

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


function trendingGallery() {
     let apiTrending = `https://api.giphy.com/v1/gifs/search?${apiKey}`;
     let imageContainer = document.createElement("div");
     imageContainer.classList.add("image-container");
    let overlayDiv = document.createElement("div");
     overlayDiv.classList.add("overlay");
     let trendingGifos = document.createElement("img");
     trendingGifos.classList.add("gallery-img");
     imageContainer.append(trendingGifos, overlayDiv);

     fetch(apiTrending) 
     .then(response => response.json())
     .then(data => {
      
      for(let i = 0 ; i < 3; i++) {
        trendingGifos.src += `${data.data[i].images.original.url}`;
            }
            console.log(data);
     });
}
trendingGallery();
 
  //       <div class="image-container">
  //           <img class="gallery-img" id="prueba-modal" src="./Images/card-busqueda-13.png" alt="">
    
  //           <div class="overlay">
  //             <div class="overlay-links">
  //               <a href="#"><img src="./Images/icon-fav.svg" alt="Agregar a favoritos"></a>
  //               <a href="#"><img src="./Images/icon-download.svg" alt="Descargar GIFO"></a>
  //               <a href="#"><img src="./Images/icon-max-normal.svg" alt="Aumentar GIFO"></a>
  //             </div>
  //             <p class="overlay-titulo-GIFO"><strong>título GIFO</strong></p>
  //             <p class="overlay-user">User</p>
  //           </div>
  //         </div> 




