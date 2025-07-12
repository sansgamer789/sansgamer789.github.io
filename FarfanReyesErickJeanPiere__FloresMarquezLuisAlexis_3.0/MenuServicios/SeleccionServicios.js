let registroClientes = [];

function guardarCliente() {
    const nombre = document.getElementById("nombreInput").value;
    const apellidos = document.getElementById("apellidoInput").value;
    const dni = document.getElementById("dniInput").value;
    const numero = document.getElementById("numeroInput").value;

    // Validaciones específicas con mensajes
    if (!nombre) {
        mostrarMensaje("El campo 'Nombre' no puede estar vacío.");
        return;
    }
    if (!apellidos) {
        mostrarMensaje("El campo 'Apellidos' no puede estar vacío.");
        return;
    }
    if (dni.length !== 8 || isNaN(dni)) {
        mostrarMensaje("El DNI debe ser un número de 8 dígitos.");
        return;
    }
    if (numero.length < 7 || isNaN(numero)) {
        mostrarMensaje("El número de contacto debe tener al menos 7 dígitos y ser válido.");
        return;
    }

    // Guardar los datos en localStorage
    localStorage.setItem("clienteNombre", nombre);
    localStorage.setItem("clienteApellidos", apellidos);
    localStorage.setItem("clienteDNI", dni);
    localStorage.setItem("clienteNumero", numero);

    // Agregar cliente al registro si todos los datos son válidos
    registroClientes.push({ nombre, apellidos, dni, numero });
    mostrarMensaje(
        `Se agregó al cliente: ${apellidos}, ${nombre}, con el teléfono: ${numero} y DNI: ${dni}.`
    );
    limpiarCampos();
    actualizarVistaRegistro();
}


function actualizarVistaRegistro() {
    const registroDiv = document.getElementById('registro');
    registroDiv.innerHTML = ''; // Limpiar la vista anterior

    registroClientes.forEach((cliente, index) => {
        const clienteDiv = document.createElement('div');
        clienteDiv.innerHTML = `
            <strong>Cliente ${index + 1}:</strong> ${cliente.apellidos}, ${cliente.nombre}, Teléfono: ${cliente.numero}, DNI: ${cliente.dni}<br>
        `;
        registroDiv.appendChild(clienteDiv);
    });
}


function mostrarMensaje(mensaje) {
    document.getElementById('resultado').textContent = mensaje;
}

function limpiarCampos() {
    document.getElementById('nombreInput').value = '';
    document.getElementById('apellidoInput').value = '';
    document.getElementById('dniInput').value = '';
    document.getElementById('numeroInput').value = '';
}

function BorrarCliente() {
    const dniBuscado = document.getElementById('dniEliminarInput').value.trim();

    if (!dniBuscado || dniBuscado.length !== 8 || isNaN(dniBuscado)) {
        mostrarMensaje("Por favor, ingrese un DNI válido para buscar.");
        return;
    }

    const indice = registroClientes.findIndex(cliente => cliente.dni === dniBuscado);

    if (indice === -1) {
        mostrarMensaje(`No se encontró un cliente con el DNI: ${dniBuscado}.`);
        return;
    }

    const clienteBorrado = registroClientes.splice(indice, 1)[0]; // Eliminar el cliente
    mostrarMensaje(`Cliente ${clienteBorrado.apellidos}, ${clienteBorrado.nombre} borrado correctamente.`);
    actualizarVistaRegistro();

    // Limpiar el campo de entrada
    document.getElementById('dniEliminarInput').value = '';
}

function buscarCliente() {
    const dniBuscado = document.getElementById('dniBuscarInput').value.trim();

    // Validación del DNI ingresado
    if (!dniBuscado || dniBuscado.length !== 8 || isNaN(dniBuscado)) {
        mostrarMensajeBusqueda("Por favor, ingrese un DNI válido (8 dígitos).");
        return;
    }

    // Buscar el cliente en el registro
    const clienteEncontrado = registroClientes.find(cliente => cliente.dni === dniBuscado);

    if (!clienteEncontrado) {
        mostrarMensajeBusqueda(`No se encontró un cliente con el DNI: ${dniBuscado}.`);
        return;
    }

    // Mostrar los detalles del cliente encontrado
    mostrarMensajeBusqueda(`
        <strong>Cliente encontrado:</strong><br>
        Nombre: ${clienteEncontrado.nombre} ${clienteEncontrado.apellidos}<br>
        Teléfono: ${clienteEncontrado.numero}<br>
        DNI: ${clienteEncontrado.dni}<br>
        
    `);
}

// Función para mostrar los mensajes en el div
function mostrarMensajeBusqueda(mensaje) {
    // Selecciona el div donde se mostrará el mensaje
    const resultadoDiv = document.getElementById('resultadoBusqueda');
    
    // Establece el contenido del div con el mensaje
    resultadoDiv.innerHTML = mensaje;
}
