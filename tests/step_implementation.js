/* globals gauge*/
"use strict";
const puppeteer = require('puppeteer');
const assert = require("assert");

var page;
var browser;

beforeSuite(async function () {
  browser = await puppeteer.launch({headless: false});
  page = await browser.newPage();
});

afterSuite(async function () {
  browser.close();
});

step("googleを開く", async function () {
  await page.goto('https://www.google.com');
});

step("検索する", async function () {
  await page.type("input[title=\"検索\"]", "abc", {delay: 100000000});
  await page.screenshot({path: 'screenShotPage.png'});
  await page.click('input[name="btnK"]')
});

step("Show subtitle <title>", async function(title){
  await page.waitFor('.page-header h1');
  const message = await page.$eval('.page-header h1', e => e.innerText);
  assert.strictEqual(message, title);
});