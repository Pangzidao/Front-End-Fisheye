function photographerFactory(data) {
    const { name, portrait,city, country, tagline, price,id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement("article");
        let html = "";

        html += `
        
        <a href = "photographer.html?${id}" arialabel = "${name}">
            <figure>
                <img src="${picture}" alt="photo de ${name}"/>
            </figure>
            <h2>${name}</h2>
        </a>
        <h3>${city}, ${country}</h3>
        <p>${tagline}</p>
        <p class="price">${price} €</p>        
        `;

        article.innerHTML = html;
        return (article);
    }

    return { name, picture, getUserCardDOM}
}
