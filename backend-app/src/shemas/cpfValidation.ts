import Joi from "joi";

export const isValidCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let firstDigit = 11 - (sum % 11);
  if (firstDigit > 9) firstDigit = 0;
  if (firstDigit !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  let secondDigit = 11 - (sum % 11);
  if (secondDigit > 9) secondDigit = 0;
  return secondDigit === parseInt(cpf.charAt(10));
};

export const cpfValidation = Joi.string()
  .trim()
  .length(11)
  .pattern(/^\d{11}$/)
  .required()
  .custom((value, helpers) => {
    if (!isValidCPF(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  }, "Validação lógica do CPF")
  .messages({
    "string.base": "CPF deve ser uma string",
    "string.length": "CPF deve ter exatamente 11 dígitos",
    "string.pattern.base": "CPF deve conter apenas números",
    "any.required": "CPF é obrigatório",
    "any.invalid": "CPF inválido",
  });
