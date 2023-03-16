let eventsFuture= [];
 
 function cargarCardFuture(dato){
  for(let event of dato.events){
    let currentDate = new Date(dato.currentDate);
    let eventDate = new Date(event.date);

 if (eventDate > currentDate) {
eventsFuture.push(event)
 }}
 cargarCard (eventsFuture)
 }
createCheckbox(data.events)
cargarCardFuture(data)
cargarCheckbox(data.events)
buscarSearch(eventsFuture)