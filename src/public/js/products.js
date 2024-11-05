document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("open-cart");
    const applyFilters = document.getElementById("apply-filters");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartSelectElement = document.querySelector('select[name="cart-select"]');


    applyFilters.addEventListener("click", () => {
        const categoryFilter = document.getElementById("category-filter");
        const orderFilter = document.getElementById("order-filter");
        const inStockCheckbox = document.getElementById("in-stock");

        const category = categoryFilter.value;
        const order = orderFilter.value;
        const inStock = inStockCheckbox.checked;

        if (category || order || inStock) {
            const queryParams = new URLSearchParams();

            if (category) queryParams.append("category", category);
            if (order) queryParams.append("order", order);
            if (inStock) queryParams.append("stock", "true");

            const url = `/views/products?${queryParams.toString()}`;
            window.location.href = url;
        } else {
            console.error("No se encontraron filtros aplicados");
        }
    });

    cartButton.addEventListener("click", () => {

        const cartId = cartSelectElement.value;
        if (cartId) {
            window.location.href = `/views/cart/${cartId}`; // Redirige a la vista del carrito
        } else {
            console.error("No se encontró el cartId");
        }
    });

    addToCartButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const productId = button.getAttribute("data-product-id");
            const cartId = cartSelectElement.value;

            try {
                const productResponse = await fetch(`http://localhost:8080/api/cart/${cartId}/products/${productId}`, {
                    method: "PUT"
                });
                const productData = await productResponse.json();

                // Manejar la respuesta, por ejemplo, mostrar un mensaje al usuario
                console.log("Producto agregado al carrito:", productData);
            } catch (err) {
                console.error("Error al agregar al carrito:", err);
            }
        });
    });

});
