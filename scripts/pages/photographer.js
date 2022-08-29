let currentPage = window.location.href;
let id = "";

id = currentPage.slice(40,43);

async function getPhotographer() {

    const dataJSON = await fetch("/data/photographers.json");
    const dataJS = await dataJSON.json();
    // Penser à remplacer par les données récupérées dans le json
    const photographers = dataJS.photographers
    const media = dataJS.media
    // et bien retourner le tableau photographers seulement une fois
    const photographer = photographers.find(element => element.id === parseInt(id));
    const photographerMedias = media.filter(element => element.photographerId === parseInt(id));
    
    return {photographer, photographerMedias}
}

function header(photographer) {
    const photographerName = document.getElementById("name");
    const photographerLocation = document.getElementById("location");
    const photographerTagline = document.getElementById("tagline");
    const photographerPicture = document.getElementById("photographer-picture");
    const picture = `assets/photographers/${photographer.portrait}`;


    photographerName.innerText = photographer.name;
    photographerLocation.innerText = photographer.city + "," + " " + photographer.country;
    photographerTagline.innerText = photographer.tagline;
    photographerPicture.setAttribute("src", picture);
    photographerPicture.setAttribute("alt", `photo de ${photographer.name}`);
    photographerPicture.setAttribute("width", "100px");
};

function media(photographerMedias, photographer){
    const medias = document.getElementById("medias");
    let html = "";
    photographerMedias.forEach((photographerMedia) => {
        
        if (photographerMedia.image !== undefined){
            html += `
            <figure>
                <img src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedia.image}" width = "150px" alt = "photographie intitulé ${photographerMedia.title}"/>
                <figcaption>${photographerMedia.title}</figcaption>
                <p>${photographerMedia.likes}</p>
                <i class="fa-solid fa-heart"></i>
            </figure>            `
        };

        if (photographerMedia.video !== undefined){
            html += `
            <video width="320" height="240" controls>
                <source src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedia.video}">
                Your browser does not support the video tag.
            </video>
            <h2>${photographerMedia.title}</h2>
            <p>${photographerMedia.likes}</p>
            <i class="fa-solid fa-heart"></i> 
            `    
        };        
    });

    medias.innerHTML = html;
}

async function init() {
    // Récupère les datas des photographes
    const { photographer } = await getPhotographer();
    header(photographer);
    const { photographerMedias } = await getPhotographer();
    media(photographerMedias, photographer);
};

init();

