# Utiliza una imagen base de Node.js
FROM node:19

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias del proyecto
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Compila TypeScript
RUN npm run tsc

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 8000

# Comando para iniciar la aplicación
CMD [ "node", "build/app.js" ]