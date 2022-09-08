let index = 0;
let heartIndex = 0;
let photoLiked = [];

function media(photographerMedias, photographer){
    const medias = document.getElementById("medias");
    const totalNumberOfLikes = document.getElementById("totalLikes");
    const price = document.getElementById("price");
    let html = "";
    let photoOrVideo = "";
    let likes = 0;

    photographerMedias.forEach((photographerMedia) => {
        index = photographerMedias.indexOf(photographerMedia);
        

        if (photoLiked.includes(index)){
            likes = photographerMedia.likes + 1;
        }else{
            likes = photographerMedia.likes;
        }
        
        if (photographerMedia.image !== undefined){
            photoOrVideo = `<img id="${index}" src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedia.image}" width = "150px" alt = "photographie intitulé ${photographerMedia.title}" onclick="openLightBox(${index})"/>`;
        }else{
            photoOrVideo =` <video  id="${index}" width="320" height="240" onclick="openLightBox(${index})" >
                                <source  src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedia.video}" >
                            </video>
                        `
        };

        html += `
        <div class="media">
            ${photoOrVideo}
            <div class="mediaTitle"
                <h2>${photographerMedia.title}</h2>
                <div class = "likes">                
                    <p>${likes}</p>
                    <i class="fa-solid fa-heart" onclick="liked(event)" data-index="${index}"></i>
                </div>
            </div>
        </div>            
        `
    });


    medias.innerHTML = html;
    totalNumberOfLikes.innerHTML = `234 383  <i class="fa-solid fa-heart">`
    price.innerText = `${photographer.price} €/jour`;
}

function liked(event){
    const heart = event.target;
    heartIndex = parseInt(heart.getAttribute("data-index"));
    photoLiked.push(heartIndex);
    console.log(photoLiked);
    init();
}