const currentPage = window.location.href
let id = ''
let currentPhotographer = ''
id = currentPage.slice(40, 43)

async function getPhotographer () {
  const dataJSON = await fetch('/data/photographers.json')
  const dataJS = await dataJSON.json()
  // Penser à remplacer par les données récupérées dans le json
  const photographers = dataJS.photographers
  const media = dataJS.media
  // et bien retourner le tableau photographers seulement une fois
  const photographer = photographers.find(element => element.id === parseInt(id))

  const photographerMedias = media.filter(element => element.photographerId === parseInt(id))
  // sorting medias by popularity

  if (mediaSorting === 'Popularité') {
    photographerMedias.sort(function (a, b) { return b.likes - a.likes })
  };

  if (mediaSorting === 'Date') {
    photographerMedias.sort(function (a, b) {
      a = new Date(a.date)
      b = new Date(b.date)
      return a - b
    })
  };

  if (mediaSorting === 'Titre') {
    photographerMedias.sort(function (a, b) {
      const x = a.title.toLowerCase()
      const y = b.title.toLowerCase()
      if (x < y) { return -1 }
      if (x > y) { return 1 }
      return 0
    })
  };
  currentPhotographer = photographer.name
  console.log(currentPhotographer)
  return { photographer, photographerMedias }
}

function header (photographer) {
  const photographerName = document.getElementById('name')
  const photographerLocation = document.getElementById('location')
  const photographerTagline = document.getElementById('tagline')
  const photographerPicture = document.getElementById('photographer-picture')
  const picture = `assets/photographers/${photographer.portrait}`

  photographerName.innerText = photographer.name
  photographerLocation.innerText = photographer.city + ',' + ' ' + photographer.country
  photographerTagline.innerText = photographer.tagline
  photographerPicture.setAttribute('src', picture)
  photographerPicture.setAttribute('alt', `${photographer.name}`)
};

const sortingMenu = document.getElementById('menuTri')
let mediaSorting = 'Popularité'
const sortingOptions = ['Popularité', 'Date', 'Titre']

function sortingMenuFactory () {
  sortingMenu.innerHTML = `
    <p id=${sortingOptions[0]} tabindex="3" aria-label="order by ${sortingOptions[0]}">${sortingOptions[0]}  <i class="fa-solid fa-angle-up"></i></p>
    <p id=${sortingOptions[1]} tabindex="4" aria-label="order by ${sortingOptions[1]}">${sortingOptions[1]}</p>
    <p id=${sortingOptions[2]} tabindex="5" aria-label="order by ${sortingOptions[2]}">${sortingOptions[2]} </p>
`
};

/*
document.addEventListener('focusin', function () {
  const pageElementFocused = document.activeElement
  console.log(pageElementFocused)
}) */

sortingMenu.addEventListener('click', function (event) {
  const mediaSortingDom = event.target.closest('p')
  mediaSorting = mediaSortingDom.id
  console.log(mediaSorting)
  sorting(mediaSorting)
})

sortingMenu.addEventListener('keydown', function (event) {
  if (event.code === 'Enter') {
    mediaSorting = event.target.id
    console.log(mediaSorting)
    sorting(mediaSorting)
  }
})

function sorting (mediaSorting) {
  sortingOptions.unshift(mediaSorting)
  const lastIndex = sortingOptions.lastIndexOf(mediaSorting)
  sortingOptions.splice(lastIndex, 1)
  init()
}

async function init () {
  // Récupère les datas des photographes
  const { photographer } = await getPhotographer()
  const { photographerMedias } = await getPhotographer()
  totalLikes = 0
  header(photographer)
  media(photographerMedias, photographer)
  sortingMenuFactory()
};

init()
