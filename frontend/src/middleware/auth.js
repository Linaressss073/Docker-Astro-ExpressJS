// Archivo para guardar en src/middleware/auth.js en el frontend Astro

/**
 * Middleware para verificar si el usuario está autenticado
 * Este archivo se puede usar en páginas protegidas como dashboard
 */
export function isAuthenticated() {
  // Si se ejecuta en el cliente
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    // Si no hay token o usuario, no está autenticado
    if (!token || !user) {
      return false;
    }
    
    try {
      // Validar formato del token (puedes añadir más validaciones)
      const [header, payload, signature] = token.split('.');
      if (!header || !payload || !signature) {
        return false;
      }
      
      // Verificar si el token ha expirado
      const decodedPayload = JSON.parse(atob(payload));
      const currentTime = Math.floor(Date.now() / 1000);
      
      if (decodedPayload.exp && decodedPayload.exp < currentTime) {
        // Token expirado
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      return false;
    }
  }
  
  // Por defecto en el servidor, asumimos no autenticado
  return false;
}

/**
 * Función para cerrar sesión
 */
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
}

/**
 * Función para obtener el usuario actual
 */
export function getCurrentUser() {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error al parsear usuario:', error);
      }
    }
  }
  return null;
}

/**
 * Función para obtener el token
 */
export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}