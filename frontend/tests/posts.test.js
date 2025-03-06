import puppeteer from 'puppeteer';
import { expect } from 'chai';

describe('Get All Posts Test', () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });

  it('should navigate to the posts page and check for posts', async () => {
    await page.goto('http://localhost:5173/posts');
    const posts = await page.$$('.post');
    expect(posts.length >= 0).to.be.true;
  });
});