let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

let data = [];

obtenerDatos();

async function obtenerDatos(){
  try {const response = await fetch(urlApi)
  data = await response.json();
    console.log(response)
    
  } catch (error) {
    
  }
}

let htmlEvents = "";

function cargarCard(eventos) {
  htmlEvents = "";
  for (let event of eventos) {
    htmlEvents += `
      <div class="card col-12 col-md-4 col-xl-3  py-2">
        <img src="${event.image}" >
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
    `;
  }

  document.querySelector('.cartass').innerHTML = htmlEvents
};

let categorias = [];
function createCheckbox(eventos) {
  eventos.forEach(evento => {
    if (!categorias.includes(evento.category)) {
      categorias.push(evento.category);
    }
  });

  let html_check = "";
  categorias.forEach(categoria => {
    html_check += `
      <input type="checkbox" class="checkedd" name="${categoria}">
      <label for="">${categoria}</label>
    `;
  });

  document.querySelector('.checkbox').innerHTML = html_check;
}
let eventoSeleccionado = [];
let categoriaSeleccionada = [];

function cargarCheckbox(eventos) {
  let primitivosChecks = document.querySelectorAll('.checkedd');
  
  primitivosChecks.forEach(check => {
    check.addEventListener('change', () => {
      document.querySelector('.cartass').innerHTML = "";
      if (check.checked) {
        console.log("seleccionado");
        categoriaSeleccionada.push(check.name);
        console.log(categoriaSeleccionada);
        eventoSeleccionado = eventos.filter(evento =>
          categoriaSeleccionada.includes(evento.category)
        );
        cargarCard(eventoSeleccionado);
      } else {
        console.log("deseleccionado");
        categoriaSeleccionada = categoriaSeleccionada.filter(category =>
          category !== check.name
        );
        eventoSeleccionado = eventos.filter(evento =>
          categoriaSeleccionada.includes(evento.category)
        );
        cargarCard(eventoSeleccionado);
      }
    });
  });
}

function buscarSearch(eventos) {
  let buscar = document.querySelector("form button");

  let inputText = document.querySelector("form input");

  buscar.addEventListener('click', e => {
    e.preventDefault();

    let html = "";
    let tarjetasEncontradas = [];

    eventos.forEach(evento => {
      if (evento.name.toLowerCase().includes(inputText.value.toLowerCase()) ||
          evento.description.toLowerCase().includes(inputText.value.toLowerCase())) {

        if (!tarjetasEncontradas.includes(evento) &&
            (categoriaSeleccionada.length === 0 || categoriaSeleccionada.includes(evento.category))) {

          tarjetasEncontradas.push(evento);

          html += `<div class="card col-12 col-md-4 col-xl-3  py-2">
                    <img src="${evento.image} " alt="">
                    <div class="card-body">
                      <h3 class="card-title">${evento.name}</h3>
                      <p class="card-text">${evento.description}</p>
                    </div>
                    <div class="row">
                      <div class="col-5"><p>Precio:$${evento.price}</p></div>
                      <div class="col-7">
                        <a href="./details.html?id=${evento._id}" class="btn btn-primary"> Ver mas </a>
                      </div>
                    </div>
                  </div>`;
        }
      }
    });

    if (html === "") {
      alert("No se encontraron resultados en la búsqueda");
    }

    document.querySelector('.cartass').innerHTML = html;
  });
}
