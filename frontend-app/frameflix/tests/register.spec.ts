import { test, expect } from "@playwright/test";

const baseUrl = "http://localhost:5173";

function generateValidCPF(): string {
  const rand = () => Math.floor(Math.random() * 9);

  const calcCheckDigit = (digits: number[]) => {
    const weight = digits.length + 1;
    const sum = digits.reduce(
      (acc, digit, idx) => acc + digit * (weight - idx),
      0
    );
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const cpfArray = Array.from({ length: 9 }, rand);
  cpfArray.push(calcCheckDigit(cpfArray));
  cpfArray.push(calcCheckDigit(cpfArray));

  return cpfArray.join("");
}

test.describe("Registro de usuário", () => {
  const randomSuffix = Math.floor(Math.random() * 100000);
  const email = `user${randomSuffix}@teste.com`;
  const cpf = generateValidCPF();

  test("deve criar um novo usuário com sucesso", async ({ page }) => {
    await page.goto(`${baseUrl}/register`);

    await page.fill('input[name="name"]', "Usuário");
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', "Senha123456!");
    await page.fill('input[name="confirmPassword"]', "Senha123456!");
    await page.fill('input[name="cpf"]', cpf);

    await page.click('button[type="submit"]');

    await page.waitForTimeout(500);
    await page.waitForSelector("text=Cadastro realizado com sucesso", {
      timeout: 3000,
    });
  });

  test("deve exibir erro ao tentar cadastrar com e-mail já existente", async ({
    page,
  }) => {
    await page.goto(`${baseUrl}/register`);

    await page.fill('input[name="name"]', "usuario");
    await page.fill('input[name="email"]', "usuario@teste.com");
    await page.fill('input[name="password"]', "Senha123456!");
    await page.fill('input[name="confirmPassword"]', "Senha123456!");
    await page.fill('input[name="cpf"]', "09898402040");

    await page.click('button[type="submit"]');

    await page.waitForTimeout(500);
    await page.waitForSelector("text=E-mail já cadastrado", {
      timeout: 3000,
    });
  });
});
