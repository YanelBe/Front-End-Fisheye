//On récupère l'id du photographe dans l'url de la page avec searchParams
const photographerId = new URLSearchParams(window.location.search).get("id");
//On créé un array qui va contenir tous les média de la page
let mediasList = [];
//Variable pour définir le nom du photographe à ajouter, qu'on utilisera comme paramètre pour la modale de contact
let namePhotographer;
//Variable à utiliser pour vérifier si le dropdown menu est ouvert ou non
let isOpen = false;

//On récupère les infos des photographes avec une fonction asynchrone
async function getPhotographer() {
  //On récupère les données du .json
	const response = await fetch("../../data/photographers.json");
  const data = await response.json();

  //On retourne les informations de l'ID correspondant
	const photographer = data.photographers.filter(function(photographer) {
    //Si l'ID du photographe correspond à l'ID obtenu avec searchParams, on retourne les infos du photographe
		if(photographer.id == photographerId) {
      namePhotographer = photographer.name;
			return true;
		}
	});

	return photographer[0]; 
}



/******  Medias  ******/


//On récupère les médias des photographes avec une fonction asynchrone
async function getMedias() {
  //On récupère les données du .json
  const response = await fetch ("../../data/photographers.json")
  const data = await response.json();

  //Si l'ID du photographe correspond à l'ID obtenu avec searchParams, on retourne les médias associés au photographe
  const medias = data.media.filter((media) => media.photographerId == photographerId);
  return medias;
}

//On affiche les médias
function displayMedia(medias) {
  const photographerGallery = document.querySelector(".media-gallery");
  photographerGallery.innerHTML = "";
  
  //Pour chaque méia, on applique la factory function appropriée
  medias?.forEach(media => {
    const userMedia = new mediaFactory(media);     
    const userMediaDOM = userMedia.getUserMediaDOM();
    photographerGallery.appendChild(userMediaDOM);
    mediasList.push(media)
  });
  
}



/******  Filtres  ******/


//Fonction pour afficher les filtres
function displayFilters() {
  const selected = document.querySelector(".selected");
  
  selected.onclick = () => {
    //Si la box des filtres est déjà déroulée, lors du clic sur une seléction, elle se referme
    if(isOpen) {
      closeFilters();
      //Sinon, la box s'ouvre
    } else {
      openFilters();
    }
  }
}

//Fonction pour gérer l'ouverture des filtres
function openFilters() {
  const filterOptionsContainer = document.querySelector(".filter-options-container");
  const icon = document.querySelector(".icon-filter");

  filterOptionsContainer.style.display = "flex";
  filterOptionsContainer.setAttribute("aria-expanded", "true");
  icon.classList.add("icon-rotate");
  filterOptionsContainer.classList.add("open");
  isOpen = true;
}

//Fonction pour fermer la box des filtres
function closeFilters() {
  const filterOptionsContainer = document.querySelector(".filter-options-container");
  const icon = document.querySelector(".icon-filter");

  filterOptionsContainer.style.display = "none";
  filterOptionsContainer.setAttribute("aria-expanded", "false");
  icon.classList.remove("icon-rotate");
  filterOptionsContainer.classList.remove("open");
  isOpen = false
}



//Fonction pour trier les médias dans un ordre spécifique
function sortMedias(medias) {
  const filterOptions = document.querySelectorAll(".filter-option");
  const selected = document.querySelector(".selected");

  //On trie les médias en nombre de likes (popularité) par défaut
  //On créé une variable car on réutilisera ce code dans un switch plus bas
  const sortByLikes = (media1, media2) => media2.likes - media1.likes;

  medias = medias?.sort(sortByLikes);

  //On utilise ici les fonctions d'affichage des médias et de la lightbox
  //Cela permet lors de l'init final de ne pas avoir à rappeler ces fonctions, et d'afficher directement les médias triés
  displayMedia(medias);
  displayLightbox(mediasList);

  //Pour chaque filtre, lorsqu'on clique dessus, on active un switch
  //Le switch va trier les média avec la méthode sort()
  filterOptions?.forEach((filter) => {
    filter.onclick = (event) => {
      const clickedFilter = event.target;

      switch (clickedFilter.textContent) {
        //On réutilise le code précédent par défaut ici
        case "Popularité":
          medias = medias?.sort(sortByLikes);
          break;

        //On trie par date
        case "Date":
          medias = medias?.sort((media1, media2) => new Date(media2.date) - new Date(media1.date));
          break;
          
        //La méthode localeCompare() 
        case "Titre":
          medias = medias?.sort((media1, media2) => media1.title.localeCompare(media2.title));
          break;
      }

      //On change le texte du filtre en fonction de sa sélection
      const buttonSelected = filter.textContent
      filter.textContent = selected.textContent
      selected.textContent = buttonSelected;

      //On lance la fonction de fermeture des filtres une fois qu'un filtre est sélectionné
      closeFilters()

      //Lors du clic sur un filtre, on relance la fonction pour qu'elle réaffiche les médias dans le bon ordre
      displayMedia(medias);

      //On rappelle la fonction pour pouvoir liker de nouveau une photo
      incrementLikes();

      //On relance également la fonction displayLightBox(), sinon la lightbox ne s'ouvrira pas une fois les médias triés de nouveau
      displayLightbox(mediasList);
      
    }
    
  })

}



