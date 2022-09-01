function media(photographerMedias, photographer){
    const medias = document.getElementById("medias");
    const totalNumberOfLikes = document.getElementById("totalLikes");
    const price = document.getElementById("price");
    let html = "";
    let photoOrVideo = "";

    photographerMedias.forEach((photographerMedia) => {
        let index = photographerMedias.indexOf(photographerMedia);

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
                    <p>${photographerMedia.likes}</p>
                    <i class="fa-solid fa-heart" onclick="addLikes()"></i>
                </div>
            </div>
        </div>            
        `
    });


    medias.innerHTML = html;
    totalNumberOfLikes.innerHTML = `234 383  <i class="fa-solid fa-heart">`
    price.innerText = `${photographer.price} €/jour`;
}

