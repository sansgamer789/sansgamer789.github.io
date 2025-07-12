<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Taller de Autos "AutoCare Pro"</title>
    <link rel="stylesheet" href="MenuPrincipal.css"> 
</head>
<body>

    <header id="home">
        <h1>Taller de Autos "AutoCare Pro"</h1>
        
        <p><marquee>¡El mejor cuidado para tu automóvil!</marquee></p>
    </header>

    <!-- Menú de navegación estático en la izquierda -->
    <nav>
        <a href="#">Inicio</a>
        <a href="MenuServicios.html">Servicios</a>
        <a href="Contacto.html">Contacto</a>
        <a href="Formulario.html">Formulario</a>
    </nav>

    <main>
        <section id="about" class="content">
            <h2>Visión</h2>
            <p>La visión de la empresa es convertirse en la principal opción en servicios automotrices, distinguiéndose por su continua innovación, calidad y confiabilidad. Buscan expandirse en el mercado mediante el desarrollo de nuevas tecnologías y prácticas sostenibles que beneficien a la comunidad y protejan el medio ambiente.</p> 
            <h2>Misión</h2>
            <p>Su misión es proporcionar servicios automotrices de excelente calidad, garantizando la seguridad y el óptimo funcionamiento de los vehículos de sus clientes. Se esfuerzan por ofrecer soluciones rápidas y efectivas, destacándose por su habilidad técnica y servicio al cliente excepcional. Aspiran a ser reconocidos como líderes en el sector automotriz, destacando por su innovación, calidad y confiabilidad.</p> 
        </section>

        <section id="services" class="content">
            <h3>Empleados</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Puesto</th>
                        <th>DNI</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table> 
            <div class="row">
                <div class="text-content">
                    <a href="/MenuAdmin/Empleados.html">
                        <button>Agregar Empleado</button>
                    </a>
                </div>
            </div>
        </section>

        <section id="gallery" class="content">
            <h3>Imágenes referenciales:</h3>
            <div class="gallery">
                <div class="image-container">
                    <img src="Imagenes y videos/Servicios/CambioAceite.jpg" alt="Descripción de Imagen 1">
                    <p>Cambio de aceite</p>
                </div>
                <div class="image-container">
                    <img src="Imagenes y videos/Servicios/MantenimientoFrenos.jpg" alt="Descripción de Imagen 2">
                    <p>Mantenimiento de frenos</p>
                </div>
                <div class="image-container">
                    <img src="Imagenes y videos/Servicios/CambioPintura.jpg" alt="Descripción de Imagen 3">
                    <p>Cambio de pintura general</p>
                </div>
            </div>
        </section>

        <section id="services" class="content">
            <h3>Servicios</h3>
            <table>
                <thead>
                    <tr>
                        <th>Servicio</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cambio de pintura</td>
                        <td>El cambio de aceite con la marca MAXIMA PREMIUM</td>
                    </tr>
                    <tr>
                        <td>Mantenimiento Automotriz</td>
                        <td>Cambio de frenos a unos de titanio o carbono</td>
                    </tr>
                    <tr>
                        <td>Accesorios y repuestos</td>
                        <td>De todo un poco</td>
                    </tr>
                </tbody>
            </table> 
        </section>

        <section id="video" class="content">
            <h3>Video de procedimiento de nuestros servicios</h3>
            <div class="video-container">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/g-cjCRKfu1U" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </section>
    </main>

    <footer>
        <p><marquee>&copy; 2024 Mi proyecto de Página Web. Todos los derechos reservados.</marquee></p>
    </footer>
    <script src="MenuPrincipal.js"></script>
</body>
</html>
