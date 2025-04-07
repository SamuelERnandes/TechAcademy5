import Joi from 'joi';

export const emailValidation = Joi.string().email().required().messages({
  'string.base': 'Email deve ser uma string',
  'string.email': 'Formato de email inválido',
  'any.required': 'Email é obrigatório',
});
