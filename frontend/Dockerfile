FROM node:24-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Asegurarse de que el host esté configurado para permitir conexiones externas
ENV HOST=0.0.0.0

EXPOSE 4321

CMD ["npm", "run", "dev"]