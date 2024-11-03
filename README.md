# Proyecto de API de Productos y Carritos

Este proyecto es una API desarrollada con **Express.js** que permite gestionar productos y carritos de compra. 

## Configuración

El servidor se ejecuta en el puerto `8080`. Puedes cambiar el puerto en el archivo `config.js`.

## Rutas de la API

### Rutas de Productos

- **GET** `/api/products`  
  Obtiene todos los productos o los productos de un determinado límite. Se pueden aplicar filtros por categoría y stock.

- **GET** `/api/products/:id`  
  Obtiene un producto específico por ID.

- **POST** `/api/products`  
  Crea un nuevo producto.

- **PUT** `/api/products/:id`  
  Actualiza un producto específico por ID.

- **DELETE** `/api/products/:id`  
  Elimina un producto específico por ID.

### Rutas de Carritos

- **GET** `/api/carts`  
  Obtiene todos los carritos disponibles.

- **GET** `/api/carts/:cid`  
  Obtiene un carrito específico por ID y los datos de los productos.

- **POST** `/api/carts`  
  Crea un nuevo carrito.

- **PUT** `/api/carts/:cid/products/:pid`  
  Agrega un producto a un carrito específico por ID de carrito y ID de producto. Si el producto ya existe, actualiza su cantidad.

- **DELETE** `/api/carts/:cid/products/:pid`  
  Elimina un producto específico del carrito por ID de carrito y ID de producto.

- **DELETE** `/api/carts/:cid`  
  Elimina todos los productos del carrito por ID de carrito.

### Notas Adicionales

- Al solicitar un carrito, los productos se desglosan completamente mediante `populate`, permitiendo acceder a toda la información del producto.


## Rutas de Vistas

- **GET** `/views/home`  
  Renderiza la vista de la página de inicio con los productos existentes hasta el momento.

- **GET** `/views/realTimeProducts`  
  Renderiza la vista de la página de realTimeProducts con los productos, ademas de actualizarce en tiempo real los productos. Para lograrlo utiliza **Socket.IO** en donde emite un evento cada vez que se crea un producto o elimina un producto y de esta manera se actualiza el cliente en tiempo real.


