const pageBackground = document.getElementById("main");
const modal = document.getElementById("contact_modal");
const formData = document.querySelectorAll(".formData");

const modalTitle = document.getElementById("modal-title")
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const message = document.getElementById("message");


// variables de vérification de la validité du formulaire
let prenomFormat = false;
let nomFormat = false;
let emailFormat = false;
let messageFormat = false;

let modalIsOpened = false;


function displayModal() {
	modal.style.display = "block";
  pageBackground.style.opacity = "0.5";
  modalIsOpened = true;
  modalTitle.innerHTML = `Contactez-moi<br/>${currentPhotographer}`;
  modalTitle.setAttribute("aria-label", `Contact me ${currentPhotographer}`)
  modalOpened()
}

function closeModal() {
    modal.style.display = "none";
    pageBackground.style.opacity = "1";
    modalIsOpened = false;
}


modal.addEventListener("submit", submit)


function submit(e){
    
    let prenomValue = prenom.value.trim();
    let nomValue = nom.value.trim();
    let emailValue = email.value.trim();
    let messageValue = message.value.trim();

//Messages d'erreur
//prénom
  if (prenomValue.length < 2){
    formData[0].setAttribute("data-error-visible", "true");
    formData[0].setAttribute("data-error", "Veuillez entrer deux caractères ou plus pour le champ du prénom");
    prenomFormat = false;


  }else if (prenomValue.match(/[0-9]/)){
    formData[0].setAttribute("data-error-visible", "true");
    formData[0].setAttribute("data-error", "Le prénom ne doit pas contenir de chiffres");
    prenomFormat = false;

  }else if (prenomValue.length > 30){
    formData[0].setAttribute("data-error-visible", "true");
    formData[0].setAttribute("data-error", "Le prénom est trop long");
    prenomFormat = false;

  }else{
    formData[0].setAttribute("data-error-visible", "false");
    prenomFormat = true;
  }

//nom
  if (nomValue.length < 2){
    formData[1].setAttribute("data-error-visible", "true");
    formData[1].setAttribute("data-error", "Veuillez entrer deux caractères ou plus pour le champ du nom");
    nomFormat = false;


  }else if (nomValue.match(/[0-9]/)){
    formData[1].setAttribute("data-error-visible", "true");
    formData[1].setAttribute("data-error", "Le nom ne doit pas contenir de chiffres");
    nomFormat = false;
  
  }else if (nomValue.length > 30){
    formData[1].setAttribute("data-error-visible", "true");
    formData[1].setAttribute("data-error", "Le nom est trop long");
    nomFormat = false;

  }else{
    formData[1].setAttribute("data-error-visible", "false");
    nomFormat = true;
  }

//email
  if (!emailValue.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
    formData[2].setAttribute("data-error-visible", "true");
    formData[2].setAttribute("data-error", "Veuillez entrer une adresse e-mail");
    emailFormat = false;
  }else{
    formData[2].setAttribute("data-error-visible", "false");
    emailFormat = true;
  }

  //message
    if (messageValue.length < 10){
    formData[3].setAttribute("data-error-visible", "true");
    formData[3].setAttribute("data-error", "Veuillez entrer dix caractères ou plus pour le champ du message");
    messageFormat = false;
  
  }else if (messageValue.length > 200){
    formData[3].setAttribute("data-error-visible", "true");
    formData[3].setAttribute("data-error", "Le message ne peut contenir plus de 200 caractères");
    messageFormat = false;

  }else{
    formData[3].setAttribute("data-error-visible", "false");
    messageFormat = true;
  }


  if (prenomFormat == true &&
    nomFormat == true &&
    emailFormat == true &&
    messageFormat == true
    )
    {
    e.preventDefault();
    closeModal();
    console.log("prenom: " + prenomValue);
    console.log("nom: " + nomValue);
    console.log("email: "+ emailValue);
    console.log("message: " + messageValue);
  }else{
    e.preventDefault();
  }
}

window.onkeydown = keyPressed;

function keyPressed(e) {
    if(e.code === "Escape"){
        closeModal()
    }
}


//trap focus inside modal

function modalOpened(){

  const modalElements = document.getElementsByClassName("modal-element");

  let modalElementsFocusedIndex = 0
  
  document.addEventListener("keydown", function(e){  

    if (e.code === "Tab"){
      if (modalIsOpened === true){
        e.preventDefault()
        modalElements[modalElementsFocusedIndex].focus()

        if (modalElementsFocusedIndex === modalElements.length -1){
          modalElementsFocusedIndex = 0
        }else{
          modalElementsFocusedIndex ++
        }
      }
    }
  })
}



