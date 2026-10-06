const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggleSidebar');
const toggleNavbarMenuBtn = document.getElementById('toggleNavbarMenu');
const userDropdown = document.getElementById('userDropdown');
const usersMenuBtn = document.getElementById('usersMenuBtn');
const usersSubmenu = document.getElementById('usersSubmenu');
const validateBtn = document.getElementById('validateBtn');
const statusBadge = document.getElementById('statusBadge');

// Referencias Modal
const captureMenuOption = document.getElementById('captureMenuOption');
const captureModal = document.getElementById('captureModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// 1. Toggle Sidebar
toggleSidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    toggleSidebarBtn.classList.toggle('is-active');
});

// 2. Toggle Submenú Usuarios
usersMenuBtn.addEventListener('click', () => {
    usersMenuBtn.classList.toggle('open');
    usersSubmenu.classList.toggle('open');
});

// 3. Abrir Modal de Captura desde el menú del Sidebar
captureMenuOption.addEventListener('click', (e) => {
    e.preventDefault();
    captureModal.classList.add('active');
});

// 4. Cerrar Modal al dar clic en la 'X' o fuera del cuadro modal
closeModalBtn.addEventListener('click', () => {
    captureModal.classList.remove('active');
});

captureModal.addEventListener('click', (e) => {
    if (e.target === captureModal) {
        captureModal.classList.remove('active');
    }
});

// 5. Toggle Navbar Dropdown
toggleNavbarMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleNavbarMenuBtn.classList.toggle('is-active');
    userDropdown.classList.toggle('show');
});

// 6. Validar estado (Boton Principal)
validateBtn.addEventListener('click', () => {
    statusBadge.classList.add('visible');
});

// 7. Cerrar dropdowns al dar clic fuera
document.addEventListener('click', (e) => {
    if (!userDropdown.contains(e.target) && !toggleNavbarMenuBtn.contains(e.target)) {
        userDropdown.classList.remove('show');
        toggleNavbarMenuBtn.classList.remove('is-active');
    }
});