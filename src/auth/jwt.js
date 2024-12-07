import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (user) => {
    const payload = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role,
    };

    return jwt.sign(payload, config.SECRET_KEY, { expiresIn: "20m" });
};