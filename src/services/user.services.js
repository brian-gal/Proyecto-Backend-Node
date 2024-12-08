import userDao from "../dao/user.dao.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import cartsController from '../controllers/cart.controller.js';

const controller = new cartsController();


export const getUserByEmail = async (email) => {
    try {
        return await userDao.getByEmail(email);
    } catch (error) {
        throw new Error(error);
    }
};

export const getUserById = async (id) => {
    try {
        return await userDao.getById(id);
    } catch (error) {
        throw new Error(error);
    }
};

export const register = async (user) => {
    try {
        const { email, password, isGithub } = user;
        const existUser = await getUserByEmail(email);
        const idCart = await controller.addCart();
        if (existUser) throw new Error("User already exists");
        if (isGithub) {
            const newUser = await userDao.register(user);
            return newUser;
        }
        const newUser = await userDao.register({
            ...user,
            cart: idCart,
            password: createHash(password),
        });
        return newUser;
    } catch (error) {
        throw (error);
    }
};

export const login = async (user) => {
    try {
        const { email, password } = user;
        const userExist = await getUserByEmail(email);
        if (!userExist) throw new Error("User not found");
        const passValid = isValidPassword(password, userExist);
        if (!passValid) throw new Error("incorrect credentials");
        return userExist;
    } catch (error) {
        throw (error);
    }
};

export const generateToken = (user) => {
    const payload = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        cart: user.cart,
        role: user.role,
    };

    return jwt.sign(payload, config.SECRET_KEY, { expiresIn: "20m" });
};