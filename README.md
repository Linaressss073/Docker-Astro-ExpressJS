# Docker Astro ExpressJS

Un proyecto full-stack que combina **Astro** como frontend y **Express.js** como backend, todo containerizado con **Docker** para un desarrollo y despliegue simplificado.

## 🚀 Características

**Frontend**: Astro para sitios web rápidos y modernos
**Backend**: Express.js para API REST robusta
**Containerización**: Docker y Docker Compose para desarrollo consistente
**Desarrollo Hot-reload**: Recarga automática en desarrollo
**Arquitectura separada**: Frontend y backend independientes

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

[Docker](https://www.docker.com/get-started) (v20.10 o superior)
[Docker Compose](https://docs.docker.com/compose/install/) (v2.0 o superior)
[Git](https://git-scm.com/)

## 🛠️ Instalación Rápida

1. **Clona el repositorio**
  
bash
   git clone https://github.com/Linaressss073/Docker-Astro-ExpressJS.git
   cd Docker-Astro-ExpressJS
  

2. **Inicia los servicios con Docker**
  
bash
   docker-compose up -d
  

3. **Accede a las aplicaciones**
   - Frontend (Astro): http://localhost:4321
   - Backend (Express): http://localhost:3000

## 📁 Estructura del Proyecto
Docker-Astro-ExpressJS/
├── frontend/              # Aplicación Astro
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── astro.config.mjs
│   └── Dockerfile
├── backend/               # API Express.js
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml     # Configuración de servicios
└── README.md

## 🚦 Comandos Disponibles

### Desarrollo
bash
# Iniciar todos los servicios
docker-compose up

# Iniciar en modo detached
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down

### Producción
bash
# Build para producción
docker-compose -f docker-compose.prod.yml up --build

# Ejecutar en producción
docker-compose -f docker-compose.prod.yml up -d

### Utils
bash
# Reconstruir contenedores
docker-compose up --build

# Limpiar volúmenes
docker-compose down -v

# Acceder al contenedor del backend
docker-compose exec backend sh

# Acceder al contenedor del frontend
docker-compose exec frontend sh

## 🔧 Configuración

### Variables de Entorno

Crea un archivo .env en la raíz del proyecto:
env
# Backend
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000

# Frontend
PUBLIC_API_URL=http://localhost:3000

### Puertos

**Frontend**: 4321 (desarrollo) / 3000 (producción)
**Backend**: 3000
**Base de datos**: 5432 (si aplica)

## 🧪 Testing
bash
# Tests del backend
docker-compose exec backend npm test

# Tests del frontend
docker-compose exec frontend npm test

## 📚 Documentación Adicional

[Guía de Instalación Detallada](./docs/INSTALLATION.md)
[Documentación de API](./docs/API.md)
[Guía de Contribución](./CONTRIBUTING.md)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (git checkout -b feature/AmazingFeature)
3. Commit tus cambios (git commit -m 'Add some AmazingFeature')
4. Push a la rama (git push origin feature/AmazingFeature)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

## 👨‍💻 Autor

**Linaressss073**
GitHub: [@Linaressss073](https://github.com/Linaressss073)

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la [documentación](./docs/)
2. Busca en los [issues existentes](https://github.com/Linaressss073/Docker-Astro-ExpressJS/issues)
3. Crea un [nuevo issue](https://github.com/Linaressss073/Docker-Astro-ExpressJS/issues/new)

---

⭐ Si este proyecto te fue útil, ¡dale una estrella!