//Diego Vega
// Importar los módulos requeridos
const http = require('http'); // Módulo HTTP incorporado de Node.js
const express = require('express'); // Framework Express
const productos = require('./rutas/productos'); //Llamado del archivo productos
// Crear una instancia de la aplicación Express
const app = express();

// Middleware para analizar cuerpos de solicitud JSON
app.use(express.json());
//Definición de ruta que se utiliza para llamar a los productos
app.use('/productos', productos);
// Middleware para manejar solicitudes a la ruta raíz
app.use('/', function(req, res) {
    // Responder con 'Está funcionando' para cualquier solicitud a la ruta raíz
    res.send('Está funcionando');
});
// Crear un servidor HTTP usando la aplicación Express
const server = http.createServer(app);

// Especificar el número de puerto en el que el servidor escuchará
const port = 3000;

// Hacer que el servidor escuche en el puerto especificado
server.listen(port);

// Registrar un mensaje indicando que la aplicación está en funcionamiento y en qué puerto
console.debug('Aplicación funcionando en ' + port);
