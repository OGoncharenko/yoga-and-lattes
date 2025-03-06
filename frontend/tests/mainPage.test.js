import puppeteer from 'puppeteer';
import { expect } from 'chai';

describe('Main Page Test', () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });

  it('should load the main page and check the title', async () => {
    await page.goto('http://localhost:5173');
    const title = await page.title();
    expect(title).to.equal('Yoga & Lattes app');
  });

  it('should check for the presence of a specific element', async () => {
    await page.goto('http://localhost:5173');
    const element = await page.$('a[href="/"]');
    expect(element).to.not.be.null;
  });
});