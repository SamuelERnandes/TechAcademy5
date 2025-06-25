import { test, expect } from "@playwright/test";

const baseUrl = "https://frameflix.local";

test.describe("Coleções - Criar, Editar e Excluir", () => {
  test("deve criar e editar uma coleção com sucesso", async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[name="email"]', "usuario@teste.com");
    await page.fill('input[name="password"]', "Senha123456!");
    await page.click('button[type="submit"]');
    await page.waitForURL(`${baseUrl}/movies`);
    await page.goto(`${baseUrl}/collections`);
    const collectionName = `Coleção Teste ${Math.floor(Math.random() * 1000)}`;
    const editedName = `${collectionName} Editada`;

    // Criando a coleção
    await page.fill(
      'input[placeholder="Nome da nova coleção"]',
      collectionName
    );
    await page.waitForTimeout(500);
    await page.click("button:has-text('Criar')");
    await page.waitForTimeout(500);
    await page.waitForSelector("text=Coleção criada!", { timeout: 5000 });
    const created = await page.locator(`text=${collectionName}`).count();
    expect(created).toBeGreaterThan(0);

    // Editando a coleção
    const lastCard = page.locator("div.shadow").last();
    await lastCard.locator("button:has-text('Editar')").click();
    await lastCard.locator("input.border").waitFor({ timeout: 3000 });
    await lastCard.locator("input.border").fill(editedName);
    await lastCard.locator("button:has-text('Salvar')").click();
    await page.waitForSelector("text=Coleção atualizada!", { timeout: 5000 });
    const edited = await page.locator(`text=${editedName}`).count();
    expect(edited).toBeGreaterThan(0);

    // Excluindo a coleção
    await lastCard.locator("button:has-text('Excluir')").click();
    await page.waitForTimeout(500);
    const deleted = await page.locator(`text=${editedName}`).count();
    expect(deleted).toBe(0);
  });

  test("deve exibir erro ao tentar criar uma coleção sem nome", async ({
    page,
  }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[name="email"]', "usuario@teste.com");
    await page.fill('input[name="password"]', "Senha123456!");
    await page.click('button[type="submit"]');
    await page.waitForURL(`${baseUrl}/movies`);
    await page.goto(`${baseUrl}/collections`);
    await page.click("button:has-text('Criar')");
    await page.waitForTimeout(500);
    await page.waitForSelector("text=Nome da coleção é obrigatório", {
      timeout: 3000,
    });
  });
});
