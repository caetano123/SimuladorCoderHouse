// metasAhorro.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formMetas");

    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevenir que recargue la página
  
      // Capturamos los datos del formulario
      const nombre = document.getElementById("nombreMeta").value;
      const monto = parseFloat(document.getElementById("montoMeta").value);
      const ahorroMensual = parseFloat(document.getElementById("ahorroMensual").value);
      const fechaLimite = document.getElementById("fechaLimite").value;
  
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
  
      // Refrescamos la lista de metas (si quieres mostrarla en pantalla)
      mostrarMetas();

      actualizarGraficoGeneral();
    });
  
    // Cargar metas cuando arranca la página
    mostrarMetas();
  });
  
  // Mostrar la lista de metas en pantalla
  function mostrarMetas() {
    const lista = document.getElementById("listaMetas");
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
  