FROM node:22-slim

WORKDIR /app

# Instalar dependencias primero
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Puerto que expone NestJS por defecto
EXPOSE 3001

# Comando para desarrollo
CMD ["npm", "run", "start:dev"]