import { isValidCPF } from "../cpfValidation";

describe("isValidCPF", () => {
  it("valida CPF correto", () => {
    expect(isValidCPF("52998224725")).toBe(true);
  });

  it("detecta CPF com dígitos iguais", () => {
    expect(isValidCPF("11111111111")).toBe(false);
  });

  it("detecta CPF com dígito verificador inválido", () => {
    expect(isValidCPF("52998224724")).toBe(false);
  });
});
