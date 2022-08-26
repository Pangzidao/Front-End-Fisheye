function photographerFactory(data) {
    const { name, portrait,city, country, tagline, price,id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement("article");
        let html = "";

        html += `
        
        <a href = "photographer.html?${id}" arialabel = "lien vers la page de ${name}">
            <figure>
                <img src="${picture}" alt="photo de ${name}"/>
            </figure>
            <h2>${name}</h2>
            <h3>${city}, ${country}</h3>
            <p>${tagline}</p>
            <p>${price} €</p>
        </a>        
        `;

        article.innerHTML = html;
        return (article);
    }

    return { name, picture, getUserCardDOM}
}
