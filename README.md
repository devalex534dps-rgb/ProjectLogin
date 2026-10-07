# Login

**Nombre del Proyecto:** Login  
**Materia/Módulo:** Programacion Web  
**Equipo de Trabajo:**  
* Edwin Alexis Esperanza Chavez  
* Felix Eliel Olivera Jimenez 

Este proyecto es una aplicación web responsiva e interactiva que permite gestionar usuarios en tiempo real utilizando almacenamiento local (`localStorage`). Cuenta con un panel principal con menú lateral (`sidebar`) colapsable, barra superior (`navbar`) con menú flotante de usuario, validación de estado de edad (mayor/menor de edad), asignación de número de control y un modal para el registro de nuevos usuarios con efecto de desenfoque de fondo (`backdrop blur`).


## Documentación

### 1. Framework CSS Utilizado
* **CSS3 Puro (Vanilla CSS):** No se utilizaron frameworks externos (como Bootstrap o Tailwind). Se implementaron **Variables CSS (`:root`)** para mantener una paleta de colores coherente bajo la **regla del 60-30-10**:
  * **60% Dominante (`#DDE6ED`):** Fondo general de la interfaz.
  * **30% Secundario (`#27374D` / `#526D82`):** Estructuras del Sidebar, Navbar y encabezados.
  * **10% Acento (`#9DB2BF`):** Botones e interacciones `:hover`.

### 2. Flujo del Login hacia el Sistema
1. **Página de Login (`login.html`):** El usuario ingresa sus credenciales. El script valida la existencia del usuario en la clave `users` de `localStorage`.
2. **Autenticación y Persistencia:** Al ser válidas las credenciales, se guarda el identificador único en la clave `activeUserId`:
   ```javascript
   localStorage.setItem('activeUserId', userEncontrado.id);
   window.location.href = 'index.html';

### 3. La elaboracion se realizo de la sigueinte manera
1. **Creacion de la estructura HTML e Iconos**
![html puro](https://i.postimg.cc/pX1ySXY7/127-0-0-1-5500-index-html.png)

2. **Aplicacion de Estilos con CSS**
![Sitio estilizado](https://i.postimg.cc/50xx0ZS8/127-0-0-1-5500-index-html-(1).png)

Formulario modal de captura
![formulario modal](https://i.postimg.cc/tC19YdW8/127-0-0-1-5500-index-html-(2).png)