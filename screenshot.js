import puppeteer from 'puppeteer';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pageDir = join((__dirname), 'dist/index.html');

(async () => {
    const browser = await puppeteer.launch({
        product: 'chrome', 
        executablePath: '/usr/bin/chromium-browser', 
        args: [ '--disable-web-security', 
                '--disable-features=IsolateOrigins',
                '--disable-site-isolation-trials']
    });
    const page = await browser.newPage();

    await page.goto(join('file://', pageDir));

    await page.setViewport({ width: 480, height: 280 });

    await page.locator('h2').wait()

    await page.screenshot({ path: join(__dirname, 'images/dash.png'), type: 'png' });

    await browser.close();
})();