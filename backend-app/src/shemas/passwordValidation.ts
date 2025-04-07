import Joi from 'joi';

export const passwordValidation = Joi.string()
  .min(5)
  .max(20)
  .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/)
  .required()
  .messages({
    'string.base': 'A senha deve ser uma string',
    'string.min': 'A senha deve ter pelo menos 5 caracteres',
    'string.max': 'A senha pode ter no máximo 20 caracteres',
    'string.pattern.base':
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número',
    'any.required': 'A senha é obrigatória',
  });
