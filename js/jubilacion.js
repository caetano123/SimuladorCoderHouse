// jubilacion.js

document.addEventListener("DOMContentLoaded", () => {
    const formJubilacion = document.getElementById("formJubilacion");
  
    formJubilacion.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevenir recarga de página
  
      // Obtener los datos del formulario
      const edadActual = parseInt(document.getElementById("edadActual").value);
      const edadJubilacion = parseInt(document.getElementById("edadJubilacion").value);
      const ahorroActual = parseFloat(document.getElementById("ahorroActual").value);
      const aporteMensual = parseFloat(document.getElementById("aporteMensual").value);
      const rendimientoAnual = parseFloat(document.getElementById("rendimientoAnual").value) / 100; // Convertir a decimal
  
      if (isNaN(edadActual) || isNaN(edadJubilacion) || isNaN(ahorroActual) || isNaN(aporteMensual) || isNaN(rendimientoAnual)) {
        alert("Por favor ingresa valores válidos en todos los campos.");
        return;
      }
  
      // Calcular los años hasta jubilación
      const añosHastaJubilacion = edadJubilacion - edadActual;
      if (añosHastaJubilacion <= 0) {
        alert("La edad objetivo de jubilación debe ser mayor que la edad actual.");
        return;
      }
  
      // Calcular el ahorro final
      const ahorroFinal = calcularAhorroFinal(ahorroActual, aporteMensual, rendimientoAnual, añosHastaJubilacion);
  
      // Mostrar el resultado en el div de resultado
      const resultadoDiv = document.getElementById("resultadoJubilacion");
      resultadoDiv.innerHTML = `
        <h3>Resultado de tu Planificación</h3>
        <p>Ahorro actual: $${ahorroActual.toLocaleString()}</p>
        <p>Aporte mensual: $${aporteMensual.toLocaleString()}</p>
        <p>Rendimiento anual: ${(rendimientoAnual * 100).toFixed(2)}%</p>
        <p>Años hasta jubilación: ${añosHastaJubilacion} años</p>
        <p><strong>Ahorro total estimado al momento de jubilación: $${ahorroFinal.toLocaleString()}</strong></p>
      `;
  
      // Guardar los datos en el localStorage
      const jubilacionData = {
        edadActual,
        edadJubilacion,
        ahorroActual,
        aporteMensual,
        rendimientoAnual,
        ahorroFinal
      };
  
      // Guardar en el localStorage
      localStorage.setItem("jubilacion", JSON.stringify(jubilacionData));
    });
  
    // Cargar datos previos (si existen) desde el localStorage
    cargarDatosPrevios();
  });
  
  // Calcular el ahorro final
  function calcularAhorroFinal(ahorroActual, aporteMensual, rendimientoAnual, añosHastaJubilacion) {
  if (rendimientoAnual === 0) {
    return ahorroActual + aporteMensual * 12 * añosHastaJubilacion;
  }
  const r = rendimientoAnual;
  const n = añosHastaJubilacion;

  const ahorroFinal =
    ahorroActual * Math.pow(1 + r, n) +
    aporteMensual * 12 * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

  return ahorroFinal;
}
  
  // Cargar datos de jubilación previos desde localStorage
  function cargarDatosPrevios() {
    const jubilacionData = JSON.parse(localStorage.getItem("jubilacion"));
  
    if (jubilacionData) {
      document.getElementById("edadActual").value = jubilacionData.edadActual || "";
      document.getElementById("edadJubilacion").value = jubilacionData.edadJubilacion || "";
      document.getElementById("ahorroActual").value = jubilacionData.ahorroActual || "";
      document.getElementById("aporteMensual").value = jubilacionData.aporteMensual || "";
      document.getElementById("rendimientoAnual").value = jubilacionData.rendimientoAnual ? (jubilacionData.rendimientoAnual * 100) : "";
  
      // Mostrar el resultado previamente guardado
      document.getElementById("resultadoJubilacion").innerHTML = `
        <h3>Resultado de tu Planificación</h3>
        <p>Ahorro actual: $${jubilacionData.ahorroActual.toLocaleString()}</p>
        <p>Aporte mensual: $${jubilacionData.aporteMensual.toLocaleString()}</p>
        <p>Rendimiento anual: ${(jubilacionData.rendimientoAnual * 100).toFixed(2)}%</p>
        <p>Años hasta jubilación: ${jubilacionData.edadJubilacion - jubilacionData.edadActual} años</p>
        <p><strong>Ahorro total estimado al momento de jubilación: $${jubilacionData.ahorroFinal.toLocaleString()}</strong></p>
      `;
    }
  }
  