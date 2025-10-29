import { test, expect } from "@playwright/test";

test("Eliza responds to a user message", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500"); 
  await page.selectOption("#providerSelect", "eliza");

  await page.fill("#messageBox", "Hello");
  await page.click("#chatForm button[type='submit']");

  // Wait for response 
  await page.waitForSelector(".message.bot");

  const botText = await page.locator(".message.bot p").last().textContent();
  expect(botText.length).toBeGreaterThan(0);
});
