// Función para cargar empleados desde localStorage
function loadEmployees() {
    return JSON.parse(localStorage.getItem("employees")) || [];
}

// Función para guardar empleados en localStorage
function saveEmployees(employees) {
    localStorage.setItem("employees", JSON.stringify(employees));
}

// Función para agregar empleado
function addEmployee() {
    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const job = document.getElementById("job").value;

    // Validaciones
    if (!name || !lastName || !dni) {
        alert("Por favor, complete todos los campos.");
        return;
    }
    if (isNaN(dni) || dni.length < 8) {
        alert("El DNI debe tener al menos 8 dígitos numéricos.");
        return;
    }

    // Guardar empleado
    const employees = loadEmployees();
    employees.push({ name, lastName, dni, job });
    saveEmployees(employees);

    // Actualizar lista
    displayEmployees();
    alert("Empleado agregado correctamente.");
    document.getElementById("employeeForm").reset();
}

// Función para mostrar empleados
function displayEmployees() {
    const employees = loadEmployees();
    const list = document.getElementById("employeeList");
    list.innerHTML = ""; // Limpiar lista previa

    employees.forEach((employee, index) => {
        const li = document.createElement("li");
        li.textContent = `${employee.name} ${employee.lastName} (DNI: ${employee.dni}) - ${getJobDescription(employee.job)}`;
        li.onclick = () => showEmployeeDetails(index); // Mostrar detalles en modal
        list.appendChild(li);
    });
}

// Función para obtener descripción del trabajo
function getJobDescription(job) {
    switch (job) {
        case "mecanico":
            return "Reparación de vehículos";
        case "electricista":
            return "Instalaciones eléctricas";
        case "pintor":
            return "Pintura automotriz";
        default:
            return "Sin especialización";
    }
}

// Función para mostrar detalles en el modal
function showEmployeeDetails(index) {
    const employees = loadEmployees();
    const employee = employees[index];

    // Mostrar contenido en el modal
    const modalContent = document.getElementById("modalContent");
    modalContent.innerHTML = `
        <p><strong>Nombre:</strong> ${employee.name}</p>
        <p><strong>Apellido:</strong> ${employee.lastName}</p>
        <p><strong>DNI:</strong> ${employee.dni}</p>
        <p><strong>Trabajo:</strong> ${getJobDescription(employee.job)}</p>
    `;

    // Mostrar modal
    document.getElementById("modal").style.display = "block";
    document.getElementById("modalOverlay").style.display = "block";
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
}

// Inicializar lista al cargar la página
document.addEventListener("DOMContentLoaded", displayEmployees);
