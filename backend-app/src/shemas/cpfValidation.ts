import Joi from 'joi';

export const cpfValidation = Joi.string()
  .trim()
  .length(11)
  .pattern(/^\d{11}$/)
  .required()
  .messages({
    'string.base': 'CPF deve ser uma string',
    'string.length': 'CPF deve ter exatamente 11 dígitos',
    'string.pattern.base': 'CPF deve conter apenas números',
    'any.required': 'CPF é obrigatório',
  });
