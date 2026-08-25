import { chromium } from "@playwright/test";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3003";
const OUTPUT_DIR = join(process.cwd(), "audit-output");
mkdirSync(OUTPUT_DIR, { recursive: true });

const PAGES = [
  { path: "/", name: "Главная" },
  { path: "/checkout/", name: "Оформление заказа" },
  { path: "/account/", name: "Личный кабинет" },
  { path: "/wishlist/", name: "Избранное" },
  { path: "/news/", name: "Новости" },
  { path: "/news/kak-vybrat-smart-chasy/", name: "Статья (smart-chasy)" },
  { path: "/about/", name: "О компании" },
  { path: "/contacts/", name: "Контакты" },
  { path: "/delivery/", name: "Доставка и оплата" },
  { path: "/warranty/", name: "Гарантия и возврат" },
  { path: "/faq/", name: "FAQ" },
  { path: "/privacy/", name: "Политика конфиденциальности" },
  { path: "/terms/", name: "Пользовательское соглашение" },
  { path: "/cart/", name: "Корзина" },
  { path: "/catalog/smartfony/", name: "Категория смартфоны" },
  { path: "/catalog/smart-chasy/", name: "Категория смарт-часы" },
  { path: "/catalog/audio/", name: "Категория аудио" },
  { path: "/catalog/noutbuki/", name: "Категория ноутбуки" },
  { path: "/catalog/umnyy-dom/", name: "Категория умный дом" },
  { path: "/catalog/aksessuary/", name: "Категория аксессуары" },
  { path: "/catalog/rasprodazha/", name: "Категория распродажа" },
  { path: "/catalog/smartfony/apple-iphone-15-128gb/", name: "Карточка товара" },
  { path: "/search?q=iPhone", name: "Поиск" },
];

const MOBILE_VIEWPORT = { width: 390, height: 844, deviceScaleFactor: 2 };

async function auditPage(browser, pageInfo, isMobile = false) {
  const context = await browser.newContext({
    viewport: isMobile ? MOBILE_VIEWPORT : { width: 1280, height: 800 },
    userAgent: isMobile
      ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15"
      : undefined,
  });
  const page = await context.newPage();

  const consoleErrors = [];
  const networkFailures = [];
  const network404s = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  page.on("response", (response) => {
    const status = response.status();
    const url = response.url();
    if (status >= 400) {
      networkFailures.push({ url, status });
      if (status === 404) {
        network404s.push({ url, status });
      }
    }
  });

  const result = {
    path: pageInfo.path,
    name: pageInfo.name,
    viewport: isMobile ? "mobile" : "desktop",
    url: null,
    status: "ok",
    title: null,
    consoleErrors: [],
    networkFailures: [],
    network404s: [],
    formIssues: [],
    headingIssues: [],
    screenshot: null,
    loadTimeMs: 0,
  };

  try {
    const start = Date.now();
    const response = await page.goto(`${BASE_URL}${pageInfo.path}`, {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    result.loadTimeMs = Date.now() - start;
    result.url = page.url();
    result.status = response ? response.status() : "no-response";
    result.title = await page.title();

    // Wait a bit for lazy hydration and scroll to bottom to trigger reveal animations
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Check forms for id/name
    const forms = await page.locator("form").evaluateAll((forms) =>
      forms.map((form, formIdx) => {
        const inputs = Array.from(form.querySelectorAll("input, select, textarea"));
        const issues = [];
        inputs.forEach((input, idx) => {
          const tag = input.tagName.toLowerCase();
          const id = input.id;
          const name = input.getAttribute("name");
          const type = input.getAttribute("type");
          if (type === "submit" || type === "button" || type === "hidden") return;
          if (!id && !name) {
            issues.push({ index: idx, tag, text: input.placeholder?.slice(0, 40), issue: "no id/name" });
          }
        });
        return { formIndex: formIdx, issues };
      })
    );
    result.formIssues = forms.flatMap((f) => f.issues);

    // Check heading order
    const headings = await page.locator("h1, h2, h3, h4, h5, h6").evaluateAll((els) =>
      els.map((el) => ({ level: parseInt(el.tagName[1]), text: el.textContent.trim().slice(0, 60) }))
    );
    let lastLevel = 0;
    const headingIssues = [];
    headings.forEach((h, i) => {
      if (h.level > lastLevel + 1) {
        headingIssues.push({ index: i, level: h.level, text: h.text, previousLevel: lastLevel });
      }
      lastLevel = h.level;
    });
    result.headingIssues = headingIssues;

    // Screenshot
    const safePath = pageInfo.path.replace(/[\\/:*?"<>&|]/g, "_").replace(/__/g, "_");
    const screenshotName = `${isMobile ? "mobile" : "desktop"}-${safePath || "home"}.png`;
    const screenshotPath = join(OUTPUT_DIR, screenshotName);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    result.screenshot = screenshotPath;
  } catch (err) {
    result.status = "error";
    result.error = err.message;
  }

  result.consoleErrors = consoleErrors.slice(0, 20);
  result.networkFailures = networkFailures.slice(0, 20);
  result.network404s = network404s.slice(0, 20);

  await context.close();
  return result;
}

async function main() {
  const browser = await chromium.launch();
  const results = [];

  for (const pageInfo of PAGES) {
    console.log(`Auditing desktop: ${pageInfo.path}`);
    results.push(await auditPage(browser, pageInfo, false));
    console.log(`Auditing mobile: ${pageInfo.path}`);
    results.push(await auditPage(browser, pageInfo, true));
  }

  await browser.close();

  // Summary
  const summary = {
    total: results.length,
    errors: results.filter((r) => r.status === "error" || r.status >= 400).length,
    consoleErrors: results.filter((r) => r.consoleErrors.length > 0).length,
    networkFailures: results.filter((r) => r.networkFailures.length > 0).length,
    network404s: results.filter((r) => r.network404s.length > 0).length,
    formIssues: results.filter((r) => r.formIssues.length > 0).length,
    headingIssues: results.filter((r) => r.headingIssues.length > 0).length,
  };

  const report = { summary, results };
  const reportPath = join(OUTPUT_DIR, "audit-report.json");
  writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log("\n=== AUDIT SUMMARY ===");
  console.log(JSON.stringify(summary, null, 2));
  console.log(`\nFull report: ${reportPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
