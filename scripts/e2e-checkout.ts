import { chromium, Browser, Page } from "playwright";

const BASE_URL = "http://localhost:3000";
const ADMIN_CREDENTIALS = { username: "admin", password: "changeme" };

async function addToCart(page: Page) {
  await page.goto(`${BASE_URL}/catalog/smartfony/apple-iphone-15-128gb/`);
  await page.waitForSelector('button:has-text("В корзину")', { timeout: 10000 });
  await page.click('button:has-text("В корзину")');
  // Wait for cart counter update
  await page.waitForSelector('header >> text=/\\d+ товар/', { timeout: 10000 });
}

async function fillCheckout(page: Page) {
  await page.goto(`${BASE_URL}/checkout/`);

  // Contacts
  await page.fill('input[placeholder="Имя"]', "Тестовый Клиент E2E");
  await page.fill('input[placeholder="Email"]', "test-e2e@gadgetflow.by");
  await page.fill('input[type="tel"]', "+375 (29) 123-45-67");
  await page.click('button:has-text("Продолжить")');

  // Delivery
  await page.fill('input[placeholder="Город"]', "Гомель");
  await page.fill('input[placeholder="Улица, дом, квартира"]', "ул. Ленина, 10, кв. 5");
  await page.fill('input[placeholder="Почтовый индекс"]', "246000");
  await page.click('button:has-text("Продолжить")');

  // Payment
  await page.click('[role="combobox"]:has-text("Выберите способ оплаты")');
  await page.click('[role="option"]:has-text("ЕРИП / онлайн-банк")');
  await page.click('button:has-text("Оплатить")');
}

async function verifyAdminOrder(page: Page, customerName: string) {
  const auth = Buffer.from(
    `${ADMIN_CREDENTIALS.username}:${ADMIN_CREDENTIALS.password}`
  ).toString("base64");
  await page.setExtraHTTPHeaders({ Authorization: `Basic ${auth}` });
  await page.goto(`${BASE_URL}/admin/`);
  await page.waitForLoadState("networkidle");
  await page.waitForSelector('h2:has-text("Заказы")', { timeout: 10000 });
  const orderCard = await page.locator(`text=${customerName}`).first();
  const visible = await orderCard.isVisible().catch(() => false);
  return visible;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await addToCart(page);
    await fillCheckout(page);

    await page.waitForSelector('text=Заказ оформлен!', { timeout: 15000 });
    await page.screenshot({ path: "scripts/e2e-checkout-success.png", fullPage: true });
    console.log("✅ Checkout success screen reached");

    const visible = await verifyAdminOrder(page, "Тестовый Клиент E2E");
    if (!visible) {
      throw new Error("Order not found in admin panel");
    }
    console.log("✅ Order visible in admin panel");
  } catch (err) {
    await page.screenshot({ path: "scripts/e2e-checkout-error.png", fullPage: true });
    console.error("❌ E2E checkout failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();
