    async function getPhotographers() {

        const responseJSON = await fetch("/data/photographers.json");
        const responseJS = await responseJSON.json();
        console.log(responseJS.photographers);
        // Penser à remplacer par les données récupérées dans le json
        const photographers = [
                responseJS.photographers[0],
                responseJS.photographers[1],
                responseJS.photographers[2],
                responseJS.photographers[3],
                responseJS.photographers[4],
                responseJS.photographers[5],
        ]
        // et bien retourner le tableau photographers seulement une fois
        return ({
            photographers: [...photographers,]})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    