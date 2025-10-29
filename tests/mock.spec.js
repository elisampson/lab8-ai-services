import { test, expect } from "@playwright/test";

test("Mock service returns predictable response", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500"); 
  await page.selectOption("#providerSelect", "mock");

  await page.fill("#messageBox", "Hi there!");
  await page.click("#chatForm button[type='submit']");

  await page.waitForSelector(".message.bot");

  const botText = await page.locator(".message.bot p").last().textContent();
  expect(botText).toContain("mock AI reply");
});
