import { test, expect } from "@playwright/test";

const baseUrl = "https://frameflix.local";

test.describe("Avaliações - Criar", () => {
  test("deve criar, listar, editar e excluir uma avaliação", async ({
    page,
  }) => {
    const commentText = `Comentário Teste ${Math.floor(Math.random() * 1000)}`;
    const editedText = `Comentário Editado ${Math.floor(Math.random() * 1000)}`;

    await page.goto(`${baseUrl}/login`);
    await page.fill('input[name="email"]', "usuario@teste.com");
    await page.fill('input[name="password"]', "Senha123456!");
    await page.click('button[type="submit"]');
    await page.waitForURL(`${baseUrl}/movies`);

    await page.goto(`${baseUrl}/rating`);
    await page.selectOption("select#movie", { index: 1 });
    await page.click('[data-testid="star-4"]');
    await page.fill("textarea#comment", commentText);
    await page.click("button:has-text('Enviar Avaliação')");
    await page.waitForSelector("text=Avaliação enviada!", { timeout: 5000 });

    await page.waitForTimeout(500);
    await page.goto(`${baseUrl}/my-ratings`);
    const allCards = page.locator('[data-testid="rating-card"]');
    const lastCard = allCards.last();

    await expect(lastCard).toContainText("Nota: 4/5");

    await lastCard.getByRole("button", { name: "Editar" }).click();

    const commentBox = lastCard.locator("textarea");
    await commentBox.waitFor({ state: "visible", timeout: 5000 });
    await commentBox.fill(editedText);

    const star5 = lastCard.locator('button[data-testid="star-5"]');
    await star5.waitFor({ state: "visible", timeout: 5000 });
    await star5.click();

    await lastCard.getByRole("button", { name: "Salvar" }).click();

    await page.waitForSelector("text=Avaliação atualizada!", { timeout: 5000 });

    await page.reload();
    const updatedCard = page
      .locator('[data-testid="rating-card"]')
      .filter({ hasText: editedText });
    await expect(updatedCard).toContainText("Nota: 5/5");
    await expect(updatedCard).toContainText(editedText);

    await lastCard.getByRole("button", { name: "Excluir" }).click();
    await page.waitForSelector("text=Avaliação removida!", { timeout: 5000 });

    const stillExists = await page
      .locator('[data-testid="rating-card"]')
      .filter({ hasText: editedText })
      .count();
    expect(stillExists).toBe(0);
  });

  test("não deve permitir envio sem selecionar filme", async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[name="email"]', "usuario@teste.com");
    await page.fill('input[name="password"]', "Senha123456!");
    await page.click('button[type="submit"]');
    await page.waitForURL(`${baseUrl}/movies`);
    await page.goto(`${baseUrl}/rating`);

    await page.click("button:has-text('Enviar Avaliação')");
    await page.waitForSelector("text=Selecione um filme.", { timeout: 3000 });
  });

  test("não deve permitir envio sem pontuação", async ({ page }) => {
    await page.goto(`${baseUrl}/login`);
    await page.fill('input[name="email"]', "usuario@teste.com");
    await page.fill('input[name="password"]', "Senha123456!");
    await page.click('button[type="submit"]');
    await page.waitForURL(`${baseUrl}/movies`);
    await page.goto(`${baseUrl}/rating`);

    await page.selectOption("select#movie", { index: 1 });
    await page.click("button:has-text('Enviar Avaliação')");

    await page.waitForSelector("text=Por favor, adicione uma pontuação.", {
      timeout: 3000,
    });
  });
});
