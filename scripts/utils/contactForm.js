//Variables à utiliser
const modalBtn = document.getElementById("contact_modal");
const main = document.getElementById("main");
const form = document.getElementById("contact-form");
const contactBtn = document.querySelector(".contact_button");
let isFormValid = false;

// Variables pour la sélection des éléments du formulaire
const inputFirstName = document.getElementById("first-input");
const inputLastName = document.getElementById("last-input");
const inputEmail = document.getElementById("email-input");
const inputMessage = document.getElementById("message");
const contactTitle = document.getElementById("contact-title");

// Variables pour les messages d'erreur
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const nameErrorMsgContent = "Veuillez entrer entre 2 et 32 caractères (lettres, espaces et tirets uniquement)";
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");
const emailErrorMsgContent = "Veuillez entrer une adresse email valide.";
const messageErrorMsg = document.getElementById("messageErrorMsg");
const messageErrorMsgContent = "Veuillez entrer au moins 30 caractères.";

//RegEx 
const regExName = new RegExp(/^(?=.{2,32}$)[a-zA-ZÀ-ÿ]+(?:[ -][a-zA-ZÀ-ÿ]+)*$/);
const regExMail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

//On créé une fonction pour récupérer le nom du photographe dans la modale de contact, et ajouter un aria-labelledby
function getPhotographerName(data) {
    contactTitle.innerHTML += ` ${data}`;
    contactTitle.setAttribute("aria-labelledby", "Contact Me" + ` ${data}`);
}

//Fonction pour la gestion de la fermeture de la modale avec le clavier
function handleKeyDown(event) {
    //On récupère l'élément qui correspond à la croix de fermeture de modale
    const isCloseBtnFocused = document.activeElement.id === "close-modal";
    //La modale se ferme en appuyant sur échap
    if (event.key === "Escape") {
        closeModal();
    }
    //Si la croix de fermeture est sélectionnée et que la modale est affichée, la modale se ferme en appuyant sur entrée
    if (event.key === "Enter" && modalBtn.classList.contains("modal-open") && isCloseBtnFocused) {
        //On empêche la soumission du formulaire qui est l'action de base de la touche entrée
        event.preventDefault();
        closeModal();
    }
}

//On créé une fonction pour afficher la modale de contact
function displayModal() {
    modalBtn.style.display = "block";
    modalBtn.classList.add("modal-open");
    modalBtn.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "true");
    document.addEventListener("keydown", handleKeyDown);
    //On place le focus sur la première ligne du formulaire de contact
    inputFirstName.focus();
}

//On créé une fonction pour fermer la modale de contact
function closeModal() {
    modalBtn.style.display = "none";
    modalBtn.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "false");
    document.removeEventListener("keydown", handleKeyDown);
    //On replace le focus sur le bouton de contact
    contactBtn.focus();
}

form.addEventListener("submit", formValidate);


/* Fonction pour la validation des différents champs du formulaire. La fonction prend 4 paramètres différents :
  - field, pour le champ à valider (nom, prénom, etc)
  - regex, la fonction pour valider le champ avec les regex
  - errorMsg, qui indique où afficher le message d'erreur
  - errorMsgContent, qui indiquera quoi afficher comme message d'erreur */
function fieldValidate(field, regex, errorMsg, errorMsgContent) {
if (regex.test(field.value)) {
    // Si le champ testé est valide, il n'y a pas de message
    errorMsg.textContent = "";
    field.style.border = "";
    isFormValid = true;
} else {
    // Si le champ testé n'est pas valide, on affiche un message d'erreur
    errorMsg.textContent = errorMsgContent;
    field.style.border = "#fe142f 2px solid";
    isFormValid = false;
}

}

//Validation du champ du prénom
inputFirstName.addEventListener("change", () => {
    fieldValidate(inputFirstName, regExName, firstNameErrorMsg, nameErrorMsgContent);
  });
//Validation du champ du nom
inputLastName.addEventListener("change", () => {
    fieldValidate(inputLastName, regExName, lastNameErrorMsg, nameErrorMsgContent);
});
//Validation du champ de l'adresse email
inputEmail.addEventListener("change", () => {
    fieldValidate(inputEmail, regExMail, emailErrorMsg, emailErrorMsgContent);
});
//Validation du champ de message
inputMessage.addEventListener("change", () => {
    if(inputMessage.value.length < 30) {
        messageErrorMsg.textContent = messageErrorMsgContent;
    } else {
        messageErrorMsg.textContent = "";
        isFormValid = true;
    }
});

//Fonction pour valider le formulaire
function formValidate(event) {
    event.preventDefault();
  
    //Validation du champ du prénom
    fieldValidate(inputFirstName, regExName, firstNameErrorMsg, nameErrorMsgContent);
    //Validation du champ du nom
    fieldValidate(inputLastName, regExName, lastNameErrorMsg, nameErrorMsgContent);
    //Validation du champ de l'adresse email
    fieldValidate(inputEmail, regExMail, emailErrorMsg, emailErrorMsgContent);
    //Validation du champ de message
    if(inputMessage.value.length < 30) {
        messageErrorMsg.textContent = messageErrorMsgContent;
    } else {
        messageErrorMsg.textContent = "";
        isFormValid = true;
    }
    
    //Si le formulaire est valide, on retourne un console.log(), on reset le formulaire et on ferme la modale
    if(isFormValid) {
        console.log("Prénom : " + inputFirstName.value);
        console.log("Nom : " + inputLastName.value);
        console.log("Email : " + inputEmail.value);
        console.log("Message : " + inputMessage.value);
        closeModal();
        form.reset();
      }

}

//Réinitialiser le formulaire lors du rechargement de la page
window.addEventListener("beforeunload", () => {
    form.reset();
  });
  