document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("open-cart");
    const applyFilters = document.getElementById("apply-filters");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartSelectElement = document.querySelector('select[name="cart-select"]');
    const numberNext = document.getElementById("numberNext")
    const numberPrev = document.getElementById("numberPrev")

    if (numberNext) {
        numberNext.addEventListener("click", () => {
            const currentUrl = new URL(window.location.href);
            const queryParams = new URLSearchParams(currentUrl.search);
            const pagSiguiente = numberNext.getAttribute("numberNext");
            queryParams.set("page", pagSiguiente);
            const newUrl = `${currentUrl.pathname}?${queryParams.toString()}`;
            window.location.href = newUrl;
        });
    }


    if (numberPrev) {
        numberPrev.addEventListener("click", () => {
            const currentUrl = new URL(window.location.href);
            const queryParams = new URLSearchParams(currentUrl.search);
            const pagAnterior = numberPrev.getAttribute("numberPrev");
            queryParams.set("page", pagAnterior);
            const newUrl = `${currentUrl.pathname}?${queryParams.toString()}`;
            window.location.href = newUrl;
        });
    }

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
