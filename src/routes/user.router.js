import { Router } from "express";
import { register, login, privateData } from "../controllers/user.controller.js";
import { checkAuthCookies} from "../middlewares/checkAuth.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/private-cookies", checkAuthCookies, privateData);



export default router;