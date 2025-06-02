import { passwordValidation } from "../passwordValidation";

describe("passwordValidation (Joi schema)", () => {
  it("aceita senha forte válida", () => {
    const { error } = passwordValidation.validate("Senha123");
    expect(error).toBeUndefined();
  });

  it("rejeita senha sem letra maiúscula", () => {
    const { error } = passwordValidation.validate("senha123");
    expect(error).toBeDefined();
    expect(error?.message).toMatch(/uma letra maiúscula/);
  });

  it("rejeita senha sem letra minúscula", () => {
    const { error } = passwordValidation.validate("SENHA123");
    expect(error).toBeDefined();
    expect(error?.message).toMatch(/uma letra minúscula/);
  });

  it("rejeita senha sem número", () => {
    const { error } = passwordValidation.validate("SenhaSemNumero");
    expect(error).toBeDefined();
    expect(error?.message).toMatch(/um número/);
  });

  it("rejeita senha muito curta", () => {
    const { error } = passwordValidation.validate("Aa1");
    expect(error).toBeDefined();
    expect(error?.message).toMatch(/pelo menos 8 caracteres/);
  });

  it("rejeita senha muito longa", () => {
    const { error } = passwordValidation.validate("Senha123Senha123Senha123");
    expect(error).toBeDefined();
    expect(error?.message).toMatch(/no máximo 20 caracteres/);
  });

  it("rejeita senha vazia", () => {
    const { error } = passwordValidation.validate("");
    expect(error).toBeDefined();
    expect(error?.message).toMatch(/A senha é obrigatória/);
  });
});
