import puppeteer from "puppeteer";
import { join } from "node:path";
import { setTimeout } from "node:timers/promises";

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
  await page.goto("http://<hostname>:6173");
  await page.setViewport({ width: 480, height: 280 });
  await setTimeout(10000);
  await page.screenshot({
    path: join(__dirname, "images/dash.png"),
    type: "png",
  });
  await browser.close();
})();
