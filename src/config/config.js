import * as url from 'url';

const config = {
    PORT: 8080,
    DIRNAME: url.fileURLToPath(new URL('../', import.meta.url)),
    MONGODB_URL: 'mongodb+srv://coder70275:1234@cluster0.p43o0.mongodb.net/coder70275',
    ITEMS_PER_PAGE: 10,
    PRODUCTS_COLLECTION: "products",
    CART_COLLECTION: "cart",
    USERS_COLLECTION: "users",
    CRYPTO_SECRET: "1234",
};

export default config