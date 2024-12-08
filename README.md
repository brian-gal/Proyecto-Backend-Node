# Proyecto de API de Productos y Carritos

Este proyecto es una API desarrollada con **Express.js** que permite gestionar productos y carritos de compra. 

## Configuración

El servidor se ejecuta en el puerto `8080`. Puedes cambiar el puerto en el archivo `config.js`.

## Rutas de la API

### Rutas de Usuario

- **POST** `/api/sessions/register`  
  Registra un nuevo usuario.

- **POST** `/api/sessions/login`
  Envía credenciales para iniciar sesión.

- **GET** `/api/sessions/recurrent`
  Obtiene los datos del usuario en formato JSON.

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

- **GET** `/api/cart`  
  Obtiene todos los carritos disponibles.

- **GET** `/api/carts/:cid`  
  Obtiene un carrito específico por ID y los datos de los productos.

- **POST** `/api/carts`  
  Crea un nuevo carrito.

- **PUT** `/api/cart/:cid/products/:pid`  
  actualiza su cantidad.

- **PUT** `/api/cart/:cid`  
  Agrega un producto al carrito.

- **DELETE** `/api/cart/:cid/products/:pid`  
  Elimina un producto específico del carrito por ID de carrito y ID de producto.

- **DELETE** `/api/cart/:cid`  
  Elimina todos los productos del carrito por ID de carrito.

### Notas Adicionales

- Al solicitar un carrito, los productos se desglosan completamente mediante `populate`, permitiendo acceder a toda la información del producto.


## Rutas de Vistas

- **GET** `/views/cart/:idCart`
  Renderiza todos los productos del carrito actual.

- **GET** `/views/products`  
  Renderiza todos los productos disponibles.


- **GET** `/views/register`  
  Renderiza el formulario de registro.

- **GET** `/views/login`  
  Renderiza el formulario de login.


