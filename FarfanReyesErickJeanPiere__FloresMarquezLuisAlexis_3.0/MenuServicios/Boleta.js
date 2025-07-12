// Datos de servicios
const servicios = {
    "Cambio de Pintura": {
        "Mate": 1200,
        "Clásicos": 1500,
        "Nacarados": 2000
    },
    "Mantenimiento Automotriz": {
        "Adaptación": 500,
        "Cambio de Aceite": 150,
        "Frenos": 300,
        "Limpieza": 150,
        "Llantas": 400,
        "Llaves": 150,
        "Motor": 1500,
        "Parabrisas": 500,
        "Cambio de Puertas": 1000
    },
    "Accesorios": {
        "Repuestos": 200,
        "Aros": 800,
        "Dados para llanta": 30,
        "Faros": 300,
        "Fundas para autos": 80,
        "Parachoque": 600,
        "Silicona": 30
    }
};

const IGV_RATE = 0.18; // Porcentaje del IGV
const categoriaSelect = document.getElementById("categoria");
const servicioSelect = document.getElementById("servicio");
const cantidadLabel = document.getElementById("cantidadLabel");
const cantidadInput = document.getElementById("cantidad");
const tablaBody = document.getElementById("factura-body");
const nombreClienteInput = document.getElementById("nombreCliente");
const apellidoClienteInput = document.getElementById("apellidoCliente");
const telefonoClienteInput = document.getElementById("telefonoCliente");
const dniClienteInput = document.getElementById("clienteDNI");
const serviciosAgregadosLista = document.getElementById("serviciosAgregadosLista");
let total = 0;
let numeroFactura = 1;
let serviciosAgregados = [];
let boletasGeneradas = [];


// Cargar servicios según categoría seleccionada
function cargarServicios() {
    const categoria = categoriaSelect.value;
    servicioSelect.innerHTML = "";
    Object.keys(servicios[categoria]).forEach(servicio => {
        const option = document.createElement("option");
        option.value = servicio;
        option.textContent = servicio;
        servicioSelect.appendChild(option);
    });
    verificarCantidad();
}

// Mostrar/ocultar cantidad según el servicio
function verificarCantidad() {
    const servicio = servicioSelect.value;
    // Mostrar la cantidad para Llantas, Cambio de Puertas y cualquier servicio de la categoría "Accesorios"
    if (servicio === "Llantas" || servicio === "Cambio de Puertas" || categoriaSelect.value === "Accesorios") {
        cantidadLabel.classList.remove("hidden");
    } else {
        cantidadLabel.classList.add("hidden");
        cantidadInput.value = 1; // Restablecer cantidad a 1 si no aplica
    }
}

// Llamar la función al cambiar la categoría o servicio
categoriaSelect.addEventListener("change", cargarServicios);
servicioSelect.addEventListener("change", verificarCantidad);
cargarServicios();

// Agregar servicio a la boleta
function agregarServicio() {
    const categoria = categoriaSelect.value;
    const servicio = servicioSelect.value;
    const cantidad = parseInt(cantidadInput.value, 10);
    const precioUnitario = servicios[categoria][servicio];
    const igv = precioUnitario * IGV_RATE;
    const totalConIGV = (precioUnitario + igv) * cantidad;

    serviciosAgregados.push({
        categoria,
        servicio,
        cantidad,
        precioUnitario,
        igv,
        totalConIGV
    });

    actualizarListaServicios();

    total += totalConIGV;
    document.getElementById("totalFactura").textContent = `Total: S/ ${total.toFixed(2)}`;

    // Mostrar botón si hay servicios
    document.querySelector(".btn-generar").classList.toggle("hidden", serviciosAgregados.length === 0);
}


