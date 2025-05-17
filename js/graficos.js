// graficos.js

// Creamos y devolvemos un gráfico de torta
function crearGraficoTorta(idCanvas, data) {
    const ctx = document.getElementById(idCanvas).getContext('2d');
  
    // Si ya existe un gráfico en ese canvas, primero lo destruimos
    if (ctx.chart) {
      ctx.chart.destroy();
    }
  
    // Crear el nuevo gráfico
    ctx.chart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                return `${label}: $${value.toLocaleString()}`;
              }
            }
          }
        }
      }
    });
  }
  
  // Si quieres después hacer gráficos de líneas o barras, puedes agregar aquí nuevas funciones
  