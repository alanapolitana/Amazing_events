obtenerDatos();
async function obtenerDatos() {
    try {
        const response = await fetch(urlApi)
        data = await response.json();
        console.log(response)
        cargarCard(data.events)
        createCheckbox(data.events)
        cargarCheckbox(data.events)
        buscarSearch(data.events)
    } catch (error) {

    }
}




