function photographerFactory(data) {
    const { name, portrait,city, country, tagline, price,id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const lien = document.createElement("a");
        lien.setAttribute("href", "#");
        const figure = document.createElement("figure");
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement("h3");
        h3.textContent = city + "," + " " + country ;
        const p = document.createElement("p");
        p.textContent = tagline;
        const p2 = document.createElement("p");
        p2.textContent = price + " " + "€";
        p2.style.color = ("#757575");
        article.appendChild(lien);
        article.appendChild(lien);
        lien.appendChild(figure);
        figure.appendChild(img);
        lien.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(p2);
        article.addEventListener("click", ()=>console.log(id));
        return (article);
    }
    return { name, picture, getUserCardDOM }
}