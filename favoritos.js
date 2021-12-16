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

 
