// storage.js

// Función para guardar datos en localStorage
function guardarDatos(key, datos) {
    localStorage.setItem(key, JSON.stringify(datos));
  }
  
  // Función para leer datos de localStorage
  function leerDatos() {
    const metas = JSON.parse(localStorage.getItem("metas")) || [];
    const inversiones = JSON.parse(localStorage.getItem("inversiones")) || { total: 0 };
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

    // Verifica que el índice sea válido
    if (indice >= 0 && indice < datos.length) {
        datos.splice(indice, 1); // Elimina el elemento en el índice especificado
        guardarDatos(categoria, datos); // Vuelve a guardar el array actualizado
    } else {
        alert("Índice inválido.");
    }

    if (categoria === "metas") {
      mostrarMetas(); // Vuelve a mostrar la lista
    }

    if (categoria === "inversiones") {
      mostrarInversiones(); // Vuelve a mostrar la lista
    }

    actualizarGraficoGeneral();
}

// Función para guardar los datos en localStorage
function guardarDatos(key, datos) {
    localStorage.setItem(key, JSON.stringify(datos));
}