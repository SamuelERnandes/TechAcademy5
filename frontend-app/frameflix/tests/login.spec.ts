import { test, expect } from "@playwright/test";

test.describe("Login", () => {
  const baseUrl = "http://localhost:5173";

  test("deve fazer login com sucesso", async ({ page }) => {
    await page.goto(`${baseUrl}/`);

    await page.fill('input[name="email"]', "usuario@teste.com");
    await page.fill('input[name="password"]', "Senha123456!");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(`${baseUrl}/movies`);

    await page.waitForSelector('h1:text("Filmes disponíveis")');
  });

  test("deve exibir erro com credenciais inválidas", async ({ page }) => {
    await page.goto(`${baseUrl}/`);

    await page.fill('input[name="email"]', "usuario@teste.com");
    await page.fill('input[name="password"]', "senhaErrada");
    await page.click('button[type="submit"]');
    await page.waitForTimeout(300);
    await page.waitForSelector("text=Email or password are invalid", {
      timeout: 3000,
    });
  });
});
