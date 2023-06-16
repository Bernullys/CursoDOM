const apiUrl = "https://platzi-avo.vercel.app/api/avo";

async function avo() {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log("Esta es toda la información de la api:")
    console.log(data);

    const articulo = document.querySelector(".main-container");
    articulo.textContent = data.data.name

}

avo(); 