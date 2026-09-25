const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;

console.log('Running TaskFlow Landing Page Integrity Tests...');

try {
  // 1. Verify file existence
  const filesToCheck = ['index.html', 'styles.css', 'app.js'];
  filesToCheck.forEach(file => {
    const filePath = path.join(__dirname, file);
    assert.ok(fs.existsSync(filePath), `File ${file} does not exist!`);
    console.log(`✓ Verified file existence: ${file}`);
  });

  // 2. Read contents for verification
  const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
  const cssContent = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf-8');
  const jsContent = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf-8');

  // 3. Verify HTML structure & interactive elements presence
  const criticalIDs = [
    'features',
    'demo',
    'pricing',
    'faqs',
    'footer-cta',
    'mobile-menu-btn',
    'mobile-menu',
    'signup-form',
    'newsletter-form',
    'success-alert',
    'success-alert-message',
    'billing-toggle'
  ];

  criticalIDs.forEach(id => {
    assert.ok(htmlContent.includes(`id="${id}"`) || htmlContent.includes(`id='${id}'`), `HTML is missing critical element ID: ${id}`);
    console.log(`✓ Verified critical HTML ID element: #${id}`);
  });

  // 4. Verify scripts and styles links
  assert.ok(htmlContent.includes('href="styles.css"'), 'index.html does not link styles.css correctly.');
  assert.ok(htmlContent.includes('src="app.js"'), 'index.html does not link app.js correctly.');
  console.log('✓ Verified styles and script links in index.html');

  // 5. Verify CSS styling hooks
  const criticalCSSClasses = [
    '.feature-card',
    '.glass-nav',
    '.animate-float',
    '.glow-bg',
    '.faq-content',
    '.tab-btn.active'
  ];

  criticalCSSClasses.forEach(className => {
    assert.ok(cssContent.includes(className), `CSS is missing definition for class: ${className}`);
    console.log(`✓ Verified CSS styling hook: ${className}`);
  });

  // 6. Verify JS Interaction selectors are matched
  const criticalJSQueries = [
    '.feature-card',
    'mobile-menu-btn',
    'mobile-menu',
    '.tab-btn',
    '.tab-content',
    'billing-toggle',
    'price-starter',
    'price-pro',
    '.faq-item',
    'signup-form',
    'newsletter-form',
    'success-alert'
  ];

  criticalJSQueries.forEach(query => {
    assert.ok(jsContent.includes(query), `JavaScript is missing references to: ${query}`);
    console.log(`✓ Verified JS selector association: "${query}"`);
  });

  console.log('\n🎉 ALL INTEGRITY TESTS PASSED SUCCESSFULLY! The landing page files are complete and perfectly structured.');
  process.exit(0);
} catch (error) {
  console.error('\n❌ INTEGRITY TEST FAILED:');
  console.error(error.message);
  process.exit(1);
}
