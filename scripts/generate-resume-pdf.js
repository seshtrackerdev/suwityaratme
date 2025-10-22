const puppeteer = require('puppeteer');
const path = require('path');

async function generateResumePDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport to match your design
  await page.setViewport({
    width: 1200,
    height: 800,
    deviceScaleFactor: 2 // Higher quality
  });
  
  // Navigate to your site (adjust URL as needed)
  await page.goto('http://localhost:5173', { 
    waitUntil: 'networkidle0' 
  });
  
  // Wait for animations to complete
  await page.waitForTimeout(2000);
  
  // Generate PDF with your exact styling
  const pdf = await page.pdf({
    path: 'public/Timothy_Suwityarat_Resume_Web.pdf',
    format: 'A4',
    printBackground: true, // Keep colors and backgrounds
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    },
    preferCSSPageSize: true,
    displayHeaderFooter: false
  });
  
  await browser.close();
  console.log('PDF generated successfully!');
}

generateResumePDF().catch(console.error);
