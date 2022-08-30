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
};

function media(photographerMedias, photographer){
    const medias = document.getElementById("medias");
    const totalNumberOfLikes = document.getElementById("totalLikes");
    const price = document.getElementById("price");
    let html = "";
    photographerMedias.forEach((photographerMedia) => {
        let index = photographerMedias.indexOf(photographerMedia);

        if (photographerMedia.image !== undefined){
            html += `
            <div class="media">
                <img id="${index}" src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedia.image}" width = "150px" alt = "photographie intitulé ${photographerMedia.title}" onclick="openLightBox(${index})"/>
                <div class="mediaTitle"
                    <h2>${photographerMedia.title}</h2>
                    <div class = "likes">                
                        <p>${photographerMedia.likes}</p>
                        <i class="fa-solid fa-heart"></i>
                    </div>
                </div>
            </div>            `
        };

        
        if (photographerMedia.video !== undefined){
            html += `
            <div class="media photosVideo">
                <video  id="${index}" width="320" height="240" onclick="openLightBox(${index})" >
                    <source  src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedia.video}" >
                </video>
                <div class="mediaTitle"
                    <h2>${photographerMedia.title}</h2>
                    <div class = "likes">                
                        <p>${photographerMedia.likes}</p>
                        <i class="fa-solid fa-heart"></i>
                    </div>
                </div> 
            </div>
            `    
        };
    });

    medias.innerHTML = html;
    console.log(medias);
    totalNumberOfLikes.innerHTML = `234 383  <i class="fa-solid fa-heart">`
    price.innerText = `${photographer.price} €/jour`;
}

async function init() {
    // Récupère les datas des photographes
    const { photographer } = await getPhotographer();
    header(photographer);
    const { photographerMedias } = await getPhotographer();
    media(photographerMedias, photographer);
};

init();

const lightBox = document.getElementById("lightbox");
let mediaIndex = 0;

async function openLightBox(index){
    const { photographer } = await getPhotographer();
    const { photographerMedias } = await getPhotographer();
    console.log(photographer.name);
    console.log(photographerMedias[index]);

    lightBox.style.display = "block";

    if (photographerMedias[index].image === undefined){
        lightBox.innerHTML = `
        <video  id="${index}" width="320" height="240" onclick="openLightBox(${index})" >
        <source  src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedias[index].video}" >
        </video>
        <i class="fa-solid fa-angle-right" onclick="changePhoto(${index})"></i>
        `
    }else{
        lightBox.innerHTML = `
        <i class="fa-solid fa-angle-left" onclick="changePhotoLeft(${index})"></i>
        <img id="${index}" src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedias[index].image}" width = "150px" alt = "photographie intitulé ${photographerMedias[index].title}" onclick="openLightBox(${index})"/>
        <i class="fa-solid fa-angle-right" onclick="changePhotoRight(${index})"></i>
        `
    };
    
};

async function changePhotoRight(index){
    const { photographer } = await getPhotographer();
    const { photographerMedias } = await getPhotographer();
    
    if (index === photographerMedias.length -1){
        index = 0;
    }else{
        index ++;
    };

    if (photographerMedias[index].image === undefined){
        lightBox.innerHTML = `
        <i class="fa-solid fa-angle-left" onclick="changePhotoLeft(${index})"></i>

        <video  id="${index}" width="320" height="240" onclick="openLightBox(${index})" >
        <source  src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedias[index].video}" >
        </video>
        <i class="fa-solid fa-angle-right" onclick="changePhotoRight(${index})"></i>
        `
    }else{
        lightBox.innerHTML = `
        <i class="fa-solid fa-angle-left" onclick="changePhotoLeft(${index})"></i>

        <img id="${index}" src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedias[index].image}" width = "150px" alt = "photographie intitulé ${photographerMedias[index].title}" onclick="openLightBox(${index})"/>
        <i class="fa-solid fa-angle-right" onclick="changePhotoRight(${index})"></i>
        `
    };
}

async function changePhotoLeft(index){
    const { photographer } = await getPhotographer();
    const { photographerMedias } = await getPhotographer();

    if (index === 0){
        index = photographerMedias.length-1;
    }else{
        index --;
    };
    console.log(index);

    if (photographerMedias[index].image === undefined){
        lightBox.innerHTML = `
        <i class="fa-solid fa-angle-left" onclick="changePhotoLeft(${index})"></i>

        <video  id="${index}" width="320" height="240" onclick="openLightBox(${index})" >
        <source  src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedias[index].video}" >
        </video>
        <i class="fa-solid fa-angle-right" onclick="changePhotoRight(${index})"></i>
        `
    }else{
        lightBox.innerHTML = `
        <i class="fa-solid fa-angle-left" onclick="changePhotoLeft(${index})"></i>

        <img id="${index}" src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedias[index].image}" width = "150px" alt = "photographie intitulé ${photographerMedias[index].title}" onclick="openLightBox(${index})"/>
        <i class="fa-solid fa-angle-right" onclick="changePhotoRight(${index})"></i>
        `
    };
}





