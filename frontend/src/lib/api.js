// Ejemplo básico de una función para conectar con el backend
export async function fetchFromBackend(endpoint) {
    const backendUrl = import.meta.env.BACKEND_URL || 'http://localhost:3001';
    try {
      const response = await fetch(`${backendUrl}${endpoint}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching from backend:', error);
      throw error;
    }
  }