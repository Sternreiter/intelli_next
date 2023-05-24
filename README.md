## Name
talenti_backend.

## Description
Esta aplicación es una API REST basada en Node.js, Express y JavaScript. Proporciona APIs para la gestión de datos de usuario.

## Installation
Asegúrate de tener instalado lo siguiente:

Node.js (v18 o superior)
npm (Administrador de paquetes de Node.js)

## Configuración
Sigue los pasos a continuación para configurar y ejecutar la aplicación:

1- Clona este repositorio en tu máquina local:

git clone https://github.com/Sternreiter/intelli_next

2- Navega al directorio raíz de la aplicación:

cd intelli_next

3- Instala las dependencias necesarias utilizando npm:

npm install

4- Crear BD en postgresql con los siguientes parametros de configuracion:

Puerto= 5432
Nombre= intellinext
Usuario= postgres
Password= postgre

5- Compila TypeScript:

npm run tsc

6- Inicia la aplicación:

npm start

## Usage
IMPORTANTE: Se realizo la integración del servicio conocido como swagger, el cual permite documentar las apis de una manera mas accesible para el desarrollador y el usuario. Se recomienda usar este servicio para comodidad de las pruebas. La ruta correspondiente es:

http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:8000/api-doc/

Las API generadas (con sus respectivos curl) son las siguientes:

Nota: En caso de levantarlo en ambiente local, cambiar la ruta por http://localhost:8000. De igual manera reemplazar el token el cual tendra una duración de 1 hora.

Login:

curl -X 'POST' \
  'http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/v1/users/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "phone": "584241797753",
  "password": "IntelliNext"
}'

Obtener usuarios:

curl -X 'GET' \
  'http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/v1/users' \
  -H 'accept: application/json'

Obtener usuario por ID:

curl -X 'GET' \
  'http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/v1/users/1' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTg0MjQxNzk3NzUzIiwiaWF0IjoxNjg0OTQ5MjAwLCJleHAiOjE2ODQ5NTI4MDB9.4J-lr-HZjupXeYAyCX6MQcdQb3s761ftaILIIPJzUJM'

Registro de usuarios:

curl -X 'POST' \
  'http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/v1/users' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTg0MjQxNzk3NzUzIiwiaWF0IjoxNjg0OTQ5MjAwLCJleHAiOjE2ODQ5NTI4MDB9.4J-lr-HZjupXeYAyCX6MQcdQb3s761ftaILIIPJzUJM' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Luis",
  "phone": "584241797753",
  "email": "suilppm@gmail.com",
  "address": "Los Teques, Miranda, Venezuela",
  "password": "IntelliNext"
}'

Actualización de usuario:

curl -X 'PUT' \
  'http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/v1/users/1' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTg0MjQxNzk3NzUzIiwiaWF0IjoxNjg0OTQ5MjAwLCJleHAiOjE2ODQ5NTI4MDB9.4J-lr-HZjupXeYAyCX6MQcdQb3s761ftaILIIPJzUJM' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Luis",
  "phone": "584241797753",
  "email": "suilppm@gmail.com",
  "address": "Los Teques, Miranda, Venezuela",
  "password": "IntelliNext"
}'

Eliminar usuario: 

curl -X 'DELETE' \
  'http://ec2-3-141-145-108.us-east-2.compute.amazonaws.com:4000/api/v1/users/1' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTg0MjQxNzk3NzUzIiwiaWF0IjoxNjg0OTQ5MjAwLCJleHAiOjE2ODQ5NTI4MDB9.4J-lr-HZjupXeYAyCX6MQcdQb3s761ftaILIIPJzUJM'

## Support
Cualquier duda sobre el funcionamiento de las API o reporte de error, comunicarse al +584241797753 o al correo suillpm@gmail.com

## Authors 
Luis Plaza.

## Project status
Este proyecto fue realizado a manera de test segun las indicaciones suministradas.