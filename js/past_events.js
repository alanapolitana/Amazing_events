let htmlEvents = "";
for(let event of data.events){
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);

 if (eventDate < currentDate) {
    htmlEvents = `
 
    <div class="card col-12 col-md-4 col-xl-3  ">
     <img src="${event.image} " alt=""    >
     <div class="card-body">
     
       <h3 class="card-title">${event.name}</h3>
       <p class="card-text">${event.description}</p>
     </div>
    
  <div class="row">
  <div class="col-5"><p>Precio:$${event.price}</p></div>   
<div class="col-7"><a href="./details.html" class="btn btn-primary">   Ver mas    </a ></div> 
 </div>  

   </div>
 </div>`
    
     document.querySelector('.container-past').innerHTML +=  htmlEvents ;
}}
console.log(htmlEvents); 
    