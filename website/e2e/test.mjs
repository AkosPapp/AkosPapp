import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const DIST = path.join(import.meta.dirname, "..", "dist");
const SHOTS = path.join(import.meta.dirname, "shots");
const CHROME = process.env.CHROME;
if (!CHROME) {
  console.error(
    "Usage: CHROME=$(nix shell nixpkgs#chromium --command sh -c 'command -v chromium') npm run test:e2e"
  );
  process.exit(2);
}
if (!fs.existsSync(path.join(DIST, "index.html"))) {
  console.error("dist/ not built — run `npm run build` first");
  process.exit(2);
}

const MIME = {
  ".html": "text/html",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  let file = path.join(DIST, url);
  if (file.endsWith("/")) file += "index.html";
  let status = 200;
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    file = path.join(DIST, "404.html");
    status = 404;
  }
  res.writeHead(status, {
    "content-type": MIME[path.extname(file)] ?? "application/octet-stream",
  });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}`;

let failures = 0;
let checks = 0;
const ok = (cond, msg) => {
  checks++;
  if (!cond) {
    failures++;
    console.log(`  FAIL  ${msg}`);
  }
};

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", `--user-data-dir=${path.join(SHOTS, "..", "profile")}`],
});

const PAGES = [
  { path: "/", name: "home", hasH1: "Akos Papp." },
  { path: "/competitions/", name: "competitions", hasH1: "Competitions" },
  { path: "/projects/", name: "projects", hasH1: "Projects" },
  { path: "/about/", name: "about", hasH1: "About" },
];

fs.mkdirSync(SHOTS, { recursive: true });

for (const p of PAGES) {
  console.log(`\n== ${p.path}`);
  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
  page.on("pageerror", (e) => consoleErrors.push(String(e)));
  page.on("requestfailed", (r) => consoleErrors.push(`requestfailed ${r.url()}`));

  const resp = await page.goto(BASE + p.path, { waitUntil: "networkidle0" });
  ok(resp.status() === 200, `${p.path} -> HTTP ${resp.status()}`);

  const info = await page.evaluate(() => {
    const links = [...document.querySelectorAll("a")].map((a) => ({
      href: a.getAttribute("href"),
      text: a.textContent.trim(),
    }));
    return {
      title: document.title,
      lang: document.documentElement.lang,
      meta: document.querySelector('meta[name="description"]')?.content ?? "",
      h1s: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()),
      links,
      imgs: [...document.querySelectorAll("img")].map((i) => i.getAttribute("src")),
    };
  });

  ok(info.lang === "en", "lang=en");
  ok(info.title.length > 0, "has <title>");
  ok(info.meta.length > 0, "has meta description");
  ok(info.h1s.length === 1, `exactly one h1 (got ${info.h1s.length})`);
  ok(info.h1s[0] === p.hasH1, `h1 is "${p.hasH1}" (got "${info.h1s[0]}")`);
  ok(consoleErrors.length === 0, `no console errors (${consoleErrors.join("; ")})`);

  const internal = info.links.filter((l) => l.href?.startsWith("/"));
  const external = info.links.filter((l) => l.href?.startsWith("http"));
  for (const l of internal) {
    const target = l.href.endsWith("/")
      ? path.join(DIST, l.href, "index.html")
      : path.join(DIST, l.href);
    ok(fs.existsSync(target), `internal link resolves: ${l.href}`);
    ok(l.text.length > 0, `link has text: ${l.href}`);
  }
  for (const l of external) {
    ok(/^https:\/\//.test(l.href), `external over https: ${l.href}`);
  }
  for (const i of info.imgs) {
    ok(fs.existsSync(path.join(DIST, i)), `img exists: ${i}`);
  }
  console.log(`  links: ${internal.length} internal, ${external.length} external`);

  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);
  const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const rgb = darkBg.match(/\d+/g).map(Number);
  ok(rgb[0] < 40 && rgb[1] < 40 && rgb[2] < 40, `dark mode bg is dark (${darkBg})`);
  await page.screenshot({ path: `${SHOTS}/${p.name}-dark.png`, fullPage: true });

  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
  await page.setViewport({ width: 1280, height: 900 });
  await page.screenshot({ path: `${SHOTS}/${p.name}-light.png`, fullPage: true });

  await page.setViewport({ width: 390, height: 844, isMobile: true });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  ok(overflow <= 1, `no horizontal overflow at 390px (${overflow}px)`);
  await page.screenshot({ path: `${SHOTS}/${p.name}-mobile.png`, fullPage: true });

  await page.close();
}

console.log("\n== navigation");
const navPage = await browser.newPage();
await navPage.goto(BASE + "/", { waitUntil: "networkidle0" });
for (const [label, target] of [
  ["Competitions", "/competitions/"],
  ["Projects", "/projects/"],
  ["About", "/about/"],
  ["Home", "/"],
]) {
  await Promise.all([
    navPage.waitForNavigation({ waitUntil: "networkidle0" }),
    navPage.evaluate((t) => {
      [...document.querySelectorAll("header nav a")]
        .find((a) => a.textContent.trim() === t)
        .click();
    }, label),
  ]);
  ok(navPage.url().endsWith(target), `nav "${label}" -> ${target}`);
  const current = await navPage.evaluate(
    () => document.querySelector('header nav a[aria-current="page"]')?.textContent?.trim()
  );
  ok(current === label, `nav "${label}" marked aria-current (got ${current})`);
}
await navPage.close();

console.log("\n== 404");
const page404 = await browser.newPage();
const r404 = await page404.goto(BASE + "/does-not-exist/", { waitUntil: "networkidle0" });
ok(r404.status() === 404, `unknown route -> 404 (got ${r404.status()})`);
const t404 = await page404.$eval("h1", (h) => h.textContent);
ok(t404.includes("404"), `404 page renders h1 (got ${t404})`);
await page404.close();

console.log("\n== static assets");
for (const [asset, expect] of [
  ["/robots.txt", "Sitemap: https://akosp.app/sitemap.xml"],
  ["/sitemap.xml", "https://akosp.app/competitions/"],
]) {
  const r = await fetch(BASE + asset);
  const body = await r.text();
  ok(r.status === 200 && body.includes(expect), `${asset} served correctly`);
}

await browser.close();
server.close();

console.log(`\n${checks - failures}/${checks} checks passed`);
process.exit(failures ? 1 : 0);
