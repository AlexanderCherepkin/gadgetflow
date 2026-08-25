import { chromium } from "@playwright/test";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3003";
const OUTPUT_DIR = join(process.cwd(), "audit-output");
mkdirSync(OUTPUT_DIR, { recursive: true });

const VIEWPORT = { width: 390, height: 844 };
const TOUCH = { hasTouch: true, isMobile: true };

async function newMobilePage(browser) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    ...TOUCH,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return { page, context, errors };
}

async function runTests() {
  const browser = await chromium.launch();
  const results = [];

  // 1. Mobile menu opens and closes
  {
    const { page, context, errors } = await newMobilePage(browser);
    await page.goto(`${BASE_URL}/`);
    await page.getByRole("button", { name: "Меню" }).click();
    const menuOpen = await page.locator("text=Личный кабинет").first().isVisible();
    const bodyOverflow = await page.evaluate(() => window.getComputedStyle(document.body).overflow);
    await page.getByRole("button", { name: "Закрыть" }).first().click().catch(() => {});
    const menuClosed = await page.locator("text=Личный кабинет").first().isVisible().catch(() => false);
    results.push({
      test: "mobile-menu-toggle",
      passed: menuOpen && !menuClosed,
      errors,
      note: `open=${menuOpen}, closed=${!menuClosed}, bodyOverflow=${bodyOverflow}`,
    });
    await context.close();
  }

  // 2. Hero slider swipes and auto-advances
  {
    const { page, context, errors } = await newMobilePage(browser);
    await page.goto(`${BASE_URL}/`);
    await page.waitForTimeout(1200);
    const firstTitle = await page.locator("[data-testid='hero-slide']").first().textContent().catch(() => "");
    const box = await page.locator("[data-testid='hero-slider']").first().boundingBox();
    let swipePassed = false;
    let note = `sliderBox=${JSON.stringify(box)}`;
    if (box) {
      await page.mouse.move(box.x + box.width * 0.8, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2, { steps: 10 });
      await page.mouse.up();
      await page.waitForTimeout(600);
      const newTitle = await page.locator("[data-testid='hero-slide']").first().textContent().catch(() => "");
      swipePassed = newTitle !== firstTitle;
      note += `, firstTitle=${firstTitle.slice(0, 40)}, newTitle=${newTitle.slice(0, 40)}`;
    }
    // Auto advance
    await page.waitForTimeout(8500);
    const autoTitle = await page.locator("[data-testid='hero-slide']").first().textContent().catch(() => "");
    const autoPassed = autoTitle !== firstTitle;
    results.push({
      test: "hero-slider-mobile",
      passed: swipePassed || autoPassed,
      errors,
      note: `${note}, swipe=${swipePassed}, auto=${autoPassed}`,
    });
    await context.close();
  }

  // 3. Cart flow from mobile catalog
  {
    const { page, context, errors } = await newMobilePage(browser);
    await page.goto(`${BASE_URL}/catalog/smartfony/`);
    await page.waitForTimeout(800);
    const cartBefore = await page.locator("header span:text-matches('товаров')").textContent().catch(() => "0 товаров");
    const cartButton = page.locator('button[aria-label="Добавить в корзину"]').first();
    await cartButton.click();
    await page.waitForTimeout(800);
    const cartAfter = await page.locator("header span:text-matches('товаров')").textContent().catch(() => "0 товаров");
    // Open mobile menu and go to cart
    await page.getByRole("button", { name: "Меню" }).click();
    await page.locator("text=Корзина").first().click();
    await page.waitForTimeout(500);
    const inCart = await page.locator("text=Оформить заказ").first().isVisible().catch(() => false);
    const cartItems = await page.locator("[data-testid='cart-item']").count().catch(() => 0);
    results.push({
      test: "mobile-cart-flow",
      passed: cartAfter !== cartBefore && inCart && cartItems > 0,
      errors,
      note: `before=${cartBefore}, after=${cartAfter}, inCartPage=${inCart}, items=${cartItems}`,
    });
    await context.close();
  }

  // 4. Mobile filters drawer
  {
    const { page, context, errors } = await newMobilePage(browser);
    await page.goto(`${BASE_URL}/catalog/smartfony/`);
    const filterButton = page.locator("button", { hasText: "Фильтры" }).first();
    let passed = false;
    let note = "";
    if (await filterButton.isVisible().catch(() => false)) {
      await filterButton.click();
      const panel = await page.locator('[data-testid="filters-panel"]').isVisible().catch(() => false);
      const brand = await page.locator('[data-testid="filters-panel"] [data-testid="filter-brand"] legend:text-matches("Бренд")').isVisible().catch(() => false);
      // Filter by Apple
      await page.locator('[data-testid="filters-panel"] input[type="checkbox"]').first().click();
      await page.locator("button", { hasText: "Показать" }).first().click().catch(() => {});
      await page.waitForTimeout(500);
      const count = await page.locator(".card-hover").count();
      passed = panel && brand && count > 0;
      note = `panel=${panel}, brand=${brand}, appleCount=${count}`;
    } else {
      note = "Filter button not visible";
    }
    results.push({ test: "mobile-filters", passed, errors, note });
    await context.close();
  }

  // 5. Touch targets ≥ 44×44
  {
    const { page, context, errors } = await newMobilePage(browser);
    await page.goto(`${BASE_URL}/`);
    const buttons = await page.locator("button, a, [role='button'], input[type='checkbox']").all();
    let small = 0;
    const offenders = [];
    for (const el of buttons.slice(0, 40)) {
      const box = await el.boundingBox().catch(() => null);
      if (!box || box.width === 0 || box.height === 0) continue;
      if (box.width < 44 || box.height < 44) {
        small++;
        const text = await el.textContent().catch(() => "");
        offenders.push(`${text.slice(0, 30)} ${Math.round(box.width)}×${Math.round(box.height)}`);
      }
    }
    results.push({
      test: "mobile-touch-targets",
      passed: small === 0,
      errors,
      note: small === 0 ? "all ok" : `${small} small targets: ${offenders.slice(0, 5).join("; ")}`,
    });
    await context.close();
  }

  // 6. Mobile PDP add to cart and sticky header
  {
    const { page, context, errors } = await newMobilePage(browser);
    await page.goto(`${BASE_URL}/catalog/smartfony/apple-iphone-15-128gb/`);
    const addButton = page.locator('button:has-text("В корзину")').first();
    const visible = await addButton.isVisible().catch(() => false);
    let passed = false;
    let note = "";
    if (visible) {
      await addButton.click();
      await page.waitForTimeout(500);
      const cartText = await page.locator("header .text-\\[10px\\]").first().textContent().catch(() => "0 товаров");
      const headerSticky = await page.evaluate(() => {
        const header = document.querySelector("header");
        if (!header) return "no header";
        const pos = window.getComputedStyle(header).position;
        const top = window.getComputedStyle(header).top;
        return `${pos}:${top}`;
      });
      passed = cartText.includes("1");
      note = `cart=${cartText}, header=${headerSticky}`;
    } else {
      note = "PDP add button not visible";
    }
    results.push({ test: "mobile-pdp-cart", passed, errors, note });
    await context.close();
  }

  await browser.close();

  const reportPath = join(OUTPUT_DIR, "mobile-audit-report.json");
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  console.log("\n=== MOBILE AUDIT RESULTS ===");
  for (const r of results) {
    console.log(`${r.passed ? "✓" : "✗"} ${r.test}: ${r.note || ""}`);
    if (r.errors.length) console.log(`   errors: ${r.errors.join("; ")}`);
  }
  console.log(`\nReport: ${reportPath}`);
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
