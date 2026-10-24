import puppeteer from "puppeteer-core";

const CHROME = process.env.CHROME;
if (!CHROME) {
  console.error("Usage: CHROME=$(...) npm run og");
  process.exit(2);
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--user-data-dir=/tmp/opencode/ogprofile"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
await page.goto(process.env.OG_URL ?? "http://localhost:4321/", { waitUntil: "networkidle0" });
await page.screenshot({ path: new URL("../public/og.png", import.meta.url).pathname });
await browser.close();
console.log("wrote public/og.png");
