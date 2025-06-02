import Joi from 'joi';

export const passwordValidation = Joi.string()
  .empty('')
  .min(8)
  .max(20)
  .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/)
  .required()
  .messages({
    'string.base': 'A senha deve ser uma string',
    'string.min': 'A senha deve ter pelo menos 8 caracteres',
    'string.max': 'A senha pode ter no máximo 20 caracteres',
    'string.pattern.base':
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
    'any.required': 'A senha é obrigatória',
  });
