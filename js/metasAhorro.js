document.addEventListener("DOMContentLoaded", () => {
  // Cargar metas desde JSON si no hay metas en localStorage
  if (!localStorage.getItem("metas")) {
    fetch("../metas.json")
      .then(response => {
        if (!response.ok) throw new Error("No se pudo cargar metas.json");
        return response.json();
      })
      .then(data => {
        guardarDatos("metas", data);
        mostrarMetas();
      })
      .catch(error => {
        console.error("Error cargando metas:", error);
        // Mostrar mensaje o manejar error
      });
  } else {
    mostrarMetas();
  }

  const form = document.getElementById("formMetas");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombreInput = document.getElementById("nombreMeta");
      const montoInput = document.getElementById("montoMeta");
      const ahorroInput = document.getElementById("ahorroMensual");
      const fechaInput = document.getElementById("fechaLimite");

      if (!nombreInput || !montoInput || !ahorroInput || !fechaInput) {
        alert("Error en el formulario.");
        return;
      }

      const nombre = nombreInput.value.trim();
      const monto = parseFloat(montoInput.value);
      const ahorroMensual = parseFloat(ahorroInput.value);
      const fechaLimite = fechaInput.value;

      if (!nombre || isNaN(monto) || isNaN(ahorroMensual) || !fechaLimite) {
        alert("Por favor completa todos los campos correctamente.");
        return;
      }

      const nuevaMeta = {
        id: Date.now(),
        nombre,
        monto,
        ahorroMensual,
        fechaLimite,
        ahorrado: 0
      };

      const datos = leerDatos();
      const metasActualizadas = [...datos.metas, nuevaMeta];
      guardarDatos("metas", metasActualizadas);

      form.reset();

      mostrarMetas();

      if (typeof actualizarGraficoGeneral === "function") {
        actualizarGraficoGeneral();
      }
    });
  }
});

function mostrarMetas() {
  const lista = document.getElementById("listaMetas");
  if (!lista) return;

  const datos = leerDatos();

  if (!datos.metas || datos.metas.length === 0) {
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
