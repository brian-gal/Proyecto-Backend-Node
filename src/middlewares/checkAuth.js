import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const checkAuthCookies = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const payloadDecode = jwt.verify(token, config.SECRET_KEY);
        req.user = payloadDecode;
        next();
    } catch (error) {
        throw new Error(error)
    }
}