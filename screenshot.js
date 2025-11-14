import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    product: "chrome",
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
  await page.goto(process.env.IMAGE_URL);
  await page.setViewport({ width: 480, height: 280 });
  try {
    await page.waitForSelector('img', {visible: true, timeout: 10000});
  } catch {
    console.log("Image failed to load, moving on...")
  } finally {
    await page.screenshot({
      path: "/images/dash.png",
      type: "png",
    });
    console.log("Screenshot saved!")
    await browser.close();
  }
})();
