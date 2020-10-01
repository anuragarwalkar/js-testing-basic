const { generateText, checkAndGenerate } = require('./util');
const puppeteer = require('puppeteer');

// Unit Testing with Jest
test('should output name and age', () => {
    const text = generateText('max', 29);
    expect(text).toBe('max (29 years old)');
})

test('should output invalid name and age', () => {
    const text = generateText('', null);
    expect(text).toBe(' (null years old)')
})


// Intigration Testing with Jest
test('should generate a valid text output', () => {
    const text = checkAndGenerate('max', 29);
    expect(text).toBe('max (29 years old)');
})

// E2E End To End Testing with Puppeteer
test('should click around', async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--windows-size=1920,1080']
    });

    const page = await browser.newPage();
    await page.goto('file:///C:/Users/aarwalka/Documents/projects/js-testing-introduction/index.html')
    await page.click('input#name');
    await page.type('input#name','anurag');
    await page.click('input#age');
    await page.type('input#age', '29');

    await page.click('#btnAddUser');

    const finalText = await page.$eval('.user-item', el => el.textContent)

    expect(finalText).toBe('anurag (29 years old)')
})

