// Mostrar el resumen general (número de metas, inversiones, etc)
function mostrarResumen() {
  const resumenDiv = document.getElementById("resumen");

  const datos = leerDatos(); // Llamamos a leerDatos desde storage.js 

  const totalInversiones = calcularTotalInversiones(datos.inversiones);
 actualizarGraficoGeneral();
  resumenDiv.innerHTML = `
    <ul>
      <li>Metas de ahorro activas: ${datos.metas?.length || 0}</li>
      <li>Edad estimada de jubilación: ${datos.jubilacion.edadJubilacion || "No definida"}</li>
      <li>Inversiones actuales: $${totalInversiones.toLocaleString()}</li>
    </ul>
  `;
}

// Actualizar el gráfico general (usa graficos.js)
function actualizarGraficoGeneral() {
  const datos = leerDatos(); // Leemos los datos desde storage.js

  const totalMetas = calcularTotalMetas(datos.metas);
  const totalInversiones = calcularTotalInversiones(datos.inversiones);
  const totalOtros = 1000;  // Puedes agregar un valor de ejemplo si es necesario

  console.log('Total Metas:', totalMetas);
  console.log('Total Inversiones:', totalInversiones);
  console.log('Total Otros:', totalOtros);

  const data = {
    labels: ["Ahorro en Metas", "Inversiones", "Otros"],
    datasets: [{
      data: [totalMetas, totalInversiones, totalOtros],
      backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"]
    }]
  };

  console.log('Datos del gráfico:', data); // Verifica que los datos estén correctos

  crearGraficoTorta("graficoFinanzas", data); // Función para crear el gráfico
}

// Función auxiliar para calcular el total ahorrado en metas
function calcularTotalMetas(metas) {
  if (!metas || metas.length === 0) return 0;

  const hoy = new Date(); // Obtenemos la fecha actual

  return metas.reduce((total, meta) => {
    // Calculamos el tiempo restante hasta la fecha límite
    const fechaLimite = new Date(meta.fechaLimite);
    const mesesRestantes = Math.max(Math.floor((fechaLimite - hoy) / (1000 * 60 * 60 * 24 * 30)), 0);

    // Calculamos el total ahorrado (ahorro mensual * meses restantes)
    const ahorroTotal = meta.ahorroMensual * mesesRestantes;

    return total + ahorroTotal;
  }, 0);
}


// 🔥 Función nueva para calcular el total de inversiones
function calcularTotalInversiones(inversiones) {
  if (!inversiones || inversiones.length === 0) return 0;

  return inversiones.reduce((total, inversion) => {
    return total + (inversion.montoInicial || 0);
  }, 0);
}


mostrarResumen();
