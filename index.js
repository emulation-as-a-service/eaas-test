#!/usr/bin/env node
const { chromium } = require('playwright');
const { argv, env } = require("process");

const [ domain ] = argv.slice(2);
const { HEADLESS } = env;

const origin = new URL(domain).origin;

const timeout = time_ms => new Promise(r => setTimeout(r, time_ms));

(async () => {
  const browser = await chromium.launch({
    headless: Boolean(HEADLESS),
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`${origin}/admin/`);
  await page.goto(`${origin}/admin/#/admin/dashboard`);
  await page.getByRole('link', { name: 'Environments' }).click();
  await page.getByRole('link', { name: 'Administration' }).click();
  await page.getByRole('link', { name: 'Manage Emulators Emulators' }).click();
  await page.getByRole('row', { name: 'qemu-system 0 install latest Details' }).getByRole('link', { name: 'install latest' }).click();
  await page.getByRole('link', { name: 'Images' }).click({ timeout: 300_000 });
  await page.getByRole('button', { name: '+ New Image' }).click();
  await page.getByLabel('Disk image label:').click();
  await page.getByLabel('Disk image label:').fill('elephan-dos');
  await page.getByText('Import image').click();
  await page.getByPlaceholder('http://').click();
  await page.getByPlaceholder('http://').fill('https://github.com/rafaelgieschke/elephan-dos/raw/main/elephan-dos');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('link', { name: 'Environments' }).click();
  await page.getByRole('button', { name: '+ Create Environment' }).click();
  await page.getByRole('button', { name: 'Linux' }).click();
  await page.getByLabel('Machine Name').fill('elphan-dos');
  await page.getByTitle('Search or choose a system...').locator('span').first().click();
  await page.getByRole('link', { name: 'Debian/Ubuntu' }).click();
  await page.getByPlaceholder('​​​​​​​​ MB').click();
  await page.getByPlaceholder('​​​​​​​​ MB').fill('10​​​​​ MB');
  await page.locator('.main-container > div:nth-child(2)').click();
  await page.locator('div:has(> input)').filter({ hasText: 'XPRA Video (Experimental)' }).getByRole('checkbox').check();
  await page.locator('div:has(> input)').filter({ hasText: 'XPRA Video (Experimental) png jpeg auto' }).getByRole('checkbox').uncheck();
  await page.locator('div:has(> input)').filter({ hasText: 'XPRA Video (Experimental)' }).getByRole('checkbox').check();
  await page.locator('div:has(> input)').filter({ hasText: 'WebRTC Audio (Beta)' }).getByRole('checkbox').check();
  await page.getByRole('listitem').filter({ hasText: 'Drive Type: disk empty drive boot drive' }).locator('i').click();
  await page.getByText('Select from disk image library').click();
  await page.getByTitle('Select disk image').locator('span').first().click();
  await page.getByRole('link', { name: 'elephan-dos' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Choose action' }).click();
  await page.getByText('Run Environment').click();

  await timeout(25_000);
  await page.screenshot({ path: "environment.png" });

  // ---------------------
  await context.close();
  await browser.close();
})();
