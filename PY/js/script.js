// ==================================================================
// ========= DIRECTOR DE ORQUESTA: TODO EMPIEZA AQUÍ ================
// ==================================================================
document.addEventListener('DOMContentLoaded', function() {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ==================================================================
    // ========= VALIDACIÓN FORMULARIO DE CONTACTO ======================
    // ==================================================================
    const formularioContacto = document.getElementById('formulario-contacto');
    if (formularioContacto) {
        const nombreInput = document.getElementById('nombre');
        const emailInput = document.getElementById('email');
        const mensajeInput = document.getElementById('mensaje');
        const errorNombre = document.getElementById('error-nombre');
        const errorEmail = document.getElementById('error-email');
        const errorMensaje = document.getElementById('error-mensaje');
        formularioContacto.addEventListener('submit', function(evento) {
            evento.preventDefault(); 
            let esValido = true;
            errorNombre.textContent = '';
            errorEmail.textContent = '';
            errorMensaje.textContent = '';
            if (nombreInput.value.trim() === '') {
                errorNombre.textContent = 'Por favor, ingresa tu nombre.';
                esValido = false;
            } else if (nombreInput.value.trim().length < 3) {
                errorNombre.textContent = 'El nombre debe tener al menos 3 caracteres.';
                esValido = false;
            }
            if (emailInput.value.trim() === '') {
                errorEmail.textContent = 'Por favor, ingresa tu correo.';
                esValido = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                errorEmail.textContent = 'El formato del correo no es válido.';
                esValido = false;
            }
            if (mensajeInput.value.trim() === '') {
                errorMensaje.textContent = 'Por favor, escribe un mensaje.';
                esValido = false;
            } else if (mensajeInput.value.trim().length < 10) {
                errorMensaje.textContent = 'El mensaje debe tener al menos 10 caracteres.';
                esValido = false;
            }
            if (esValido) {
                alert('¡Formulario enviado con éxito!');
                formularioContacto.reset();
            }
        });
    }

    // ==================================================================
    // ========= VALIDACIÓN FORMULARIO DE REGISTRO (CON IDs ÚNICOS) ========
    // ==================================================================
    const formularioRegistro = document.getElementById('formulario-registro');
    if (formularioRegistro) {
        const nombreInput = document.getElementById('registro-nombre');
        const emailInput = document.getElementById('registro-email');
        const passwordInput = document.getElementById('registro-password');
        const confirmPasswordInput = document.getElementById('registro-confirm-password');
        const errorNombre = document.getElementById('error-registro-nombre');
        const errorEmail = document.getElementById('error-registro-email');
        const errorPassword = document.getElementById('error-registro-password');
        const errorConfirmPassword = document.getElementById('error-registro-confirm-password');
        formularioRegistro.addEventListener('submit', function(evento) {
            evento.preventDefault();
            let esValido = true;
            errorNombre.textContent = '';
            errorEmail.textContent = '';
            errorPassword.textContent = '';
            errorConfirmPassword.textContent = '';
            if (nombreInput.value.trim() === '') {
                errorNombre.textContent = 'Por favor, ingresa tu nombre.';
                esValido = false;
            } else if (nombreInput.value.trim().length < 3) {
                errorNombre.textContent = 'El nombre debe tener al menos 3 caracteres.';
                esValido = false;
            }
            if (emailInput.value.trim() === '') {
                errorEmail.textContent = 'Por favor, ingresa tu correo.';
                esValido = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                errorEmail.textContent = 'El formato del correo no es válido.';
                esValido = false;
            }
            if (passwordInput.value.trim() === '') {
                errorPassword.textContent = 'Por favor, ingresa una contraseña.';
                esValido = false;
            } else if (passwordInput.value.trim().length < 6) {
                errorPassword.textContent = 'La contraseña debe tener al menos 6 caracteres.';
                esValido = false;
            }
            if (confirmPasswordInput.value.trim() === '') {
                errorConfirmPassword.textContent = 'Por favor, confirma tu contraseña.';
                esValido = false;
            } else if (passwordInput.value !== confirmPasswordInput.value) {
                errorConfirmPassword.textContent = 'Las contraseñas no coinciden.';
                esValido = false;
            }
            if (esValido) {
                alert('¡Registro exitoso!');
                formularioRegistro.reset();
            }
        });
    }

    // ==================================================================
    // ========= VALIDACIÓN FORMULARIO DE LOGIN (CON IDs ÚNICOS) ========
    // ==================================================================
    const formularioLogin = document.getElementById('formulario-login');
    if (formularioLogin) {
        const emailInput = document.getElementById('login-email');
        const passwordInput = document.getElementById('login-password');
        const errorEmail = document.getElementById('error-login-email');
        const errorPassword = document.getElementById('error-login-password');
        formularioLogin.addEventListener('submit', function(evento) {
            evento.preventDefault();
            let esValido = true;
            errorEmail.textContent = '';
            errorPassword.textContent = '';
            if (emailInput.value.trim() === '') {
                errorEmail.textContent = 'Por favor, ingresa tu correo.';
                esValido = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                errorEmail.textContent = 'El formato del correo no es válido.';
                esValido = false;
            }
            if (passwordInput.value.trim() === '') {
                errorPassword.textContent = 'Por favor, ingresa tu contraseña.';
                esValido = false;
            } else if (passwordInput.value.trim().length < 6) {
                errorPassword.textContent = 'La contraseña debe tener al menos 6 caracteres.';
                esValido = false;
            }
            if (esValido) {
                alert('¡Inicio de sesión exitoso!');
                formularioLogin.reset();
            }
        });
    }

    // ==================================================================
    // ======================= LÓGICA BOTÓN AÑADIR AL CARRITO ===========
    // ==================================================================
    const btnAnadirCarrito = document.querySelector('.btn-anadir-carrito');
    if (btnAnadirCarrito) {
        btnAnadirCarrito.addEventListener('click', () => {
            const productoInfo = document.querySelector('.producto-info');
            const nombreProducto = productoInfo.querySelector('h2').textContent;
            const precioProducto = productoInfo.querySelector('.precio').textContent;
            const cantidadProducto = parseInt(document.getElementById('cantidad').value);
            const producto = { nombre: nombreProducto, precio: precioProducto, cantidad: cantidadProducto };
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito.push(producto);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert(`¡"${producto.nombre}" fue añadido al carrito!`);
            actualizarNumeroCarrito();
        });
    }

    // ==================================================================
    // ========= LÓGICA PÁGINA CARRITO (CON ELIMINAR) ========
    // ==================================================================
    const listaCarritoContainer = document.getElementById('lista-carrito');
    if (listaCarritoContainer) {
        function renderizarCarrito() {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const totalPrecioElemento = document.getElementById('total-precio');
            let total = 0;
            listaCarritoContainer.innerHTML = '';
            if (carrito.length === 0) {
                listaCarritoContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
                totalPrecioElemento.textContent = '$0';
                return;
            }
            carrito.forEach((producto, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('carrito-item');
                itemDiv.innerHTML = `
                    <div class="carrito-item-info">
                        <p>${producto.nombre} (x${producto.cantidad})</p>
                        <p>${producto.precio}</p>
                    </div>
                    <button class="btn-eliminar-item" data-index="${index}">Eliminar</button>
                `;
                listaCarritoContainer.appendChild(itemDiv);
                const precioNumerico = parseFloat(producto.precio.replace(/\./g, '').replace('$', ''));
                total += precioNumerico * producto.cantidad;
            });
            totalPrecioElemento.textContent = `$${total.toLocaleString('es-CL')}`;
            asignarEventosEliminar();
        }
        function asignarEventosEliminar() {
            document.querySelectorAll('.btn-eliminar-item').forEach(button => {
                button.addEventListener('click', (evento) => {
                    const indexParaEliminar = parseInt(evento.target.getAttribute('data-index'));
                    eliminarProductoDelCarrito(indexParaEliminar);
                });
            });
        }
        function eliminarProductoDelCarrito(index) {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito(); 
            actualizarNumeroCarrito();
        }
        renderizarCarrito();
    }

    // --- FUNCIÓN PARA ACTUALIZAR EL NÚMERO DEL CARRITO ---
    function actualizarNumeroCarrito() {
        const enlaceCarrito = document.getElementById('enlace-carrito');
        if (!enlaceCarrito) return;
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        enlaceCarrito.textContent = `Carrito (${carrito.length})`;
    }

    // Llamamos a la función al cargar CUALQUIER página.
    actualizarNumeroCarrito();

});