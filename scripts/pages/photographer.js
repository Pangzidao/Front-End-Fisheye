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
    photographerMedias.forEach((photographerMedia) => {
        
        const image = document.createElement("img");
        const imageTitle = document.createElement("h2");
        imageTitle.textContent = photographerMedia.title;
        const mediaPicture = `assets/photographers/Sample Photos/${photographer.name}/${photographerMedia.image}`;
        console.log(mediaPicture);
        medias.appendChild(imageTitle);

        if (photographerMedia.image){
            image.setAttribute("src", mediaPicture);
            image.setAttribute("width", "100px");
            medias.appendChild(image);
        };
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographer } = await getPhotographer();
    header(photographer);
    const { photographerMedias } = await getPhotographer();
    media(photographerMedias, photographer);
};

init();

