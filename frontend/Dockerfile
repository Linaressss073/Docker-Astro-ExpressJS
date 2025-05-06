FROM node:18-alpine

WORKDIR /app

# Instalar dependencias primero (para aprovechar la caché de Docker)
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Puerto que expone Astro por defecto
EXPOSE 3000

# Comando para desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]