import { Request, Response } from "express";
import puppeteer from "puppeteer";

const scrapeLogic = async (req: Request, res: Response) => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    // Navigate the page to a URL.
    await page.goto("https://developer.chrome.com/");

    // Set screen size.
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box.
    await page
      .locator(".devsite-search-field")
      .fill("automate beyond recorder");

    // Wait and click on first result.
    await page.locator(".devsite-result-item-link").click();

    // Locate the full title with a unique string.
    const textSelector = await page
      .locator("text/Customize and automate")
      .waitHandle();
    const fullTitle = await textSelector?.evaluate((el) => el.textContent);

    // Print the full title.
    console.log('The title of this blog post is "%s".', fullTitle);

    res.send(`Render Puppeteer: ${fullTitle}`);
  } catch (error) {
    console.log(error);
    res.send(`Something went wrong while running Puppeteer ${error}`);
  } finally {
    await browser.close();
  }
};

export default {
  scrapeLogic,
};
