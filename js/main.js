document.addEventListener('DOMContentLoaded', () => {

    const esPaginaLogin = !!document.getElementById('formLogin');
    const esPaginaDashboard = !!document.getElementById('navbarUserName');

    if (esPaginaLogin) {
        // Si ya hay sesión activa, redirige al dashboard
        if (localStorage.getItem('sesionActiva')) {
            window.location.href = 'index.html';
            return;
        }

        const formLogin = document.getElementById('formLogin');
        const formRegister = document.getElementById('formRegister');
        const loginAlert = document.getElementById('loginAlert');
        const regAlert = document.getElementById('regAlert');

        // INICIAR SESIÓN
        if (formLogin) {
            formLogin.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value.trim();
                const password = document.getElementById('loginPassword').value.trim();

                const usuarios = JSON.parse(localStorage.getItem('usuariosSistema')) || [];
                const usuarioEncontrado = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

                if (usuarioEncontrado) {
                    // SE GUARDA EL OBJETO COMPLETO (CON EDAD Y NOMBRE) EN LUGAR DE SOLO EL STRING DEL CORREO
                    localStorage.setItem('sesionActiva', JSON.stringify(usuarioEncontrado));
                    window.location.href = 'index.html';
                } else {
                    if (loginAlert) {
                        loginAlert.textContent = "Correo o contraseña incorrectos.";
                        loginAlert.classList.remove('d-none');
                    } else {
                        alert("Correo o contraseña incorrectos.");
                    }
                }
            });
        }

        // REGISTRAR CUENTA
        if (formRegister) {
            formRegister.addEventListener('submit', (e) => {
                e.preventDefault();
                const nombre = document.getElementById('regUsername').value.trim();
                const correo = document.getElementById('regEmail').value.trim();
                const edadInput = document.getElementById('regAge').value.trim();
                const edad = parseInt(edadInput, 10);
                const password = document.getElementById('regPassword').value.trim();

                if (isNaN(edad) || edad <= 0) {
                    alert("Por favor ingresa una edad válida.");
                    return;
                }

                if (typeof Utileria !== 'undefined') {
                    if (!Utileria.validarCorreo(correo)) {
                        alert("El correo electrónico no tiene un formato válido.");
                        return;
                    }
                    if (!Utileria.validarContra(password)) {
                        alert("La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial.");
                        return;
                    }
                }

                let usuarios = JSON.parse(localStorage.getItem('usuariosSistema')) || [];
                if (usuarios.some(u => u.email.toLowerCase() === correo.toLowerCase())) {
                    alert("El correo electrónico ya está registrado.");
                    return;
                }

                // OBJETO UNIFICADO
                const nuevoUsuario = {
                    nombre: nombre,
                    email: correo,
                    edad: edad,
                    password: password,
                    numControl: ''
                };

                usuarios.push(nuevoUsuario);
                localStorage.setItem('usuariosSistema', JSON.stringify(usuarios));

                // INICIAR SESIÓN CON EL OBJETO COMPLETO
                localStorage.setItem('sesionActiva', JSON.stringify(nuevoUsuario));

                if (regAlert) {
                    regAlert.textContent = "¡Cuenta registrada con éxito!";
                    regAlert.classList.remove('d-none');
                }

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 800);
            });
        }
    }

    if (esPaginaDashboard) {
        const sesionRaw = localStorage.getItem('sesionActiva');
        let activeUser = null;

        if (sesionRaw) {
            try {
                // Intenta convertir el string a objeto
                activeUser = JSON.parse(sesionRaw);
            } catch (e) {
                // Si la sesión vieja era solo un correo, busca el objeto en usuariosSistema
                const usuarios = JSON.parse(localStorage.getItem('usuariosSistema')) || [];
                activeUser = usuarios.find(u => u.email === sesionRaw);
            }
        }

        // Si no hay usuario activo válido, manda a Login
        if (!activeUser) {
            window.location.href = 'login.html';
            return;
        }

        // A. Mostrar Nombre de Usuario en el Navbar
        const userNameSpan = document.getElementById('navbarUserName');
        if (userNameSpan) {
            userNameSpan.textContent = activeUser.nombre || activeUser.username || "Usuario";
        }

        // B. Parsear Edad Correctamente
        const edadNum = parseInt(activeUser.edad || activeUser.age || activeUser.regAge || 0, 10);
        const esMayor = edadNum >= 18;
        const textoEdad = esMayor ? `Mayor de Edad (${edadNum} años)` : `Menor de Edad (${edadNum} años)`;

        const statusBadge = document.getElementById('statusBadge');
        if (statusBadge) {
            statusBadge.textContent = textoEdad;
            statusBadge.classList.add('visible');
        }

        const ageModal = document.getElementById('ageModal');
        const ageModalContent = document.getElementById('ageModalContent');
        if (ageModal && ageModalContent) {
            ageModalContent.textContent = `¡Hola ${activeUser.nombre || activeUser.username}! Eres ${textoEdad}.`;
            ageModalContent.style.color = esMayor ? '#16a34a' : '#dc2626';
            ageModal.classList.add('active');
        }

        // Botón Cierre Modal Edad
        const closeAgeModalBtn = document.getElementById('closeAgeModalBtn');
        if (closeAgeModalBtn && ageModal) {
            closeAgeModalBtn.addEventListener('click', () => {
                ageModal.classList.remove('active');
            });
        }

        // Elementos Interfaz
        const sidebar = document.getElementById('sidebar');
        const toggleSidebarBtn = document.getElementById('toggleSidebar');
        const toggleNavbarMenuBtn = document.getElementById('toggleNavbarMenu');
        const userDropdown = document.getElementById('userDropdown');
        const usersMenuBtn = document.getElementById('usersMenuBtn');
        const usersSubmenu = document.getElementById('usersSubmenu');
        const validateBtn = document.getElementById('validateBtn');
        const controlInput = document.getElementById('control-number');
        const captureMenuOption = document.getElementById('captureMenuOption');
        const captureModal = document.getElementById('captureModal');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const captureForm = document.getElementById('captureForm');
        const btnLogout = document.getElementById('btnLogout');

        if (toggleSidebarBtn) {
            toggleSidebarBtn.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
                toggleSidebarBtn.classList.toggle('is-active');
            });
        }

        if (usersMenuBtn) {
            usersMenuBtn.addEventListener('click', () => {
                usersMenuBtn.classList.toggle('open');
                usersSubmenu.classList.toggle('open');
            });
        }

        if (captureMenuOption) {
            captureMenuOption.addEventListener('click', (e) => {
                e.preventDefault();
                captureModal.classList.add('active');
            });
        }

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                captureModal.classList.remove('active');
            });
        }

        if (captureModal) {
            captureModal.addEventListener('click', (e) => {
                if (e.target === captureModal) {
                    captureModal.classList.remove('active');
                }
            });
        }

        if (toggleNavbarMenuBtn) {
            toggleNavbarMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleNavbarMenuBtn.classList.toggle('is-active');
                userDropdown.classList.toggle('show');
            });
        }

        // Validar Número de Control
        if (validateBtn && controlInput) {
            validateBtn.addEventListener('click', () => {
                const valor = controlInput.value.trim();
                if (typeof Utileria !== 'undefined' && Utileria.validarLongitud && Utileria.validarLongitud(valor, 6) && valor.length === 6) {
                    let usuarios = JSON.parse(localStorage.getItem('usuariosSistema')) || [];
                    activeUser.numControl = valor;

                    usuarios = usuarios.map(u => u.email === activeUser.email ? activeUser : u);
                    localStorage.setItem('usuariosSistema', JSON.stringify(usuarios));
                    localStorage.setItem('sesionActiva', JSON.stringify(activeUser));

                    alert("Número de control asignado con éxito.");
                } else {
                    alert("Error: El número de control debe contener exactamente 6 dígitos.");
                }
            });
        }

        // Captura de nuevo usuario desde el Modal
        if (captureForm) {
            captureForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const nombre = document.getElementById('modal-username').value.trim();
                const correo = document.getElementById('modal-email').value.trim();
                const edad = parseInt(document.getElementById('modal-age').value, 10);
                const password = document.getElementById('modal-password').value.trim();

                if (isNaN(edad) || edad <= 0) {
                    alert("Ingresa una edad válida.");
                    return;
                }

                if (typeof Utileria !== 'undefined') {
                    if (!Utileria.validarCorreo(correo)) {
                        alert("El correo electrónico no es válido.");
                        return;
                    }
                    if (!Utileria.validarContra(password)) {
                        alert("La contraseña debe incluir mayúsculas, minúsculas, números y caracteres especiales (mínimo 8 caracteres).");
                        return;
                    }
                }

                let usuarios = JSON.parse(localStorage.getItem('usuariosSistema')) || [];
                if (usuarios.some(u => u.email.toLowerCase() === correo.toLowerCase())) {
                    alert("Este correo ya está registrado.");
                    return;
                }

                const nuevoUsuario = { nombre, email: correo, edad, password, numControl: '' };
                usuarios.push(nuevoUsuario);
                localStorage.setItem('usuariosSistema', JSON.stringify(usuarios));

                alert("¡Usuario guardado con éxito!");
                captureModal.classList.remove('active');
                captureForm.reset();
            });
        }

        // Cerrar Sesión
        if (btnLogout) {
            btnLogout.addEventListener('click', () => {
                localStorage.removeItem('sesionActiva');
                window.location.href = 'login.html';
            });
        }

        document.addEventListener('click', (e) => {
            if (userDropdown && toggleNavbarMenuBtn && !userDropdown.contains(e.target) && !toggleNavbarMenuBtn.contains(e.target)) {
                userDropdown.classList.remove('show');
                toggleNavbarMenuBtn.classList.remove('is-active');
            }
        });
    }

});