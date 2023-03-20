let eventsPast= [];
obtenerDatos();
async function obtenerDatos() {
    try {
        const response = await fetch(urlApi)
        data = await response.json();
        console.log(response)
        createCheckbox(data.events)
        cargarCardFuture(data)
        cargarCheckbox(data.events)
        buscarSearch(eventsPast)
    } catch (error) {

    }
}
 function cargarCardFuture(dato){
  for(let event of dato.events){
    let currentDate = new Date(dato.currentDate);
    let eventDate = new Date(event.date);

 if (eventDate < currentDate) {
eventsPast.push(event)
 }}
 cargarCard(eventsPast)
 }

