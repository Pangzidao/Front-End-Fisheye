const lightBox = document.getElementById('lightbox')

let lightBoxOpened = false
let currentIndex = 0

function lightBoxVideo (photographer, photographerMedias, index) {
  return `
    <i class="fa-solid fa-angle-left" aria-label="Previous image" onclick="changePhotoLeft(${index})"></i>
    <figure> 
        <video  id="${index}" aria-label="${photographerMedias[index].title}" onclick="openLightBox(${index})" controls >
            <source  src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedias[index].video}" >
        </video>
        <figcaption>${photographerMedias[index].title}</figcaption>
        <i class="fa-solid fa-xmark" aria-label="Close dialog" onclick="closeLightBox()"></i>
    </figure>
    <i class="fa-solid fa-angle-right" aria-label="Next image" onclick="changePhotoRight(${index})"></i>
    `
}

function lightBoxPhoto (photographer, photographerMedias, index) {
  return `
    <i class="fa-solid fa-angle-left" aria-label="Previous image" onclick="changePhotoLeft(${index})"></i>
    <figure>
        <img id="${index}" src="assets/photographers/Sample Photos/${photographer.name}/${photographerMedias[index].image}" alt = "${photographerMedias[index].title}" onclick="openLightBox(${index})"/>
        <figcaption>${photographerMedias[index].title}</figcaption>
        <i class="fa-solid fa-xmark" aria-label="Close dialog" onclick="closeLightBox()"></i>
    </figure>
    <i class="fa-solid fa-angle-right" aria-label="Next image" onclick="changePhotoRight(${index})"></i>
    `
}

async function openLightBox (index) {
  const { photographer } = await getPhotographer()
  const { photographerMedias } = await getPhotographer()

  lightBox.style.display = 'flex'
  lightBoxOpened = true

  currentIndex = index

  lightBox.setAttribute('aria-label', `${photographerMedias[index].title} closeupview`)

  if (photographerMedias[index].image === undefined) {
    lightBox.innerHTML = lightBoxVideo(photographer, photographerMedias, index)
  } else {
    lightBox.innerHTML = lightBoxPhoto(photographer, photographerMedias, index)
  };
};

function closeLightBox () {
  lightBox.style.display = 'none'
  lightBoxOpened = false
}

async function changePhotoRight (index) {
  const { photographerMedias } = await getPhotographer()

  if (index === photographerMedias.length - 1) {
    index = 0
  } else {
    index++
  };
  openLightBox(index)
}

async function changePhotoLeft (index) {
  const { photographerMedias } = await getPhotographer()

  if (index === 0) {
    index = photographerMedias.length - 1
  } else {
    index--
  };

  openLightBox(index)
}
