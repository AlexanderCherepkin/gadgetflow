import { chromium } from "@playwright/test";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3003";
const OUTPUT_DIR = join(process.cwd(), "audit-output");
mkdirSync(OUTPUT_DIR, { recursive: true });

async function runTests() {
  const browser = await chromium.launch();
  const results = [];

  // Helper to create context/page with console error capture
  async function newPage(mobile = false) {
    const context = await browser.newContext({
      viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 800 },
    });
    const page = await context.newPage();
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));
    return { page, context, errors };
  }

  // Test 1: Mobile menu opens
  {
    const { page, context, errors } = await newPage(true);
    await page.goto(`${BASE_URL}/`);
    await page.getByRole("button", { name: "Меню" }).click();
    const menuVisible = await page.locator("text=Личный кабинет").first().isVisible();
    results.push({
      test: "mobile-menu-opens",
      passed: menuVisible,
      errors,
      note: menuVisible ? "" : "Mobile menu did not open",
    });
    await context.close();
  }

  // Test 2: Sorting works on catalog
  {
    const { page, context, errors } = await newPage(false);
    await page.goto(`${BASE_URL}/catalog/smartfony/`);
    // Click sort select trigger (main content area)
    const sortSelect = page.locator('[role="combobox"][aria-label="Сортировка"]');
    await sortSelect.click();
    await page.locator('[role="option"]', { hasText: "Сначала дешёвые" }).click();
    await page.waitForTimeout(500);
    // Get first product price text
    const firstPriceText = await page.locator(".card-hover .text-lg.font-semibold").first().textContent();
    const firstPrice = parseInt(firstPriceText.replace(/\D/g, ""), 10);
    // Sort descending
    await sortSelect.click();
    await page.locator('[role="option"]', { hasText: "Сначала дорогие" }).click();
    await page.waitForTimeout(500);
    const newFirstPriceText = await page.locator(".card-hover .text-lg.font-semibold").first().textContent();
    const newFirstPrice = parseInt(newFirstPriceText.replace(/\D/g, ""), 10);
    results.push({
      test: "catalog-sorting",
      passed: firstPrice < newFirstPrice,
      errors,
      note: `asc first=${firstPrice}, desc first=${newFirstPrice}`,
    });
    await context.close();
  }

  // Test 3: Load more works
  {
    const { page, context, errors } = await newPage(false);
    await page.goto(`${BASE_URL}/catalog/smartfony/`);
    const initialCount = await page.locator(".card-hover").count();
    const loadMore = page.locator("text=Загрузить ещё");
    let passed = false;
    let note = "";
    if (await loadMore.isVisible().catch(() => false)) {
      await loadMore.click();
      await page.waitForTimeout(500);
      const newCount = await page.locator(".card-hover").count();
      passed = newCount > initialCount;
      note = `initial=${initialCount}, after=${newCount}`;
    } else {
      passed = true;
      note = "Less than 8 products, load-more button not shown";
    }
    results.push({ test: "catalog-load-more", passed, errors, note });
    await context.close();
  }

  // Test 4: Add to cart updates header counter
  {
    const { page, context, errors } = await newPage(false);
    await page.goto(`${BASE_URL}/catalog/smartfony/`);
    await page.waitForTimeout(800); // let cart hydrate
    const initialCart = await page.locator("header .text-\\[10px\\]").first().textContent().catch(() => "0 товаров");
    const cartButton = page.locator('button[aria-label="Добавить в корзину"]').first();
    await cartButton.click();
    await page.waitForTimeout(500);
    const newCart = await page.locator("header .text-\\[10px\\]").first().textContent().catch(() => "0 товаров");
    results.push({
      test: "add-to-cart-header",
      passed: newCart !== initialCart,
      errors,
      note: `before=${initialCart}, after=${newCart}`,
    });
    await context.close();
  }

  // Test 5: PDP add to cart
  {
    const { page, context, errors } = await newPage(false);
    await page.goto(`${BASE_URL}/catalog/smartfony/apple-iphone-15-128gb/`);
    const addButton = page.locator('button:has-text("В корзину")').first();
    const visible = await addButton.isVisible().catch(() => false);
    let passed = false;
    let note = "";
    if (visible) {
      await addButton.click();
      await page.waitForTimeout(500);
      const cartText = await page.locator("header .text-\\[10px\\]").first().textContent().catch(() => "0 товаров");
      passed = cartText.includes("1");
      note = `cart=${cartText}`;
    } else {
      note = "Add to cart button not found on PDP";
    }
    results.push({ test: "pdp-add-to-cart", passed, errors, note });
    await context.close();
  }

  // Test 6: Search input submits to /search and shows results
  {
    const { page, context, errors } = await newPage(false);
    await page.goto(`${BASE_URL}/`);
    const searchInput = page.locator('input[type="search"]').first();
    let passed = false;
    let note = "";
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill("iPhone");
      await searchInput.press("Enter");
      await page.waitForNavigation({ waitUntil: "networkidle" });
      const url = page.url();
      const resultsCount = await page.locator(".card-hover").count();
      passed = url.includes("/search") && resultsCount > 0;
      note = `url=${url}, results=${resultsCount}`;
    } else {
      note = "Search input not visible";
    }
    results.push({ test: "search-input", passed, errors, note });
    await context.close();
  }

  // Test 7: Filters exist
  {
    const { page, context, errors } = await newPage(false);
    await page.goto(`${BASE_URL}/catalog/smartfony/`);
    const filterSection = await page.locator('[data-testid="filters-panel"]').isVisible().catch(() => false);
    const brandFilter = await page.locator('[data-testid="filters-panel"]').locator('text=Бренд').first().isVisible().catch(() => false);
    results.push({
      test: "filters-exist",
      passed: filterSection && brandFilter,
      errors,
      note: `filters=${filterSection}, brand=${brandFilter}`,
    });
    await context.close();
  }

  // Test 8: Wishlist toggle (mobile viewport because heart button is always visible)
  {
    const { page, context, errors } = await newPage(true);
    await page.goto(`${BASE_URL}/catalog/smartfony/`);
    await page.waitForTimeout(800); // let wishlist hydrate
    const heart = page.locator('button[aria-label="В избранное"]').first();
    let passed = false;
    let note = "";
    if (await heart.isVisible().catch(() => false)) {
      await heart.click();
      await page.waitForTimeout(500);
      await page.getByRole("button", { name: "Меню" }).click();
      const wishlistCount = page.locator("text=Избранное").first().locator("..");
      const countText = await wishlistCount.textContent().catch(() => "");
      passed = countText.includes("(1)");
      note = `wishlist count=${countText}`;
    } else {
      note = "Wishlist button not visible";
    }
    results.push({ test: "wishlist-toggle", passed, errors, note });
    await context.close();
  }

  await browser.close();

  const reportPath = join(OUTPUT_DIR, "interactive-audit-report.json");
  writeFileSync(reportPath, JSON.stringify(results, null, 2));

  console.log("\n=== INTERACTIVE AUDIT RESULTS ===");
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