// Actualizar lista de servicios agregados
function actualizarListaServicios() {
    serviciosAgregadosLista.innerHTML = "";
    serviciosAgregados.forEach((servicio, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${servicio.categoria}</td>
            <td>${servicio.servicio}</td>
            <td>${servicio.cantidad}</td>
            <td>S/ ${servicio.precioUnitario.toFixed(2)}</td>
            <td>S/ ${servicio.igv.toFixed(2)}</td>
            <td>S/ ${servicio.totalConIGV.toFixed(2)}</td>
            <td><button class="btn-eliminar" onclick="eliminarServicio(${index})">Eliminar</button></td>
        `;
        serviciosAgregadosLista.appendChild(tr);
    });
}

// Eliminar servicio de la lista
function eliminarServicio(index) {
    const servicioEliminado = serviciosAgregados.splice(index, 1)[0];
    total -= servicioEliminado.totalConIGV;
    document.getElementById("totalFactura").textContent = `Total: S/ ${total.toFixed(2)}`;
    actualizarListaServicios();
}

// Generar boleta
function generarBoleta() {
    const clienteNombre = nombreClienteInput.value + " " + apellidoClienteInput.value;
    const clienteTelefono = telefonoClienteInput.value;

    // Guardar boleta en historial
    boletasGeneradas.push({
        clienteNombre,
        clienteTelefono,
        servicios: [...serviciosAgregados],
        total
    });

    // Mostrar boleta
    mostrarBoleta(clienteNombre, clienteTelefono);

    // Incrementar número de boleta
    numeroFactura++;

    // Limpiar formulario y datos
    nuevaFactura();
}

// Mostrar boleta generada
function mostrarBoleta(clienteNombre, clienteTelefono) {
    const boletaContainer = document.createElement("div");
    boletaContainer.classList.add("boleta");
    boletaContainer.innerHTML = `
        <h3>Boleta N° ${numeroFactura}</h3>
        <p><strong>Nombre Cliente:</strong> ${clienteNombre}</p>
        <p><strong>Teléfono:</strong> ${clienteTelefono}</p>
        
        <table>
            <thead>
                <tr>
                    <th>Categoría</th>
                    <th>Servicio</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>IGV</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${serviciosAgregados.map(servicio => `
                    <tr>
                        <td>${servicio.categoria}</td>
                        <td>${servicio.servicio}</td>
                        <td>${servicio.cantidad}</td>
                        <td>S/ ${servicio.precioUnitario.toFixed(2)}</td>
                        <td>S/ ${servicio.igv.toFixed(2)}</td>
                        <td>S/ ${servicio.totalConIGV.toFixed(2)}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
        <p><strong>Total:</strong> S/ ${total.toFixed(2)}</p>
    `;
    document.getElementById("boletasGeneradas").appendChild(boletaContainer);
}

// Reiniciar para nueva factura
function nuevaFactura() {
    nombreClienteInput.value = "";
    apellidoClienteInput.value = "";
    telefonoClienteInput.value = "";
    total = 0;
    serviciosAgregados = [];
    numeroFactura++;
    document.getElementById("totalFactura").textContent = "Total: S/ 0.00";
    serviciosAgregadosLista.innerHTML = "";
    document.querySelector(".btn-generar").classList.add("hidden");
}
 // Función para cargar los datos del cliente desde localStorage
 function cargarDatosCliente() {
    const nombre = localStorage.getItem("clienteNombre");
    const apellidos = localStorage.getItem("clienteApellidos");
    const dni = localStorage.getItem("clienteDNI");
    const numero = localStorage.getItem("clienteNumero");

    // Mostrar los datos en los campos correspondientes
    if (nombre && apellidos && dni && numero) {
        document.getElementById("nombreCliente").value = nombre;
        document.getElementById("apellidoCliente").value = apellidos;
        document.getElementById("telefonoCliente").value = numero;

        // Mostrar también en la sección de factura si es necesario
        document.getElementById("clienteNombre").textContent = `${nombre} ${apellidos}`;
        document.getElementById("clienteTelefono").textContent = numero;
    }
}

// Llamar a la función cuando cargue la página
window.onload = cargarDatosCliente;
// Obtener la fecha actual
const fecha = new Date();

// Formatear la fecha en formato dd/mm/yyyy
const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()}`;

// Insertar la fecha en el elemento con id="fecha"
document.getElementById('fecha').textContent = fechaFormateada;

// Obtener la fecha y hora actual
const fechaHora = new Date();

// Obtener las horas, minutos y segundos
const horas = fechaHora.getHours().toString().padStart(2, '0');
const minutos = fechaHora.getMinutes().toString().padStart(2, '0');
const segundos = fechaHora.getSeconds().toString().padStart(2, '0');

// Formatear la hora en formato hh:mm:ss
const horaFormateada = `${horas}:${minutos}:${segundos}`;

// Insertar la hora en el elemento con id="hora"
document.getElementById('hora').textContent = horaFormateada;

