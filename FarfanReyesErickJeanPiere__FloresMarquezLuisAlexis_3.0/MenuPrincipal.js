// Referencia al tbody de empleados
const employeeTableBody = document.querySelector("table tbody");

// Función para cargar empleados desde localStorage y mostrarlos
function displayEmployees() {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employeeTableBody.innerHTML = ""; // Limpia la tabla antes de renderizar

    employees.forEach((employee, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.lastName}</td>
            <td>${employee.job}</td>
            <td>${employee.dni}</td>
            <td><button onclick="removeEmployee(${index})">Eliminar</button></td>
        `;
        employeeTableBody.appendChild(row);
    });
}

// Función para añadir un nuevo empleado
function addEmployee(name, lastName, job, dni) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push({ name, lastName, job, dni });
    localStorage.setItem("employees", JSON.stringify(employees));
    displayEmployees(); // Refresca la tabla
}

// Función para eliminar un empleado por índice
function removeEmployee(index) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.splice(index, 1); // Elimina el empleado en el índice dado
    localStorage.setItem("employees", JSON.stringify(employees));
    displayEmployees(); // Refresca la tabla
}

// Llamar a la función para cargar empleados al inicio
displayEmployees();
