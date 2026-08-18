const { chromium } = require('/opt/homebrew/lib/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  try {
    await page.goto('http://localhost:4200/network', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(5000);
    await page.screenshot({ path: __dirname + '/14-network.png', fullPage: false });
    console.log('done');
  } catch(e) {
    console.log('error: ' + e.message.slice(0,200));
  }
  await browser.close();
})();