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
    //sorting medias by popularity
    //photographerMedias.sort(function(a,b){return a.likes - b.likes});
    
    //sorting medias by date
    /*
    photographerMedias.sort(function(a,b){
        a = new Date(a.date);
        b = new Date(b.date);
        return a - b});
    */
   
        //sorting medias by title
   /*
    photographerMedias.sort(function(a, b){
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
      */

    return {photographer, photographerMedias}
}

function header(photographer, sortMedias) {
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
};


async function init() {
    // Récupère les datas des photographes
    const { photographer } = await getPhotographer();
    const { photographerMedias } = await getPhotographer();

    header(photographer);
    media(photographerMedias, photographer);
};

init();






