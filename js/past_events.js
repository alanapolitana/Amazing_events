let eventsPast= [];
 
 function cargarCardFuture(dato){
  for(let event of dato.events){
    let currentDate = new Date(dato.currentDate);
    let eventDate = new Date(event.date);

 if (eventDate < currentDate) {
eventsPast.push(event)
 }}
 cargarCard (eventsPast)
 }

createCheckbox(data.events)
cargarCardFuture(data)
buscarSearch(eventsPast)
