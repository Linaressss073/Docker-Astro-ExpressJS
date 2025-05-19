# Dockerfile - backend (desarrollo)

FROM node:24-slim

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar primero los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Puerto expuesto
EXPOSE 3001

# Comando para iniciar en modo desarrollo
CMD ["npm", "run", "dev"]
