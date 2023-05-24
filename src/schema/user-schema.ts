import Joi from 'joi';

const email = Joi.string().email({ tlds: { allow: false } });
const name = Joi.string();
const phone = Joi.string().min(8).max(14);
const address = Joi.string().min(16);
const password = Joi.string().alphanum().min(8).max(16).required();

export const login = Joi.object({
    phone: phone.required(),
    password: password.required()
});

export const register = Joi.object({
    email: email.required(),
    name: name.required(),
    phone: phone.required(),
    address: address.required(),
    password: password.required()
});