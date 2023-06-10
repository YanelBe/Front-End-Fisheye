function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes } = data;

    //Variables pour afficher les médias associés aux photographes
    const images = `assets/medias/${photographerId}/${image} `;
    const videos = `assets/medias/${photographerId}/${video} `;

    //Cette fonction va manipuler le DOM pour afficher les médias associés à un photographe
    function getUserMediaDOM() {

        //Création de l'article qui contiendra les médias des photographes, avec un attribut ID et une classe CSS
        const article = document.createElement("article");
        article.setAttribute("id", id);
        article.className = "media-article"

        //Si le média en question est une vidéo, on applique les règles suivantes
        if("video" in data) {
            //On construit les différents éléments pour afficher la vidéo
            const videoElement = document.createElement("video");
            //Avec .dataset, on accède à l'ID associé à la vidéo, puis on lui attribue une classe CSS
            videoElement.dataset.id = id
            videoElement.className = "media-video";
            //L'attribut tabindex à 0 définit l'ordre lorsqu'on appuie sur tab pour la navigation au clavier
            videoElement.setAttribute("tabindex", "0");
            //Cet attribut permet d'afficher les contrôles de lecture de la vidéo
            videoElement.setAttribute("controls", "");
            
            //On ajoute un eventListener pour pouvoir lire la vidéo au clavier avec Espace
            videoElement.addEventListener("keydown", function(event) {
                if (event.code === "Space") {
                  event.preventDefault();
                  if (videoElement.paused) {
                    videoElement.play();
                  } else {
                    videoElement.pause();
                  }
                }
              });

            //On créé un élément source pour définir la source de la vidéo, et décrire son format
            const videoSource = document.createElement("source");
            videoSource.type = "video/mp4";
            videoSource.src = videos;

            videoElement.appendChild(videoSource);
            article.appendChild(videoElement);
            
        //Sinon, si la source est une image
        } else {
            //On construit les différents éléments pour afficher l'image. Pour l'alt, on utilise le nom de l'image
            const img = document.createElement("img");
            //Avec .dataset, on accède à l'ID associé à l'image, puis on lui attribue une classe CSS
            img.dataset.id = id
            img.className = "media-image";

            img.setAttribute("tabindex", "0");

            img.setAttribute("src", images);
            img.setAttribute("alt", title);

            article.appendChild(img);
        }

        //On créé un div contenant les informations du média (titre, nombre de likes, icône de likes)
        const mediaInfo = document.createElement("div");
        mediaInfo.className = "media-info";
        article.appendChild(mediaInfo);

        //On créé un titre h3 pour le titre des médias
        const mediaTitle = document.createElement("h3");
        mediaTitle.textContent = title
        mediaInfo.appendChild(mediaTitle);

        //On créé un div pour le nombre de likes et l'icône de likes
        const mediaLikes = document.createElement("div");
        mediaLikes.className = "media-likes";
        mediaInfo.appendChild(mediaLikes);

        //On créé un span pour afficher le nombre de likes
        const span = document.createElement("span");
        span.textContent = likes;
        mediaLikes.appendChild(span);

        //On créé un élément i pour l'icone de coeur tirée de Font Awesome
        const icon = document.createElement("i");
        icon.className = "fa-regular fa-heart icon-heart";
        mediaLikes.appendChild(icon);

        //On met un tabindex de 0 pour l'accessibilité, un titre et un rôle de button
        icon.setAttribute("tabindex", 0);
        icon.setAttribute("title", "Heart Like Icon");
        icon.setAttribute("role", "button");

        return article
    }

    return { getUserMediaDOM }

}