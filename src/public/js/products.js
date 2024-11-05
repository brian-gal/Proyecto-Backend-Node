document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("open-cart");
    const cartSelectElement = document.querySelector('select[name="cart-select"]');

    cartButton.addEventListener("click", () => {
        const cartId = cartSelectElement.value;
        if (cartId) {
            window.location.href = `/views/cart/${cartId}`; // Redirige a la vista del carrito
        } else {
            console.error("No se encontró el cartId");
        }
    });
});