/****** Likes ******/


//Fonction pour afficher l'encart contenant le nombre total de likes du photographe, et le tarif journalier
function stickyElement(photographer) {

  //On sélectionne le div HTML qui va contenir l'encart
  const sticky = document.querySelector(".sticky");

  //On créé un div qui va contenir le nombre de likes (dans un p), ainsi que l'icône des likes (dans un i)
  const likes = document.createElement("div");
  likes.className = "sticky-likes";

  //On créé un p pour afficher le nombre de likes
  const likesText = document.createElement("p");
  likes.appendChild(likesText);

  //On créé le coeur d'icone de likes avec Font Awesome
  const likesIcon = document.createElement("i");
  likesIcon.className = "fa-solid fa-heart";
  likes.appendChild(likesIcon);

  //On affiche le tarif journalier dans un span
  const price = document.createElement("span");
  price.textContent = photographer.price + "€/jour";

  sticky.appendChild(likes);
  sticky.appendChild(price);

  return sticky;
}


//Fonction pour récupérer le nombre total de likes
function getLikes(media) {
  const likes = document.querySelector(".sticky-likes p");
  let sum = 0;
  //Pour chaque media, on additionne le nombre de likes pour obtenir le nombre total de likes
  media?.forEach(like => {
    sum += like.likes
  });
  
  likes.textContent = sum;
  return sum;
}


//Fonction pour ajouter ou retirer un like
function incrementLikes() {
  const likesIcon = document.querySelectorAll(".icon-heart");
  const getLikes = document.querySelector(".sticky-likes p");

  //Pour chaque clic/appui sur le bouton like, la fonction increment() est exécutée, qui enlèvera ou ajoutera un like
  likesIcon.forEach((like) => {
    //Ecoute de l'event click sur l'icône de like
    like.addEventListener("click", () => increment(like));
    //Ecoute de l'event keydown pour l'accessibilité au clavier
    like.addEventListener("keydown", (e) => {
      if (e.key === "Enter") increment(like);
    });
  });

  //Fonction pour incrémenter les likes sur le média liké, et sur l'encart du nombre total de likes
  function increment(like) {

    //On fait référence à l'élément qui affiche le nombre de likes
    const likeText = like.previousElementSibling;
    //Si l'élément contient la classe liked
    const isLiked = likeText.classList.contains("liked");

    likeText.classList.toggle("liked");
    //Si la classe contient déjà like, on enlève un like, sinon, on en rajoute. On remplace également l'icône de like
    likeText.textContent = isLiked ? Number(likeText.textContent) - 1 : Number(likeText.textContent) + 1;
    getLikes.textContent = isLiked ? Number(getLikes.textContent) - 1 : Number(getLikes.textContent) + 1;
    like.classList.toggle("fa-regular");
    like.classList.toggle("fa-solid");

  }
}



/****** Init  ******/


//La fonction asynchrone init attend de récupérer les informations requises avant d'exécuter les autres fonctions
async function init() {
    //On attend de recevoir les informations du photographe
    const photographer = await getPhotographer();

    //On attend de recevoir les médias
    const medias = await getMedias();

    //On affiche les informations du header de la page du photographe
    const photographerData = photographerFactory(photographer);
    photographerData.getPhotographerHeader();

    //On récupère le nom du photographe pour l'afficher sur la modale de contact
    getPhotographerName(namePhotographer);
    
    //On utilise sortMedias() qui contient les fonctions d'affichage des média, et va afficher tous les médias dans l'ordre
    sortMedias(medias);
    
    //La fonction displayFilters affiche ou enlève le menu des filtres
    displayFilters()

    //La fonction affiche l'encart du prix et des likes
    stickyElement(photographer);

    //On récupère les likes de chaque média
    getLikes(medias);

    //On appelle la fonction servant à incrémenter les likes
    incrementLikes();
  
  };  
  
init();