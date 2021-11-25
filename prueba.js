
function trendingExamplesHome() {
  let trendingHome = document.getElementById("trending-examples");
  let apiKey = `&api_key=OmE7QZS97YExac8Bv5bjnEPvgPK9fhh8`;
  let trendingHomeHTML = '';
  let trendingImages = document.getElementsByClassName("gallery-img");
  
  let apiTrending = `https://api.giphy.com/v1/gifs/trending?${apiKey}&q=cat&limit=5`;
  fetch(apiTrending)
  .then(response => response.json())
  .then(data => {
    data.data.forEach(function(obj) {
      console.log(obj.title);
      trendingHomeHTML += `${obj.title}, `;
      
    })
    trendingHome.innerHTML = trendingHomeHTML;
  });
}
trendingExamplesHome(); 


function showInput(event) {
  event.preventDefault();
  let input = document.querySelector("#search-text-input");
  let apiKey = `&api_key=OmE7QZS97YExac8Bv5bjnEPvgPK9fhh8`;
  let apiUrl = `https://api.giphy.com/v1/gifs/search?${apiKey}&q=${input.value}&limit=12`;
  let imageContainer = document.getElementsByClassName("image-container");
  let imageContainerHTML = '';
  let h4 = document.getElementById("title");
  let imagenPrueba = document.getElementById("imagen-prueba");
  
  
  fetch(apiUrl)         
   .then(response => response.json())
   .then(data =>  {
     data.data.forEach(function (input) {
       console.log(input.images.original.url)
       imageContainerHTML += `${input.images.original.url}`;
     })
     imagenPrueba.setAttribute("src", imageContainerHTML);
     h4.innerHTML = input.value;
     })
  .catch(err => console.log(err));
   }

// let oldNode = document.getElementsByClassName("image-container");
// let newNode = oldNode.cloneNode();
// newNode.find("#image-prueba").src = data[0].images.original.url;
// let contenedor = getElementsByClassName("gallery-img");
// contenedor.append(newNode);  
function showSuggestions() {
document.getElementById("suggestions").style.display = "block"
}


let form = document.querySelector("#form");
form.addEventListener("submit", showInput);
form.addEventListener("onkeyup", showSuggestions);



// function abrirModal() {
// modal.style.display = "block";
// }
// function cerrarModal() {
//   modal.style.display = "none";
// }

// let modal = document.getElementById("modal");
// let image = document.getElementById("image");
// let span = document.getElementsByClassName("close-modal")[0];
// image.addEventListener("click", abrirModal);
// span.addEventListener("click", cerrarModal);


  