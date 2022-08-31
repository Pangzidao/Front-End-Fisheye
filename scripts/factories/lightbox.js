function lightBoxVideo(photographer, photographerMedias, index){

    return `
    <i class="fa-solid fa-angle-left" onclick="changePhotoLeft(${index})"></i>
    <video  id="${index}" width="320" height="240" onclick="openLightBox(${index})" >
    <source  src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedias[index].video}" >
    </video>
    <i class="fa-solid fa-angle-right" onclick="changePhotoRight(${index})"></i>
    <i class="fa-solid fa-xmark" onclick="closeLightBox()"></i>
    <p>${photographerMedias[index].title}</p>
    `
}

function lightBoxPhoto(photographer, photographerMedias, index){
    return `
    <i class="fa-solid fa-angle-left" onclick="changePhotoLeft(${index})"></i>
    <img id="${index}" src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedias[index].image}" width = "150px" alt = "photographie intitulé ${photographerMedias[index].title}" onclick="openLightBox(${index})"/>
    <i class="fa-solid fa-angle-right" onclick="changePhotoRight(${index})"></i>
    <i class="fa-solid fa-xmark" onclick="closeLightBox()"></i>
    <p>${photographerMedias[index].title}</p>
    `
}

const lightBox = document.getElementById("lightbox");

async function openLightBox(index){
    const { photographer } = await getPhotographer();
    const { photographerMedias } = await getPhotographer();

    lightBox.style.display = "block";

    if (photographerMedias[index].image === undefined){
        lightBox.innerHTML = lightBoxVideo(photographer, photographerMedias, index);
    }else{
        lightBox.innerHTML = lightBoxPhoto(photographer, photographerMedias, index);
    };
};

function closeLightBox(){
    lightBox.style.display = "none";
}

async function changePhotoRight(index){
    const { photographerMedias } = await getPhotographer();

    if (index === photographerMedias.length -1){
        index = 0;
    }else{
        index ++;
    };
    openLightBox(index);
}

async function changePhotoLeft(index){
    const { photographerMedias } = await getPhotographer();

    if (index === 0){
        index = photographerMedias.length-1;
    }else{
        index --;
    };

    openLightBox(index);
}