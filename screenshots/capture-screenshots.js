/**
 * Sovereign OS Screenshot Capture Script
 * Captures 21 screenshots of every page for the sales deck.
 * Usage: node capture-screenshots.js
 */

const { chromium } = require('playwright');
const path = require('path');

const BASE = 'http://localhost:4200';
const OUT = __dirname;

const pages = [
  { path: '/', name: '01-dashboard' },
  { path: '/chat', name: '02-ai-chat' },
  { path: '/search', name: '03-search' },
  { path: '/agent', name: '04-ai-agent' },
  { path: '/models', name: '05-models' },
  { path: '/creative', name: '06-creative' },
  { path: '/companion', name: '07-life-companion' },
  { path: '/store', name: '08-app-store' },
  { path: '/workflows', name: '09-workflows' },
  { path: '/fleet', name: '10-fleet' },
  { path: '/security', name: '11-security' },
  { path: '/knowledge', name: '12-knowledge' },
  { path: '/environment', name: '13-environment' },
  { path: '/network', name: '14-network' },
  { path: '/clients', name: '15-clients' },
  { path: '/audit', name: '16-audit' },
  { path: '/files', name: '17-files' },
  { path: '/passwords', name: '18-passwords' },
  { path: '/media', name: '19-media' },
  { path: '/photos', name: '20-photos' },
  { path: '/pdf', name: '21-pdf-tools' },
  { path: '/printer', name: '22-printer-doctor' },
  { path: '/apps', name: '23-app-gallery' },
  { path: '/settings', name: '24-settings' },
  { path: '/setup', name: '25-setup-wizard' },
  { path: '/cloud', name: '26-cloud' },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  let success = 0;
  let failed = [];

  for (const p of pages) {
    const url = `${BASE}${p.path}`;
    const filename = path.join(OUT, `${p.name}.png`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      // Wait a bit for client-side rendering
      await page.waitForTimeout(2000);
      await page.screenshot({ path: filename, fullPage: false });
      console.log(`✅ ${p.name}.png — ${p.path}`);
      success++;
    } catch (err) {
      console.log(`❌ ${p.name} — ${err.message}`);
      failed.push(p.name);
    }
  }

  await browser.close();
  console.log(`\n=== RESULTS: ${success}/${pages.length} captured ===`);
  if (failed.length > 0) {
    console.log(`FAILED: ${failed.join(', ')}`);
  }
})();