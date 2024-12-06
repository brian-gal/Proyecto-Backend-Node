import { Router } from "express";
import userManager from "../dao/user.manager.js";
const router = Router();

router.post("/register", async (req, res) => {
    try {
        const newUser = await userManager.register(req.body);;
        if (!newUser) {
            return res.render("error", { error: "el usuario ya existe" });
        } else {
            return res.redirect("/views/login");
        }
    } catch (error) {
        console.log(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userManager.login(email, password);
        if (!user) {
            return res.render("error", { error: "Usuario o contraseña incorrectos" });
        } else {
            req.session.email = email;
            return res.redirect("/views/products");
        }
    } catch (error) {
        return res.render("error", { error: error.message });
    }

});

export default router;