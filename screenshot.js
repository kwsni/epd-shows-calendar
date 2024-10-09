import puppeteer from "puppeteer";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { setTimeout } from "node:timers/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pageDir = join(__dirname, "dist/index.html");

(async () => {
  const browser = await puppeteer.launch({
    product: "chrome",
    executablePath: "/usr/bin/chromium-browser",
    args: [
      "--disable-web-security",
      "--ignore-certificate-errors",
      "--disable-features=IsolateOrigins",
      "--disable-site-isolation-trials",
    ],
  });
  const page = await browser.newPage();
  page
    .on('console', message =>
      console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
    .on('pageerror', ({ message }) => console.log(message))
    .on('response', response =>
      console.log(`${response.status()} ${response.url()}`))
    .on('requestfailed', request =>
      console.log(`${request.failure().errorText} ${request.url()}`))
      
  await page.setBypassCSP(true);
  await page.goto(join("file://", pageDir));
  await page.setViewport({ width: 480, height: 280 });
  await setTimeout(10000);
  await page.screenshot({
    path: join(__dirname, "images/dash.png"),
    type: "png",
  });
  await browser.close();
})();
