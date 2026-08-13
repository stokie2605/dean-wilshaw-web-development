const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080 });

  console.log('Screenshotting Engine 01...');
  await page.goto('file://C:/Users/Wilshaw/Desktop/stitch-trades-exports/engine-01/code.html');
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(__dirname, 'public/mockups/engine-01-football.png'), fullPage: true });

  console.log('Screenshotting Engine 02...');
  await page.goto('file://C:/Users/Wilshaw/Desktop/stitch-trades-exports/engine-02/code.html');
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(__dirname, 'public/mockups/engine-02-gaming.png'), fullPage: true });

  console.log('Screenshotting Engine 03...');
  await page.goto('file://C:/Users/Wilshaw/Desktop/stitch-trades-exports/engine-03/stitch_minimalist_terracotta_portfolio/editorial_portfolio_landing_page/code.html');
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(__dirname, 'public/mockups/engine-03-editorial.png'), fullPage: true });

  await browser.close();
  console.log('Done!');
})();
