import { emailValidation } from "../emailValidation";

describe("emailValidation (Joi schema)", () => {
  it("aceita e-mail válido", () => {
    const { error } = emailValidation.validate("usuario@teste.com");
    expect(error).toBeUndefined();
  });

  it("rejeita e-mail inválido", () => {
    const { error } = emailValidation.validate("emailinvalido.com");
    expect(error).toBeDefined();
    expect(error?.message).toMatch(/Formato de email inválido/);
  });

  it("rejeita e-mail vazio", () => {
    const { error } = emailValidation.validate("");
    expect(error).toBeDefined();
    expect(error?.message).toMatch(/Email é obrigatório/);
  });

  it("rejeita e-mail como número", () => {
    const { error } = emailValidation.validate(123456);
    expect(error).toBeDefined();
    expect(error?.message).toMatch(/Email deve ser uma string/);
  });
});
