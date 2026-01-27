#!/usr/bin/env node

import { chromium } from 'playwright';

async function captureScreenshot() {
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  const page = await context.newPage();

  try {
    console.log('Navigating to http://localhost:3000/patterns/fade-reveal...');
    await page.goto('http://localhost:3000/patterns/fade-reveal', {
      waitUntil: 'networkidle',
    });

    // Wait for GSAP animations to complete
    console.log('Waiting for GSAP animations to complete...');
    await page.waitForTimeout(1000);

    // Wait for any scroll-triggered animations by scrolling down
    console.log('Scrolling to trigger animations...');
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000);

    // Scroll back to top for full page capture
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);

    // Take full page screenshot
    console.log('Capturing full page screenshot...');
    await page.screenshot({
      path: '/tmp/fade-reveal-pattern.png',
      fullPage: true,
    });

    console.log('✅ Screenshot saved to /tmp/fade-reveal-pattern.png');

    // Get page content for description
    const title = await page.title();
    const url = page.url();

    console.log('\n📄 Page Information:');
    console.log(`   Title: ${title}`);
    console.log(`   URL: ${url}`);

    // Get main headings
    const headings = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h1, h2, h3'))
        .map(h => h.textContent?.trim())
        .filter(Boolean);
    });

    console.log('\n📋 Main Sections:');
    headings.forEach(h => console.log(`   - ${h}`));

  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

captureScreenshot().catch(console.error);
