// metasAhorro.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formMetas");

  // ✅ Verificamos que el formulario exista
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevenir que recargue la página

      // Capturamos los datos del formulario
      const nombreInput = document.getElementById("nombreMeta");
      const montoInput = document.getElementById("montoMeta");
      const ahorroInput = document.getElementById("ahorroMensual");
      const fechaInput = document.getElementById("fechaLimite");

      // ✅ Verificamos existencia de los inputs antes de acceder a sus valores
      if (!nombreInput || !montoInput || !ahorroInput || !fechaInput) {
        alert("Hay un error con el formulario. Verifica que los campos existan.");
        return;
      }

      const nombre = nombreInput.value;
      const monto = parseFloat(montoInput.value);
      const ahorroMensual = parseFloat(ahorroInput.value);
      const fechaLimite = fechaInput.value;

      if (!nombre || !monto || !ahorroMensual || !fechaLimite) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      // Creamos el objeto meta
      const nuevaMeta = {
        id: Date.now(), // ID único basado en el tiempo
        nombre,
        monto,
        ahorroMensual,
        fechaLimite,
        ahorrado: 0 // Arranca en 0
      };

      // Traemos las metas existentes
      const datosActuales = leerDatos();
      const metasActualizadas = [...datosActuales.metas, nuevaMeta];

      // Guardamos las nuevas metas
      guardarDatos("metas", metasActualizadas);

      // Limpia el formulario
      form.reset();

      // Refrescamos la lista de metas
      mostrarMetas();
      actualizarGraficoGeneral?.(); // ✅ Si la función existe, la ejecuta
    });

    // Cargar metas cuando arranca la página
    mostrarMetas();
  }
});

// Mostrar la lista de metas en pantalla
function mostrarMetas() {
  const lista = document.getElementById("listaMetas");

  // ✅ Verificamos si el contenedor existe
  if (!lista) return;

  const datos = leerDatos();

  if (datos.metas.length === 0) {
    lista.innerHTML = "<p>No tienes metas guardadas.</p>";
    return;
  }

  lista.innerHTML = datos.metas.map((meta, index) => `
    <div class="meta">
      <h4>${meta.nombre}</h4>
      <p>Objetivo: $${meta.monto.toLocaleString()}</p>
      <p>Ahorro mensual: $${meta.ahorroMensual.toLocaleString()}</p>
      <p>Fecha límite: ${meta.fechaLimite}</p>
      <button id="meta-eliminar-${index}" class="Eliminar">Eliminar</button>
      <hr>
    </div>
  `).join("");

  datos.metas.forEach((_, index) => {
    const boton = document.getElementById(`meta-eliminar-${index}`);
    if (boton) {
      boton.addEventListener("click", () => eliminarElementoPorIndice("metas", index));
    }
  });
}
