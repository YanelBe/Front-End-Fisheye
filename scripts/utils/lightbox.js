//On créé un container pour la lightbox
const lightboxContainer = document.createElement("div");
lightboxContainer.className = "lightbox-container";
//Par défaut, la lightbox ne s'affiche pas
lightboxContainer.style.display = "none";
lightboxContainer.setAttribute("aria-hidden", "true");
//On ajoute la lightbox au document entier
document.body.appendChild(lightboxContainer);

let index = 0;

//Fonction qui affiche la lightbox 
function displayLightbox(mediasList) {
    //On sélectionne les médias vidéos et audio
    const mediasDom = document.querySelectorAll(".media-image, .media-video");

    mediasDom.forEach(media => {
        //Ecoute du clic
        media.addEventListener("click", (event) => {
            const currentMediaTarget = event.target;
            //On récupère le média dans l'array mediasList
            const currentMedia = mediasList.find((media) => media.id == currentMediaTarget.dataset.id)
            index = parseInt(event.target.getAttribute("data-id"));
            getLightboxDOM(currentMedia, index, mediasList);
        });

        //Ecoute du clavier
        media.addEventListener("keydown", (event) => {
            if(event.key === "Enter") {
                const currentMediaTarget = event.target;
                const currentMedia = mediasList.find(media => media.id == currentMediaTarget.dataset.id)
                index = parseInt(event.target.getAttribute("data-id"));
                getLightboxDOM(currentMedia, index, mediasList);
            }
        })
    })
}

//Construction de la lightbox en manipulant le DOM
function getLightboxDOM(currentMedia, index, mediasList) {

    const { photographerId, title, image, video } = currentMedia

    lightboxContainer.innerHTML = "";

    //On utilise la variable lightboxContainer définie plus haut
    lightboxContainer.style.display = "block";
    lightboxContainer.setAttribute("aria-hidden", "false");

    //On créé un div pour la modale d'affichage de la lightbox
    const lightboxModal = document.createElement("div");
    lightboxModal.className = "lightbox-modal";
    lightboxContainer.appendChild(lightboxModal);

    //Média précédent
    const lightboxPrevious = document.createElement("button");
    lightboxPrevious.className = "lightbox-previous";
    lightboxModal.appendChild(lightboxPrevious);
    const previousIcon = document.createElement("i");
    previousIcon.className = "fa-solid fa-chevron-left";
    lightboxPrevious.appendChild(previousIcon);

    //On créé un div pour afficher l'image et le titre du média
    const lightboxMedia = document.createElement("div");
    lightboxMedia.className = "lightbox-media";
    lightboxModal.appendChild(lightboxMedia);

    //Si le média est une image
    if("image" in currentMedia) {
        const lightboxImage = document.createElement("img");
        lightboxImage.className = "lightbox-image";
        lightboxImage.setAttribute("src", `assets/medias/${photographerId}/${image}`);
        lightboxImage.setAttribute("alt", title);
        lightboxImage.dataset.id = index;
        lightboxMedia.appendChild(lightboxImage);
    //Si le média est une vidéo
    } else if ("video" in currentMedia) {
        const lightboxVideo = document.createElement("video");
        const lightboxSourceVideo = document.createElement("source")
        lightboxVideo.className = "lightbox-video";
        lightboxVideo.setAttribute("alt", title);
        lightboxVideo.setAttribute("controls", "");
        lightboxVideo.dataset.id = index;
        lightboxSourceVideo.setAttribute("src", `assets/medias/${photographerId}/${video}`);
        lightboxSourceVideo.setAttribute("type", "video/mp4");
        lightboxMedia.appendChild(lightboxVideo);
        lightboxVideo.appendChild(lightboxSourceVideo);
      }

    //Affichade du titre
    const lightboxTitle = document.createElement("h3");
    lightboxTitle.className = "lightbox-title";
    lightboxTitle.textContent = title;
    lightboxMedia.appendChild(lightboxTitle);

    //Bouton de fermeture de la lightbox
    const lightboxClose = document.createElement("button");
    lightboxClose.className = "lightbox-close";
    lightboxModal.appendChild(lightboxClose);
    const closeIcon = document.createElement("i");
    closeIcon.className = "fa-solid fa-xmark";
    lightboxClose.appendChild(closeIcon);

    //Média suivant
    const lightboxNext = document.createElement("button");
    lightboxNext.className = "lightbox-next";
    lightboxModal.appendChild(lightboxNext);
    const nextIcon = document.createElement("i");
    nextIcon.className = "fa-solid fa-chevron-right";
    lightboxNext.appendChild(nextIcon);

    addEventListeners(mediasList, currentMedia);

    setFocusOnVideo();
}

//Gestion des events
function addEventListeners(mediasList, currentMedia) {
    const lightboxClose = document.querySelector(".lightbox-close");
    const lightboxPrevious = document.querySelector(".lightbox-previous");
    const lightboxNext = document.querySelector(".lightbox-next");

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrevious.addEventListener("click", () => displayPrevious(mediasList, currentMedia));
    lightboxNext.addEventListener("click", () => displayNext(mediasList, currentMedia));


    document.addEventListener("keydown", (event) => {
        switch (event.key) {
          case "ArrowLeft":
            displayPrevious(mediasList, currentMedia);
            break;
          case "ArrowRight":
            displayNext(mediasList, currentMedia);
            break;
          case "Escape":
            closeLightbox();
            break;
        }
    });
}

//Fonction pour mettre le focus sur la vidéo s'il y en a une, pour que la touche espace puisse lire/arrêter la vidéo
function setFocusOnVideo() {
    const lightboxVideo = document.querySelector(".lightbox-video");
    lightboxVideo.focus();
  }

//Fonction pour la fermeture de la lightbox
function closeLightbox() {
    const lightboxContainer = document.querySelector(".lightbox-container");
    lightboxContainer.style.display = "none";
    lightboxContainer.setAttribute("aria-hidden", "true");
}

//Fonction pour gérer l'affichage du média suivant
function displayNext(mediasList, currentMedia) {
    const index = mediasList.findIndex((element) => element.id == currentMedia.id);
    const nextIndex = index === mediasList.length - 1 ? 0 : index + 1;
    const nextMedia = mediasList[nextIndex];

    lightboxContainer.innerHTML = "";
    
    getLightboxDOM(nextMedia, nextIndex, mediasList);
}
//Fonction pour gérer l'affichage du média précédent
function displayPrevious(mediasList, currentMedia) {
    const index = mediasList.findIndex((element) => element.id == currentMedia.id);
    const previousIndex = index === 0 ? mediasList.length - 1 : index - 1;
    const previousMedia = mediasList[previousIndex];

    lightboxContainer.innerHTML = "";
    
    getLightboxDOM(previousMedia, previousIndex, mediasList);
}