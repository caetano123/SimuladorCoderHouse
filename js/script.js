// Declaración de variables y constantes
let montoMensual, meses, totalAhorro;
const historialAhorro = [];

function pedirDatos() {
    montoMensual = parseInt(prompt("Cuanto por mes vas a ahorrar?"));
    meses = parseInt(prompt("Cuantos meses vas a ahorarr?"));
}

function calcularAhorro(monto, meses) {
    let resultado = monto * meses;
    historialAhorro.push({monto, meses, resultado});
    return resultado;
}

function mostrarResultados(monto, meses, total) {
    console.clear();
    console.log("🧾 Resultado del Simulador de Ahorro");
    console.log("-------------------------------");
    console.log(`Monto mensual ahorrado: $${monto}`);
    console.log(`Cantidad de meses: ${meses}`);
    console.log(`Total acumulado: $${total}`);
    console.log("\n📅 Detalle mes a mes:");

    for(let i = 1; i <= meses; i++){
        console.log(`Mes ${i}: $${monto * i}`)
    }

    alert(`En ${meses} meses habrás ahorrado $${total} 💰`)
}

function inciarSimulador() {
    pedirDatos();

    if(isNaN(montoMensual) || isNaN(meses)){
        console.log("Por favor ingresa valores válidos.");
        return;
    }

    const confirmacion = confirm(`¿Confirmas que queres ahorrar $${montoMensual} por ${meses} meses?`)
    if (confirmacion) {
        totalAhorro = calcularAhorro(montoMensual, meses);
        mostrarResultados(montoMensual, meses, totalAhorro);
    } else {
        alert("Simulacion cancelada.")
    }
}

inciarSimulador();