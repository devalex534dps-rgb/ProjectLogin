
const Utileria = {

  /* Librería de utilerías */
  validarCorreo(correo) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
  },

  soloLetras(texto) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(texto);
  },

  validarLongitud(numero, maxLongitud) {
    const str = String(numero);
    return str.length <= maxLongitud;
  },

  calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  },

  esMayorDeEdad(fechaNacimiento) {
    return this.calcularEdad(fechaNacimiento) >= 18;
  },

  validarContra(contraseña) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(contraseña);
  },

  limpiarCampos(contenedor = document) {
    const inputs = contenedor.querySelectorAll('input');
    inputs.forEach(input => {
      if (input.type !== 'submit' && input.type !== 'button') {
        input.value = '';
      }
    });
  },

  validarCURP(curp) {
    const regex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;
    return regex.test(curp.toUpperCase());
  }
};

/* Almacenamiento local mediante localStorage para simular base de datos de usuarios */
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Lógica de Registro de Nuevos Usuarios
  const formRegister = document.getElementById('formRegister');
  if (formRegister) {
    formRegister.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('regEmail').value.trim();
      const password = document.getElementById('regPassword').value.trim();
      const alertBox = document.getElementById('regAlert');

      // Validar formato de correo usando la librería
      if (!Utileria.validarCorreo(email)) {
        alertBox.className = "alert alert-danger";
        alertBox.textContent = "El formato del correo electrónico no es válido.";
        alertBox.classList.remove('d-none');
        return;
      }

      // Obtener usuarios existentes o inicializar arreglo vacío
      let usuarios = JSON.parse(localStorage.getItem('usuariosSistema')) || [];

      // Validar si el usuario ya existe
      const existe = usuarios.some(u => u.email === email);
      if (existe) {
        alertBox.className = "alert alert-danger";
        alertBox.textContent = "El correo ya está registrado.";
        alertBox.classList.remove('d-none');
        return;
      }

      // Guardar nuevo usuario
      usuarios.push({ email, password });
      localStorage.setItem('usuariosSistema', JSON.stringify(usuarios));

      alertBox.className = "alert alert-success";
      alertBox.textContent = "¡Usuario registrado con éxito! Ya puedes iniciar sesión.";
      alertBox.classList.remove('d-none');
      formRegister.reset();
    });
  }

  // 2. Logica de Inicio de Sesion
  const formLogin = document.getElementById('formLogin');
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();
      const alertBox = document.getElementById('loginAlert');

      // Usuarios predeterminados por defecto + los guardados en localStorage
      let usuarios = JSON.parse(localStorage.getItem('usuariosSistema')) || [];
      
      // Usuario por defecto para pruebas rápidas
      const usuarioDefault = { email: "admin@sistema.com", password: "123" };
      
      const encontrado = usuarios.find(u => u.email === email && u.password === password) || 
                         (email === usuarioDefault.email && password === usuarioDefault.password);

      if (encontrado) {
        // Validación exitosa: simulamos sesión y redirigimos a index.html
        localStorage.setItem('sesionActiva', email);
        window.location.href = 'index.html';
      } else {
        alertBox.textContent = "Correo o contraseña incorrectos.";
        alertBox.classList.remove('d-none');
      }
    });
  }

});
