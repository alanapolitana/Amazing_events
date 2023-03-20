let verMas ;

const queryString = location.search

const params = new URLSearchParams(queryString)

const id = params.get("id")

let htmlDetails = "" ;



obtenerDatos();
async function obtenerDatos() {
    try {
        const response = await fetch(urlApi)
        data = await response.json();
        console.log(response)
        verMas = data.events.find(ver => ver._id == id)
        cargarDetails();

    } catch (error) {

    }
}



function cargarDetails(){
  htmlDetails = `
<div class="row" id="cajadetail">
    <div class="cardetails">
        <div class="row" id="cardetails1" >
            <div class="card col-6" id="imgdetail">
            <img src="${verMas.image}" alt="imagen" id="logo_details">
            </div>
            <div class="card col-6" id="textdetail" >
            <h1>${verMas.name}</h1>
            <h3>${verMas.description}</h3>
              <br>
              
            <h4>Fecha : ${verMas.date}</h4>
              <h4>Categoria : ${verMas.category}</h4>
              <h4>Capacidad : ${verMas.capacity}</h4>
              <h4>Asistencia : ${verMas.assistance}</h4>
              <h4>Precio : $ ${verMas.price}</h4>
              <a href="./index.html" class="btn btn-primary"> Volver Atras </a >
             </div>
        </div>
    </div>
         </div>

`
document.querySelector(".cartass").innerHTML = htmlDetails ;
 
}



