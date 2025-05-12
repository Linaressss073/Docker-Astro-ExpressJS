export function authGuard() {
  const token = localStorage.getItem('token');
  if (!token && !window.location.pathname.endsWith('/login') && !window.location.pathname.endsWith('/registro')) {
    // Redirige solo si no está ya en login o registro para evitar bucles
    window.location.href = '/login';
  }
}

export function setupLogoutButton() {
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    });
  }
}

// Opcional: para personalizar el saludo en cada página si es necesario
export function personalizeGreeting(elementId = 'nombre-usuario') {
  const nombreUsuarioSpan = document.getElementById(elementId);
  const userDataString = localStorage.getItem('user');
  if (userDataString && nombreUsuarioSpan) {
    try {
      const userData = JSON.parse(userDataString);
      nombreUsuarioSpan.textContent = userData.nombre || userData.usuario || 'Usuario';
    } catch (error) {
      console.error('Error al parsear datos del usuario:', error);
      if (nombreUsuarioSpan) nombreUsuarioSpan.textContent = 'Usuario';
    }
  } else if (nombreUsuarioSpan) {
    nombreUsuarioSpan.textContent = 'Usuario';
  }
}

// Ejecutar authGuard en cada carga de script que lo importe,
// excepto si se llama explícitamente.
// Para las páginas del dashboard, es mejor llamarlo explícitamente.
// document.addEventListener('DOMContentLoaded', authGuard);
