let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";
let data = [];

obtenerDatos();

async function obtenerDatos() {
  try {
    const response = await fetch(urlApi);
    data = await response.json();
    console.log(data);
    crearTabla();
  /*   upcomingEventsStats();
    pastEventsStats(); */
  } catch (error) {
/*     console.log(error.message); */
  }
}

/* -------------ALL---EVENTS-------------- */
function calcularPorcentajeAsistenciaMayor() {
  let mayorPorcentajeAsistencia = 0;
  let eventoMayorAsistencia = null;
  data.events.forEach(event => {
    const porcentajeAsistencia = ((event.assistance || event.estimate) * 100 / event.capacity);
    if (porcentajeAsistencia > mayorPorcentajeAsistencia) {
      mayorPorcentajeAsistencia = porcentajeAsistencia;
      eventoMayorAsistencia = event.name;
    }
  });
  console.log(`El evento con mayor porcentaje de asistencia es: ${eventoMayorAsistencia} con un porcentaje del ${mayorPorcentajeAsistencia.toFixed(2)}%`);
  return (`${eventoMayorAsistencia} con un porcentaje del ${mayorPorcentajeAsistencia.toFixed(2)}%`)
}

function calcularPorcentajeAsistenciaMenor() {
  let menorPorcentajeAsistencia = 100;
  let eventoMenorAsistencia = null;
  data.events.forEach(event => {
    const porcentajeAsistencia = ((event.assistance || event.estimate) * 100 / event.capacity);
    if (porcentajeAsistencia < menorPorcentajeAsistencia) {
      menorPorcentajeAsistencia = porcentajeAsistencia;
      eventoMenorAsistencia = event.name;
    }
  });

  console.log(`El evento con menor porcentaje de asistencia es: ${eventoMenorAsistencia} con un porcentaje del ${menorPorcentajeAsistencia.toFixed(2)}%`);
  return (`${eventoMenorAsistencia} con un porcentaje del ${menorPorcentajeAsistencia.toFixed(2)}%`)
}

function calcularMayorCapacidad() {
  let mayorCapacidad = 0;
  let eventoMayorCapacidad = null;
  data.events.forEach(event => {
    if (mayorCapacidad < event.capacity) {
      mayorCapacidad = event.capacity;
      eventoMayorCapacidad = event.name;
    }
  });
  console.log(`El evento con mayor capacidad es: ${eventoMayorCapacidad} con capacidad de ${mayorCapacidad}`);
  return (` ${eventoMayorCapacidad} con capacidad de ${mayorCapacidad}`);
}

function crearTabla() {
  let tdAllEvents = `<tr>
 <th scope="row" colspan="3" class="table-warning border-dark">Events statistics</th>
 </tr>

 <tr>
 <th>Events with the highest percentage of attendence</th>
 <th>Events with the lovest percentage of attendance</th>
 <th>Event with large capacity</th>
</tr>
 
<tr>
 <td>${calcularPorcentajeAsistenciaMayor()}</td>
 <td>${calcularPorcentajeAsistenciaMenor()}</td>
  <td>${calcularMayorCapacidad()}</td> 
 </tr>

 <tr>
 <th scope="row" colspan="3" class="table-warning border-dark">Upcoming statistics by category</th>
</tr>
<tr>
 <th>Categories</th>
 <th>Revenue </th>
 <th>Percentage of attendance</th>
</tr>
  ` 
  tdAllEvents += upcomingEventsStats();
  tdAllEvents +=  `
<tr>
<th scope="row" colspan="3" class="table-warning border-dark">Past events statistics by category</th>
</tr>
<tr>
<th>Categories</th>
<th>Revenue </th>
<th>Percentage of attendance</th>
</tr>
`
tdAllEvents += pastEventsStats();
  document.querySelector("#allStats").innerHTML = tdAllEvents;
}


/*--------------------eventosFuturos------------------- */
function eventosPorFecha(dato, bandera) {
  if (bandera) {
    return data.events.filter(event => new Date(event.date) > new Date(dato.currentDate));
  } else {
    return data.events.filter(event => new Date(event.date) < new Date(dato.currentDate));
  }
}

function upcomingEventsStats() {
  return crearString(eventosPorCategoria(eventosPorFecha(data, true)));
}

function pastEventsStats() {
return crearString(eventosPorCategoria(eventosPorFecha(data, false))) ;
}


function eventosPorCategoria(eventos) {
  let categorias = [];
  eventos.forEach(event => {

    if (categorias.length === 0) {
      cargarUnElemento(categorias, event)

    }
    else if(verificarE(categorias,event)) {
    }
    else {
      cargarUnElemento(categorias, event);
    }
  })
  calcularPorcentaje(categorias)
 return categorias ;
}




function cargarUnElemento(categorias, event) {
  categorias.push({
    categoria: event.category,
    capacidad: event.capacity,
    ganancia: (event.assistance || event.estimate) * event.price,
    porcentaje: 0,
    asistencia: (event.assistance || event.estimate)
  })

}

function verificarE(categorias, event) {
  let flags = false;

  categorias.forEach(evento => {
    if (evento.categoria === event.category) {
      evento.capacidad += event.capacity
      evento.ganancia += (event.assistance || event.estimate) * event.price,
        evento.porcentaje = 0,
        evento.asistencia += (event.assistance || event.estimate)
     
      flags = true;
    }
  })
  return flags;
}

function calcularPorcentaje(categorias){
  categorias.forEach(
    categoria => categoria.porcentaje = ((categoria.asistencia*100)/categoria.capacidad).toFixed(2)
  )
 }


 function crearString(categorias){
let htmlTable = " ";
categorias.forEach( categoria =>
  {
htmlTable += `


      <tr>
          <td>${categoria.categoria}</td>
          <td>$${categoria.ganancia}</td>
          <td>${categoria.porcentaje}%</td>
      </tr>


`

  }
)
return htmlTable;
 }

/*   Estadísticas de eventos futuros por categoría: categoría, ganancias de la categoría, porcentaje de asistencia de la categoría.

Estadísticas de eventos pasados por categoría: categoría, ganancias de la categoría, porcentaje de asistencia de la categoría. */