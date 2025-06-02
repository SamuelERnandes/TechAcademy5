import Joi from "joi";

export const emailValidation = Joi.string()
  .email()
  .empty("")
  .required()
  .messages({
    "string.base": "Email deve ser uma string",
    "string.email": "Formato de email inválido",
    "string.empty": "Email é obrigatório",
    "any.required": "Email é obrigatório",
  });
