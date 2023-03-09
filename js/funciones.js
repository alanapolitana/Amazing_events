let htmlEvents = "";
function cargarCard(eventos) {
    for (let event of eventos) {

        htmlEvents += `
    <div class="card col-12 col-md-4 col-xl-3  py-2">
     <img src="${event.image} " alt="" >
     <div class="card-body">
     
       <h3 class="card-title">${event.name}</h3>
       <p class="card-text">${event.description}</p>
     </div>
    
   <div class="row">
   <div class="col-5"><p>Precio:$${event.price}</p></div>   
   <div class="col-7">
   <a href="./details.html?id=${event._id}" class="btn btn-primary"> Ver mas  </a >
   </div> 
   </div> 
   </div>
   </div>`
    }
    console.log(htmlEvents);
    document.querySelector('.cartass').innerHTML += htmlEvents;}


/*  ------------------------------------------------------- */

let categorias = []
function createCheckbox(eventos) {
    eventos.forEach(evento => {
        if (!categorias.includes(evento.category)) {
            categorias.push(evento.category)
        }
    })
    console.log(categorias);

    let html_check = "";
    categorias.forEach(categoria => {
        html_check += `<input type="checkbox" class="checkedd" name="${categoria}">
    <label for="">${categoria}</label>`
    })
    document.querySelector('.checkbox').innerHTML = html_check;
}
/*---------------------------------------------------------------------- */
let eventoSeleccionado = [];
let categoriaSeleccionada = [];
function cargarCheckbox(eventos) {
    let primitivosChecks = document.querySelectorAll('.checkedd')
    primitivosChecks.forEach(check => {
        check.addEventListener('change', () => {
            document.querySelector('.cartass').innerHTML = " ";
            if (check.checked) {
                console.log("seleccionado");

                categoriaSeleccionada.push(check.name)
                console.log(categoriaSeleccionada)
                eventoSeleccionado = eventoSeleccionado.filter(evento => categoriaSeleccionada.includes(evento.categoria))
                cargarCard(eventoSeleccionado);

            } else {
                console.log("deseleccionado")
                eventoSeleccionado = eventoSeleccionado.filter(evento => evento.category == check.name)
                cargarCard(eventoSeleccionado);
            }



        })
    })

}

/* -------------------------------------------------------------------------- */


function buscarSearch(eventos) {
    let buscar = document.querySelector("form button");
    console.log(buscar);

    let inputText = document.querySelector("form input");
    console.log(inputText);

    let tarjetasEncontradas = [];


    buscar.addEventListener('click', e => {
        e.preventDefault()

        let html = "";

        eventos.forEach(evento => {
            if ((evento.name.toLowerCase().includes(inputText.value.toLowerCase())
                || (evento.description.toLowerCase().includes(inputText.value.toLowerCase())))
                && !tarjetasEncontradas.includes(evento)) {
                tarjetasEncontradas.push(evento)
                document.querySelector('.cartass').innerHTML = "";
                html += ` <div class="card col-12 col-md-4 col-xl-3  py-2">
      <img src="${evento.image} " alt="" >
      <div class="card-body">
      
      <h3 class="card-title">${evento.name}</h3>
      <p class="card-text">${evento.description}</p>
    </div>
   
  <div class="row">
  <div class="col-5"><p>Precio:$${evento.price}</p></div>   
  <div class="col-7">
  <a href="./details.html" class="btn btn-primary"> Ver mas  </a >
  </div> 
  </div> 
  </div>
  </div>`
            }
            else {
                tarjetasEncontradas = [];
            }
        })
        document.querySelector('.cartass').innerHTML = html;
    }
    )
}


/* ------------------------------------------------------------- */
