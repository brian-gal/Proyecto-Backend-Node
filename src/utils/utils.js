import { hashSync, genSaltSync, compareSync } from 'bcrypt';

export const createHash = (password) => hashSync(password, genSaltSync(10))

export const isValidPassword = (password, user) => compareSync(password, user.password);