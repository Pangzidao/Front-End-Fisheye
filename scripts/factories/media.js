/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let index = 0
let heartIndex = 0
const photoLiked = []
let totalLikes = 0
const medias = document.getElementById('medias')

medias.addEventListener('keydown', function (event) {
  if (event.code === 'Enter') {
    if (lightBoxOpened === false) {
      if (event.target.tagName === 'I') {
        liked(event)
        console.log('heart')
      } else {
        openLightBox(event.target.id)
      }
    }
  }

  if (event.code === 'ArrowRight') {
    changePhotoRight(currentIndex)
  }

  if (event.code === 'ArrowLeft') {
    changePhotoLeft(currentIndex)
  }

  if (event.code === 'Escape') {
    closeLightBox()
  }
})

function media (photographerMedias, photographer) {
  const totalNumberOfLikesDOM = document.getElementById('totalLikes')
  const price = document.getElementById('price')
  let html = ''
  let photoOrVideo = ''
  let likes = 0

  photographerMedias.forEach((photographerMedia) => {
    index = photographerMedias.indexOf(photographerMedia)

    if (photoLiked.includes(index)) {
      likes = photographerMedia.likes + 1
    } else {
      likes = photographerMedia.likes
    }

    totalLikes += likes

    if (photographerMedia.image !== undefined) {
      photoOrVideo = `<img tabindex="${(index + 5) * 1.99}" id="${index}" src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedia.image}" width = "150px" alt = "${photographerMedia.title} closeup view" onclick="openLightBox(${index})"/>`
    } else {
      photoOrVideo = ` <video tabindex="${(index + 5) * 1.99}" id="${index}" width="320" height="240" onclick="openLightBox(${index})" aria-label="${photographerMedia.title} closeup view">
                                <source  src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedia.video}" >
                            </video>
                        `
    };

    html += `
        <div class="media">
            ${photoOrVideo}
            <div class="mediaTitle"
                <h2>${photographerMedia.title}</h2>
                <div class = "likes" aria-label="likes">                
                    <p>${likes}</p>
                    <i class="fa-solid fa-heart" tabindex="${(index + 5) * 2}" onclick="liked(event)" data-index="${index}"></i>
                </div>
            </div>
        </div>            
        `
  })

  medias.innerHTML = html
  totalNumberOfLikesDOM.innerHTML = `${totalLikes}  <i class="fa-solid fa-heart">`
  price.innerText = `${photographer.price} €/jour`
}

function liked (event) {
  const heart = event.target
  heartIndex = parseInt(heart.getAttribute('data-index'))
  photoLiked.push(heartIndex)
  init()
}
