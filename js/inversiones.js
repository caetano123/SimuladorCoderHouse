// Función para calcular el valor de la inversión
function calcularInversion(montoInicial, rendimientoEsperado, tiempoInversion) {
    const rendimientoMensual = rendimientoEsperado / 100 / 12; // Convertir a mensual
    const tiempoEnAños = tiempoInversion / 12; // Convertir a años
    
    let valores = [];
    
    // Calcular el valor de la inversión cada mes
    for (let i = 1; i <= tiempoInversion; i++) {
      const valorFuturo = montoInicial * Math.pow(1 + rendimientoMensual, i);
      valores.push(valorFuturo.toFixed(2)); // Redondear a 2 decimales
    }
    
    return valores;
  }
  
  // Función para manejar el formulario de inversiones y mostrar el resultado
function simularInversion(event) {
    event.preventDefault(); // Evitar que el formulario se recargue
  
    const montoInicial = parseFloat(document.getElementById("montoInicial").value);
    const rendimientoEsperado = parseFloat(document.getElementById("rendimientoEsperado").value);
    const tiempoInversion = parseInt(document.getElementById("tiempoInversion").value, 10);
  
    if (isNaN(montoInicial) || isNaN(rendimientoEsperado) || isNaN(tiempoInversion) || montoInicial <= 0 || rendimientoEsperado <= 0 || tiempoInversion <= 0) {
      alert("Por favor, ingresa valores válidos.");
      return;
    }
  
    const valoresInversion = calcularInversion(montoInicial, rendimientoEsperado, tiempoInversion);
    mostrarGraficoInversiones(valoresInversion, tiempoInversion);
  
    const nuevaInversion = {
      montoInicial,
      rendimientoEsperado,
      tiempoInversion,
      fecha: new Date().toISOString()
    };
  
    guardarInversion(nuevaInversion); // Guardamos la inversión en el localStorage
  
    document.getElementById("formInversiones").reset(); // Limpiamos el formulario
  
    actualizarGraficoGeneral(); // Actualizamos el gráfico general

    mostrarInversiones();
  }
  
  
  let graficoInversiones; // Variable global para el gráfico

// Función para mostrar o actualizar el gráfico con el crecimiento de la inversión
function mostrarGraficoInversiones(valores, tiempoInversion) {
  const ctx = document.getElementById("graficoInversiones").getContext("2d");
  
  // Si el gráfico ya existe, lo actualizamos
  if (graficoInversiones) {
    graficoInversiones.data.datasets[0].data = valores;
    graficoInversiones.data.labels = Array.from({ length: tiempoInversion }, (_, i) => `Mes ${i + 1}`);
    graficoInversiones.update();
  } else {
    // Si el gráfico no existe, lo creamos
    graficoInversiones = new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from({ length: tiempoInversion }, (_, i) => `Mes ${i + 1}`),
        datasets: [{
          label: "Valor de la inversión ($)",
          data: valores,
          borderColor: "#2196F3", // Color de la línea
          fill: false,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return `$${tooltipItem.raw.toLocaleString()}`; // Mostrar monto con comas
              }
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: function(value) {
                return `$${value.toLocaleString()}`; // Mostrar valores con comas
              }
            }
          }
        }
      }
    });
  }
}

  // Función para guardar una nueva inversión
function guardarInversion(inversion) {
    // Primero, leemos las inversiones actuales del localStorage
    const datos = leerDatos();  // Función que lee las metas, inversiones, jubilación desde localStorage
    const inversiones = JSON.parse(localStorage.getItem("inversiones")) || [];
  
    // Agregamos la nueva inversión al array de inversiones
    inversiones.push(inversion);
  
    // Finalmente, guardamos el array actualizado en el localStorage
    guardarDatos("inversiones", inversiones);
  }

  function mostrarInversiones() {
    const lista = document.getElementById("listaInversiones");
    const datos = leerDatos(); // Lee los datos desde el localStorage
    
    if (!datos.inversiones || datos.inversiones.length === 0) {
      lista.innerHTML = "<p>No tienes inversiones guardadas.</p>";
      return;
    }
  
    // Muestra las inversiones
    lista.innerHTML = datos.inversiones.map((inversion, index) => `
      <div class="inversion">
        <p>Monto inicial: $${inversion.montoInicial.toLocaleString()}</p>
        <p>Rendimiento esperado: ${inversion.rendimientoEsperado}%</p>
        <p>Tiempo de inversión: ${inversion.tiempoInversion} meses</p>
        <p>Fecha de creación: ${new Date(inversion.fecha).toLocaleDateString()}</p>
        <button id="inversion-eliminar-${index}" class="Eliminar">Eliminar</button>
        <hr>
      </div>
    `).join("");

    datos.inversiones.forEach((_, index) => {
      const boton = document.getElementById(`inversion-eliminar-${index}`);
      if (boton) {
        boton.addEventListener("click", () => eliminarElementoPorIndice("inversiones", index));
      }
    });

  }
  
  // Agregar el evento al formulario para manejar la simulación
  document.getElementById("formInversiones").addEventListener("submit", simularInversion);
  mostrarInversiones();
  