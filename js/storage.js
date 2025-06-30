// Función para guardar datos en localStorage
function guardarDatos(key, datos) {
  localStorage.setItem(key, JSON.stringify(datos));
}

// Función para leer datos de localStorage
function leerDatos() {
  const metas = JSON.parse(localStorage.getItem("metas")) || [];
  const inversiones = JSON.parse(localStorage.getItem("inversiones")) || [];
  const jubilacion = JSON.parse(localStorage.getItem("jubilacion")) || {};
  return { metas, inversiones, jubilacion };
}

// Función para borrar una clave específica
function borrarDatos(key) {
  localStorage.removeItem(key);
}

// Función para actualizar una parte específica de los datos
function actualizarDatos(key, nuevoDato) {
  guardarDatos(key, nuevoDato);
}

// Función genérica para eliminar un elemento por índice y categoría
function eliminarElementoPorIndice(categoria, indice) {
  let datos = JSON.parse(localStorage.getItem(categoria)) || [];

  if (indice >= 0 && indice < datos.length) {
    datos.splice(indice, 1); // Elimina el elemento en el índice
    guardarDatos(categoria, datos);
  } else {
    alert("Índice inválido.");
  }

  // Actualiza la UI según la categoría
  if (categoria === "metas") {
    mostrarMetas();
  }

  if (categoria === "inversiones") {
    mostrarInversiones();
  }

  if (typeof actualizarGraficoGeneral === "function") {
    actualizarGraficoGeneral();
  }
}
