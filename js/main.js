document.addEventListener('DOMContentLoaded', () => {

    // 0. Control de sesión y visualización del usuario activo
    const sesionRaw = localStorage.getItem('sesionActiva');
    const userNameSpan = document.getElementById('navbarUserName') || document.querySelector('.user-name');
    const ageModal = document.getElementById('ageModal');
    const ageModalContent = document.getElementById('ageModalContent');
    const usuarioActivo = localStorage.getItem('sesionActiva');
    
    let activeUser = null;

    if(sesionRaw){
        try{
            activeUser = JSON.parse(sesionRaw);
        } catch (e){
            const usuarios = JSON.parse(localStorage.getItem('usuariosSistema')) || [];
            activeUser = usuarios.find(u => u.email === sesionRaw);
        }

    }

    if(!activeUser){
        window.GeolocationCoordinates.href = 'login.html';
        return;
    }

    if(userNameSpan){
        userNameSpan.textContent = activeUser.nombre || activeUser.username || "usuario";
    }

    const edadNum = parseInt(activeUser.edad || activeUser.age || 0, 10);
    const esMayor = edadNum >= 18;
    const textoEdad = esMayor ? `mayor de Edad (${edadNum} años)` : `Menor de Edad (${edadNum} años)`;

    if(statusBadge){
        statusBadge.textContent = textoEdad;
        statusBadge.classList.add('visible');
    }

    if(ageModal && ageModalContent){
        ageModalContent.textContent = `Bienvenido(a) ${activeUser.nombre || activeUser.username}. Eres ${textoEdad}.`;
        ageModalContent.style.color = esMayor ? '#16a34a' : '#dc2626';
        ageModal.classList.add('active');
    }

    // Referencias del DOM
    const sidebar = document.getElementById('sidebar');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const toggleNavbarMenuBtn = document.getElementById('toggleNavbarMenu');
    const userDropdown = document.getElementById('userDropdown');
    const usersMenuBtn = document.getElementById('usersMenuBtn');
    const usersSubmenu = document.getElementById('usersSubmenu');
    const validateBtn = document.getElementById('validateBtn');
    const statusBadge = document.getElementById('statusBadge');
    const controlInput = document.getElementById('control-number');

    // Referencias Modal y Botones
    const captureMenuOption = document.getElementById('captureMenuOption');
    const captureModal = document.getElementById('captureModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeAgeModalBtn = document.getElementById('closeAgeModalBtn');
    const captureForm = document.getElementById('captureForm');
    const btnLogout = document.getElementById('btnLogout');

    if (closeAgeModalBtn) {
        closeAgeModalBtn.addEventListener('click', () => {
            ageModal.classList.remove('active');
        });
    }

    // 1. Toggle Sidebar
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            toggleSidebarBtn.classList.toggle('is-active');
        });
    }

    // 2. Toggle Submenú Usuarios
    if (usersMenuBtn) {
        usersMenuBtn.addEventListener('click', () => {
            usersMenuBtn.classList.toggle('open');
            usersSubmenu.classList.toggle('open');
        });
    }

    // 3. Abrir Modal de Captura desde el menú del Sidebar
    if (captureMenuOption) {
        captureMenuOption.addEventListener('click', (e) => {
            e.preventDefault();
            captureModal.classList.add('active');
        });
    }

    // 4. Cerrar Modal al dar clic en la 'X' o fuera del cuadro modal
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

    // 5. Toggle Navbar Dropdown
    if (toggleNavbarMenuBtn) {
        toggleNavbarMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleNavbarMenuBtn.classList.toggle('is-active');
            userDropdown.classList.toggle('show');
        });
    }

    // 6. Validar Número de Control (Exactamente 6 dígitos usando Utileria)
    if (validateBtn && controlInput) {
        validateBtn.addEventListener('click', () => {
            const valor = controlInput.value.trim();
            if (Utileria.validarLongitud(valor, 6) && valor.length === 6) {
                statusBadge.textContent = "Número de control válido (6 dígitos)";
                statusBadge.classList.add('visible');
            } else {
                alert("Error: El número de control debe tener exactamente 6 dígitos.");
                statusBadge.classList.remove('visible');
            }
        });
    }

    // 7. Formulario de Captura de Usuarios en el Modal (Validado con la librería y guardado en localStorage)
    if (captureForm) {
        captureForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('modal-username').value.trim();
            const correo = document.getElementById('modal-email').value.trim();
            const password = document.getElementById('modal-password').value.trim();

            if (!Utileria.validarCorreo(correo)) {
                alert("El correo electrónico no tiene un formato válido.");
                return;
            }

            if (!Utileria.validarContra(password)) {
                alert("La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y un carácter especial.");
                return;
            }

            let usuarios = JSON.parse(localStorage.getItem('usuariosSistema')) || [];
            if (usuarios.some(u => u.email === correo)) {
                alert("Este correo ya se encuentra registrado.");
                return;
            }

            usuarios.push({ email: correo, password, nombre });
            localStorage.setItem('usuariosSistema', JSON.stringify(usuarios));

            alert("¡Usuario capturado y guardado con éxito!");
            captureModal.classList.remove('active');
            captureForm.reset();
        });
    }

    // 8. Cerrar Sesión (Elimina la sesión activa y redirige al login)
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.removeItem('sesionActiva');
            window.location.href = 'login.html';
        });
    }

    // 9. Cerrar dropdowns al dar clic fuera
    document.addEventListener('click', (e) => {
        if (userDropdown && toggleNavbarMenuBtn && !userDropdown.contains(e.target) && !toggleNavbarMenuBtn.contains(e.target)) {
            userDropdown.classList.remove('show');
            toggleNavbarMenuBtn.classList.remove('is-active');
        }
    });

});