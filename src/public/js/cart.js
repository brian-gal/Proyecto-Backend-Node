//obtiene el id del carrito
const cartTitleElement = document.querySelector('.cart-title');
const cartId = cartTitleElement.getAttribute('data-id');

//asigna los eventos de botones de incremento y decremento de cantidad al DOM
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".increase-btn").forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            increaseQuantity(productId, cartId);
        });
    });

    document.querySelectorAll(".decrease-btn").forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            decreaseQuantity(productId, cartId);
        });
    });
});

async function decreaseQuantity(productId, cartId) {
    try {
        const response = await fetch(`/api/cart/${cartId}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: -1 }) 
        });

        if (response.ok) {
            // Obtiene la cantidad de productos en el carrito y actualiza el dom
            const quantityElement = document.querySelector(`.quantity[data-id="${productId}"]`);
            let currentQuantity = parseInt(quantityElement.textContent);
            currentQuantity = currentQuantity - 1;
            actualizarCantidad(productId, currentQuantity);
        } else {
            console.error("Error al disminuir la cantidad de producto en el carrito");
        }
    } catch (error) {
        console.error("Error al disminuir la cantidad de producto en el carrito:", error);
    }
}

async function increaseQuantity(productId, cartId) {
    try {
        const response = await fetch(`/api/cart/${cartId}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: 1 })
        });

        if (response.ok) {
            // Obtiene la cantidad de productos en el carrito y actualiza el dom
            const quantityElement = document.querySelector(`.quantity[data-id="${productId}"]`);
            let currentQuantity = parseInt(quantityElement.textContent);
            currentQuantity = currentQuantity + 1;
            actualizarCantidad(productId, currentQuantity);
        } else {
            console.error("Error al aumentar la cantidad de producto en el carrito");
        }
    } catch (error) {
        console.error("Error al aumentar la cantidad de producto en el carrito:", error);
    }
}

// Función para actualizar la cantidad en el DOM
function actualizarCantidad(productId, quantity) {
    const quantityElement = document.querySelector(`.quantity[data-id="${productId}"]`);
    if (quantityElement) {
        quantityElement.textContent = quantity;
    } else {
        console.error("Elemento de cantidad no encontrado para el productId:", productId);
    }
}

