import { Router } from "express";
import userManager from "../dao/user.manager.js";
const router = Router();

router.post("/register", async (req, res) => {
    try {
        const newUser = await userManager.register(req.body);;
        return res.redirect("/views/login");
    } catch (error) {
        res.render("error", { error });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userManager.login(email, password);
    if (user) {
        req.session.email = email;
        res.render("home");
    } else res.redirect("error", { message: "credenciales incorrectas" });
});

export default router;