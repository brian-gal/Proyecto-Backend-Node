import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import config from "../config/config.js";
import * as userService from '../services/user.services.js';

const cookieExtractor = (req) => {
    return req.cookies ? req.cookies['token'] : null;
};

const strategyCookiesConfig = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: config.SECRET_KEY,
};

const verifyToken = async (jwt_payload, done) => {
    //req.user = jwt_payload
    if (!jwt_payload) return done(null, false, { messages: "Usuario inexistente" });
    return done(null, jwt_payload);
};

passport.use('current', new JwtStrategy(strategyCookiesConfig, verifyToken));

