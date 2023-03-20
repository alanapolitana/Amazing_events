let eventsFuture= [];
obtenerDatos();
async function obtenerDatos() {
    try {
        const response = await fetch(urlApi)
        data = await response.json();
        console.log(response)
        createCheckbox(data.events)
        cargarCardFuture(data)
        cargarCheckbox(data.events)
        buscarSearch(eventsFuture)
    } catch (error) {

    }
}



 function cargarCardFuture(dato){
  for(let event of dato.events){
    let currentDate = new Date(dato.currentDate);
    let eventDate = new Date(event.date);

 if (eventDate > currentDate) {
eventsFuture.push(event)
 }}
 cargarCard (eventsFuture)
 }


