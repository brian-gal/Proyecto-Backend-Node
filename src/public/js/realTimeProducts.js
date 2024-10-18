// Configuración de Socket.IO
const url = ''; // vacío para localhost
const options = {};
const socket = io(url, options);

socket.on('connect', () => {
    console.log(`Conectado al servidor socket.io ${url}`);
});

// escucha el evento de eliminación de producto
socket.on('deleteProduct', (productId) => {
    const productRow = document.querySelector(`tr[data-id="${productId}"]`);
    if (productRow) {
        productRow.remove();
    } else {
        console.error(`No se encontró la fila para el producto con ID ${productId}`);
    }
});

// escucha el evento de creación de producto
socket.on('createProduct', (newProduct) => {
    const tbody = document.querySelector('tbody');

    // Crea una nueva fila con el producto recibido
    const newRow = document.createElement('tr');
    newRow.classList.add('product-row');
    newRow.setAttribute('data-id', newProduct.id);
    newRow.innerHTML = `
        <td>${newProduct.id}</td>
        <td>${newProduct.title}</td>
        <td>${newProduct.description}</td>
        <td>${newProduct.code}</td>
        <td>${newProduct.price}</td>
        <td class="${newProduct.status ? 'available' : 'unavailable'}">
            ${newProduct.status ? 'Disponible' : 'No disponible'}
        </td>
        <td>${newProduct.stock}</td>
        <td>${newProduct.category}</td>
        <td>
            <button class="btn btn-danger delete-product" data-id="${newProduct.id}">
                <i class="bi bi-trash3"></i>
            </button>
        </td>
    `;

    // Añadir la nueva fila a la tabla
    tbody.appendChild(newRow);
});

// boton para eliminar un producto
const tbody = document.querySelector('tbody');
tbody.addEventListener('click', async (event) => {
    const deleteButton = event.target.closest('.delete-product');
    if (deleteButton) {
        const productId = deleteButton.dataset.id;

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log("producto eliminado");
            } else {
                console.error('Error al eliminar el producto:', response.statusText);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    }
});

// formulario para crear un nuevo producto
const form = document.getElementById('createProductForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const code = document.getElementById('code').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('category').value;

    const newProduct = {
        title,
        description,
        code,
        price: parseFloat(price),
        status: true,
        stock: parseInt(stock),
        category,
    };

    // Realiza la solicitud POST a la API
    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        if (response.ok) {
            console.log("producto creado");
        } else {
            console.error('Error al crear el producto:', response.statusText);
        }
    } catch (error) {
        console.error('Error de red:', error);
    }

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('createProductModal'));
    modal.hide();

    // Restablece el formulario
    form.reset();
});

