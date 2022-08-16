let currentPage = window.location.href;
let id = "";

id = currentPage.slice(40,43);
console.log(currentPage);
console.log(id);

async function getPhotographers() {

    const dataJSON = await fetch("/data/photographers.json");
    const dataJS = await dataJSON.json();
    // Penser à remplacer par les données récupérées dans le json
    const photographers = dataJS.photographers
    // et bien retourner le tableau photographers seulement une fois
    const photographer = photographers.find(element => element.id === parseInt(id));
    console.log(photographers);
    console.log(photographer);
    return {photographer}
}
getPhotographers();

