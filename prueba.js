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
  let apiTrending = `https://api.giphy.com/v1/gifs/trending?${apiKey}&limit=12&rating=g`;
  
  
   fetch(apiTrending) 
  .then(response => response.json())
  .then(data => {
    
    for(let i = 0 ; i < 12; i++) {
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
  
      }
     })
     .catch(err => console.log(err));
}
trendingGallery();


// var flechaIzq = document.getElementById("arrow-icon");
// var flechaDerecha = document.getElementsByClassName("arrow-icon-active");
// var contenedorImg = document.getElementsByClassName("image-container");
// var imgPage = Math.ceil(contenedorImg.length/3);
// let l = 0;
// let movePer = 25.34;
// let maxMove = 203;

// let right_mover = ()=>{
// 		l = l + movePer;
// 		if (contenedorImg == 1){l = 0; }
// 		for(const i of contenedorImg)
// 		{
// 			if (l > maxMove){l = l - movePer;}
// 			i.style.left = '-' + l + '%';
// 		}

// 	}
// 	let left_mover = ()=>{
// 		l = l - movePer;
// 		if (l<=0){l = 0;}
// 		for(const i of contenedorImg){
// 			if (imgPage>1){
// 				i.style.left = '-' + l + '%';
// 			}
// 		}
// 	}
// flechaIzq.addEventListener("click", left_mover);
// flechaDerecha.addEventListener("click", right_mover);



const containerGifos = document.querySelector(".gallery-images");
const galleryElements = Array.from(document.querySelectorAll(".gallery-img"));
const rightIcon = document.querySelector(".arrow-icon-active");
const leftIcon = document.querySelector(".arrow-icon");
var l = 0;

rightIcon.addEventListener("click", (e) => {
  console.log(e)
l++;
for(var i of galleryElements) {
  if(l=0) {i.style.left = "0px";}
  if(l=1) {i.style.left = "-740px";}
  if(l=2) {i.style.left = "-1480px";}
  if(l=3) {i.style.left = "-2220px";}
  if(l=4) {i.style.left = "-2960px";}
  if(l>3) {l = 3}
}
});

leftIcon.addEventListener("click", (e) => {
  console.log(e)
l--;
for(var i of galleryElements) {
  if(l=0) {i.style.left = "0px";}
  if(l=1) {i.style.left = "-740px";}
  if(l=2) {i.style.left = "-1480px";}
  if(l=3) {i.style.left = "-2220px";}
  if(l<0) {l = 0;}
}
});


















// const RIGHT = "right";
// const LEFT = "left";


// left.addEventListener('click', () => { scroll(LEFT) });
// right.addEventListener('click', () => { scroll(RIGHT) });

//agregar moviemiento a
// function scroll(d
//     const
//     const distanceToSc
//     let scrollAmount = 0;
    
    
//     const slideTimer = setInterval(function() {
//         if (direction === "right") {
//             containerGifos.scrollLeft += step;
//         } else {
//             containerGifos.scrollLeft -= step;
//         }
//         scrollAmount += step;
//         if (scrollAmount >= distanceToScroll) {
//             window.clearInterval(slideTimer);
//         }
//     }, 10);
// }






