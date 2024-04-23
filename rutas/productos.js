//Diego Vega
// Importar el módulo Express
const express = require('express');

// Crear un router de Express para manejar rutas y middleware
const router = express.Router();

// Se crea un vector de datos simulados
const data = [
  {id: 1, nombre: 'Zapatos A', valor: 19.3, enStock: true, createdOn: new Date()},
  {id: 2, nombre: 'Zapatos B', valor: 206.3, enStock: false, createdOn: new Date()},
  {id: 3, nombre: 'Zapatos C', valor: 56.0, enStock: true, createdOn: new Date()},
  {id: 4, nombre: 'Zapatos D', valor: 63.8, enStock: true, createdOn: new Date()},
  {id: 5, nombre: 'Zapatos E', valor: 39.4, enStock: false, createdOn: new Date()},
];

// Definir una ruta para manejar solicitudes GET a la ruta raíz
router.get('/', function (req, res) {
  // Responder con un código de estado 200 (OK) y enviar los datos como JSON
  res.status(200).json(data);
});

// Definir una ruta para manejar solicitudes GET con un parámetro :id
router.get('/:id', function (req, res) {
  // Buscar un elemento en el vector de datos que coincida con el ID proporcionado en la URL
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  // Verificar si se encontró el elemento
  if (found) {
    // Si se encuentra, enviar el elemento como JSON con un código de estado 200 (OK)
    res.status(200).json(found);
  } else {
    // Si no se encuentra el elemento, responder con un código de estado 404 (Not Found)
    res.sendStatus(404);
  }
});

// Definir una ruta para manejar solicitudes POST
router.post('/', function (req, res) {
  // Obtener todos los IDs de los elementos existentes en el vector de datos
  let itemIds = data.map(item => item.id);

  // Obtener todos los números de orden de los elementos existentes en el vector de datos
  let orderNums = data.map(item => item.order);

  // Calcular el nuevo ID asignando el máximo ID existente más uno, o 1 si no hay elementos en el vector de datos
  let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;

  // Calcular el nuevo número de orden asignando el máximo número de orden existente más uno, o 1 si no hay elementos en el vector de datos
  let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;

  // Crear un nuevo Producto con los datos proporcionados en la solicitud y valores predeterminados para otros campos
  let newItem = {
    id: newId,//id del producto
    nombre: req.body.nombre,//nombre del producto, que será pedido al usuario
    valor: req.body.valor,//valor del producto, que será pedido al usuario
    enStock: false,
    createdOn: new Date() // Fecha de creación establecida en la fecha y hora actual
  };
  // Agregar el nuevo elemento al vector de datos
  data.push(newItem);
  // Responder con un código de estado 201 (Created) y enviar el nuevo elemento como respuesta
  res.status(201).json(newItem);
});

// Definir una ruta para manejar solicitudes PUT con el parámetro id
router.put('/:id', function (req, res) {
  // Buscar un elemento en el vector de datos que coincida con el ID proporcionado en la URL
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  // Verificar si se encontró el elemento
  if (found) {
    // Si se encuentra, actualizar los valores del elemento
    let updated = {
      id: found.id, //id del elemento encontrado, ya se este no deberia cambiarse
      nombre: req.body.nombre, // Actualizar el nombre del producto con el valor proporcionado en la solicitud
      valor: req.body.valor, // Actualizar el valor del producto con el valor proporcionado en la solicitud
      enStock: req.body.enStock // Actualizar el estado de stock con el valor proporcionado en la solicitud
    };

    // Encontrar el índice del elemento encontrado en el vector de datos(data)
    let targetIndex = data.indexOf(found);

    // Reemplazar el elemento encontrado con el elemento actualizado en el vector de datos (data)
    data.splice(targetIndex, 1, updated);

    // Responder con un código de estado 204 (No Content) y enviar el elemento actualizado como respuesta
    res.status(204).json(updated);
  } else {
    // Si no se encuentra el elemento, responder con un código de estado 500 (Internal Server Error)
    res.sendStatus(500);
  }
});

// Definir una ruta para manejar solicitudes DELETE con el parámetro id
router.delete('/:id', function (req, res) {
  // Buscar un elemento en el vector de datos que coincida con el ID proporcionado en la URL
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  // Verificar si se encontró el elemento
  if (found) {
    // Encontrar el índice del elemento encontrado en el vector de datos(data)
    let targetIndex = data.indexOf(found);

    // Eliminar el elemento encontrado del vector de datos(data)
    data.splice(targetIndex, 1);
  }

  // Responder con un código de estado 204 (No Content)
  res.sendStatus(204);
});


module.exports = router;
