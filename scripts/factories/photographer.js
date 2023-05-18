function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        //Création de l'article qui contiendra les éléments de la bio des photographes
        const article = document.createElement("article");

        //Création d'un élément h2 pour le nom du photographe
        const h2 = document.createElement("h2");
        h2.textContent = name;

        //Lien vers la page spécifique du photographe en utilisant l'ID
        const photographerLink = document.createElement("a");
        const photographerURL = `photographer.html?id=${id}`;
        photographerLink.setAttribute("href", photographerURL);

        //Création d'un élément h3 pour la location (city, country)
        const location = document.createElement("h3");
        location.textContent =  city + ", " + country;

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
        photographerLink.appendChild(h2);
        
        article.appendChild(location);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}