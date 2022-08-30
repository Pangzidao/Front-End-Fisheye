pageBackground = document.getElementById("main");
const modal = document.getElementById("contact_modal");
prenom = document.getElementById("prenom");
nom = document.getElementById("nom");
email = document.getElementById("email");
message = document.getElementById("message");

function displayModal() {
	modal.style.display = "block";
    pageBackground.style.opacity = "0.5";
}

function closeModal() {
    modal.style.display = "none";
    pageBackground.style.opacity = "1";
}

modal.addEventListener("submit", function(e){
    e.preventDefault();
    closeModal();
    console.log("prenom: " + prenom.value);
    console.log("nom: " + nom.value);
    console.log("email: "+ email.value);
    console.log("message: " + message.value);
});