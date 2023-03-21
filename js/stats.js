 const allStatsTable = document.getElementById('allStats');
 const upcomingStatsTable = document.getElementById('upcomingStats');
 const pastStatsTable = document.getElementById('pastStats');
 
 obtenerDatos();
 
 async function obtenerDatos() {
  try {
      const response = await fetch(urlApi);
      const data = await response.json();
      console.log(data); // Comprobamos que la respuesta es la esperada
      cargarCard(data.events);
      cargarCardFuture(data);
      loadStats(data.events);
  } catch (error) {
      console.error(error);
  }
}

 function loadStats(eventos) {
     let tableBodyHTML = "";
     let promedioAsistencia = getpromedioAsistencia(eventos);
     let masAsistido = getBigger(eventos);
     let menosAsistido = getSmaller(eventos);
     tableBodyHTML += `<tr>
         <td>${masAsistido.name}</td>
         <td>${menosAsistido.name}</td>
         <td>${masAsistido.height} (${masAsistido.name})</td>
     </tr>`;
     allStatsTable.querySelector('tbody').innerHTML = tableBodyHTML;
 }

   container.innerHTML = tableBodyHTML;

function getpromedioAsistencia(eventos) {
    let totalAsistencia = 0;
    eventos.forEach(evento => {
      totalAsistencia += evento.asistencia;
    });
    return (totalAsistencia / eventos.length).toFixed(2) + "%";
  }
  
  function getBigger(eventos) {
    let mayorCapacidad = 0;
    let eventoMayorCapacidad;
    eventos.forEach(evento => {
      if (evento.capacidad > mayorCapacidad) {
        mayorCapacidad = evento.capacidad;
        eventoMayorCapacidad = evento;
      }
    });
    return eventoMayorCapacidad;
  }


/* - Rellenar las estadísticas dinámicamente. Sólo dejar en el HTML la tabla y los th, pero todos los tr con información se insertan dinámicamente. Traducción de los th:

Estadísticas de eventos: evento con mayor porcentaje de asistencia, evento con menor porcentaje de asistencia, evento con mayor capacidad.

Estadísticas de eventos futuros por categoría: categoría, ganancias de la categoría, porcentaje de asistencia de la categoría.

Estadísticas de eventos pasados por categoría: categoría, ganancias de la categoría, porcentaje de asistencia de la categoría. */