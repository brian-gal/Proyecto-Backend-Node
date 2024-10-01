# Proyecto de API de Productos y Carritos

Este proyecto es una API desarrollada con **Express.js** que permite gestionar productos y carritos de compra.

## Configuración

El servidor se ejecuta en el puerto `8080`. Puedes cambiar el puerto en el archivo `config.js`.

## Rutas de la API

### Rutas de Productos

- **GET** `/api/products`  
  Obtiene todos los productos. Puedes limitar el número de productos devueltos pasando un parámetro de consulta `limit`.  
  **Ejemplo:** `/api/products?limit=5`

- **GET** `/api/products/:id`  
  Obtiene un producto específico por ID.

- **POST** `/api/products`  
  Crea un nuevo producto. Requiere los siguientes campos en el cuerpo de la solicitud:
  - `title` (string)
  - `description` (string)
  - `code` (string)
  - `price` (number)
  - `stock` (number)
  - `category` (string)

- **PUT** `/api/products/:id`  
  Actualiza un producto existente por ID. Puedes proporcionar los campos que deseas actualizar.

- **DELETE** `/api/products/:id`  
  Elimina un producto específico por ID.

### Rutas de Carritos

- **GET** `/api/cart`  
  Obtiene todos los carritos.

- **GET** `/api/cart/:cid`  
  Obtiene un carrito específico por ID.

- **POST** `/api/cart`  
  Crea un nuevo carrito.

- **POST** `/api/cart/:cid/product/:id`  
  Agrega un producto a un carrito específico por ID de carrito y ID de producto.
