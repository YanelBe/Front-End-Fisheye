function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    //Variable pour afficher l'image du nom de fichier associé au photographe
    const picture = `assets/photographers/${portrait}`;

    //Cette fonction va manipuler le DOM pour afficher les éléments associés à un photographe
    function getUserCardDOM() {

        //Création de l'article qui contiendra les éléments de la bio des photographes
        const article = document.createElement("article");

        //Création d'un élément h2 pour le nom du photographe
        const photographerName = document.createElement("h2");
        photographerName.textContent = name;

        //Lien vers la page spécifique du photographe en utilisant l'ID
        const photographerLink = document.createElement("a");
        const photographerURL = `photographer.html?id=${id}`;
        photographerLink.setAttribute("href", photographerURL);

        //Création d'un élément h3 pour la location (city, country)
        const location = document.createElement("h3");
        location.textContent = city + ", " + country;

        //Création d'un élément h4 pour la tagline
        const taglineElement = document.createElement("h4");
        taglineElement.textContent = tagline

        //Création d'un élément p pour le prix
        const priceElement = document.createElement("p");
        priceElement.textContent = price + "€/jour";
        
        //Création de l'image en ajoutant un alt avec le nom du photographe
        const img = document.createElement("img");
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Profil photographe de " + name)

        article.appendChild(photographerLink);

        //On utilise appendChild à la varaible photographerLink pour que seul l'image du photographe et son nom soient cliquables
        photographerLink.appendChild(img);
        photographerLink.appendChild(photographerName);
        
        //On attache tous les autres éléments créés à l'article
        article.appendChild(location);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);

        return (article);
    }

    //On créé une fonction pour récupérer les informations du photographe lorsqu'on clique sur sa page
    function getPhotographerHeader() {

        //Création de l'article qui contiendra les éléments de la bio des photographes
        const photographerBio = document.createElement("article");

        //Création d'une variable pour récupérer les classes photograph-header du HTML
        const photographerHeader = document.querySelector(".photograph-header");
        
        //On utilise la méthode .prepend pour afficher les informations du photographe avant le reste
        photographerHeader.prepend(photographerBio);

        //Création d'un élément h2 pour le nom du photographe
        const photographerName = document.createElement("h2");
        photographerName.textContent = name;

        //Création d'un élément h3 pour la location (city, country)
        const location = document.createElement("h3");
        location.textContent = city + ", " + country;

        //Création d'un élément h4 pour la tagline
        const taglineElement = document.createElement("h4");
        taglineElement.textContent = tagline

        //Création d'un élément p pour le prix
        const priceElement = document.createElement("p");
        priceElement.textContent = price + "€/jour";

        //On attache tous les éléments créé à l'article photographerBio
        photographerBio.appendChild(photographerName);
        photographerBio.appendChild(location);
        photographerBio.appendChild(taglineElement);

        //Affiche l'image du nom de fichier associé au photographe
        const picture = `assets/photographers/${portrait}`;

        //Création de l'image en ajoutant un alt avec le nom du photographe
        const img = document.createElement("img");
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Profil photographe de " + name)

        photographerHeader.appendChild(img);
  
        return photographerBio;
    }
    
    return { picture, getUserCardDOM, getPhotographerHeader }
}