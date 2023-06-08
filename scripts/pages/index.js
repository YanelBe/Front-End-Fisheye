//La fonction asynchrone récupère les données du fichier json avec un await pour fetch
async function getPhotographers() {
    let response = await fetch("../../data/photographers.json")
    return await response.json();
}

//La fonction appelle la factory photographerFactory() pour permettre d'afficher les données des photographes
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    //La méthode forEach() permet d'appliquer la fonction à chaque photographe
    photographers.forEach((photographer) => {
        //On créé une variable photographerModel qui se base sur la factory fonction photographerFactory()
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

//La fonction attend de recevoir les informations du fetch précédent avant de les afficher avec displayData()
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();

