/* eslint-disable no-undef */

// importation des données des photographes
async function getPhotographers () {
  const dataJSON = await fetch('/data/photographers.json')
  const dataJS = await dataJSON.json()
  const photographers = dataJS.photographers
  return { photographers }
}

// affichage de la landing page
function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
};

// fonction d'initialisation de la landing page
async function init () {
  const { photographers } = await getPhotographers()
  displayData(photographers)
};

// initialisation de la landing page
init()
