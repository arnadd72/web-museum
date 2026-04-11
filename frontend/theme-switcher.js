const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'components', 'LandingPage.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Root Variables
css = css.replace(/--neon-blue: #00d2ff;/g, '--neon-blue: #0066cc;'); // Deeper blue for white bg
css = css.replace(/--neon-green: #00ff88;/g, '--neon-green: #00a859;');
css = css.replace(/--bg-dark: #050505;/g, '--bg-dark: #f0f4f8;');
css = css.replace(/--text-main: #ffffff;/g, '--text-main: #1a202c;');

// 2. Global replacements for pure white/black where obvious
// Text that was white -> dark gray (#1a202c or similar)
// Backgrounds that were black -> white / very light
css = css.replace(/background-color: #050a10;/gi, 'background-color: #f8fafc;');
css = css.replace(/background: #000;/gi, 'background: #ffffff;');
css = css.replace(/background: #020202;/gi, 'background: #f0f4f8;'); // footer

// 3. rgba white -> dark
css = css.replace(/rgba\(255, 255, 255,/g, 'rgba(20, 30, 45,'); 
// Exceptions:
// some shadows might need to remain dark, so replacing rgba(0,0,0) could break shadows. 
// We will specifically replace the overlays.

// 4. Hero Overlay Gradients (Black to White)
css = css.replace(/rgba\(0, 0, 0, 0\.85\)/g, 'rgba(255, 255, 255, 0.9)');
css = css.replace(/rgba\(0, 0, 0, 0\.5\)/g, 'rgba(255, 255, 255, 0.7)');
css = css.replace(/rgba\(0, 0, 0, 0\.3\)/g, 'rgba(255, 255, 255, 0.4)');
css = css.replace(/rgba\(0, 0, 0, 0\.4\)/g, 'rgba(255, 255, 255, 0.5)'); // Play icon bg
css = css.replace(/rgba\(0, 0, 0, 0\.8\)/g, 'rgba(255, 255, 255, 0.9)'); // Preloader/overlays

// Preloader background
css = css.replace(/background: #000;/g, 'background: #ffffff;');

// 5. Hardcoded colors
css = css.replace(/color: #fff/gi, 'color: #1a202c');
css = css.replace(/color: #ffffff/gi, 'color: #1a202c');
css = css.replace(/color: transparent;\n  -webkit-text-stroke: 2px #fff/g, 'color: transparent;\n  -webkit-text-stroke: 2px #1a202c');

// Navbar background
// .navbar { background: rgba(255,255,255,0.9); }
css = css.replace(/\.navbar \{\n([\s\S]*?)background: rgba\(255, 255, 255, 0\.5\);/g, '.navbar {\n$1background: rgba(255, 255, 255, 0.85);');

// 6. Preview Card adjustments 
// Card hover before
css = css.replace(/background: rgba\(20, 20, 25, 0\.85\);/g, 'background: rgba(255, 255, 255, 0.9);');
// Text inside card
css = css.replace(/color: #8fa3b0;/g, 'color: #475569;'); // Muted text
css = css.replace(/color: #e0f7fa;/g, 'color: #0f172a;'); // Hover text
css = css.replace(/color: #a0aab5;/g, 'color: #334155;'); // Section desc
// Link group
css = css.replace(/color: #888;/g, 'color: #475569;');

// Feature Card
css = css.replace(/background: rgba\(20, 30, 45, 0\.02\);/g, 'background: rgba(0, 0, 0, 0.02);');
css = css.replace(/border: 1px solid rgba\(20, 30, 45, 0\.1\);/g, 'border: 1px solid rgba(0, 0, 0, 0.1);');
css = css.replace(/background: rgba\(0, 210, 255, 0\.08\);/g, 'background: #ffffff;'); // hover
// Card number
css = css.replace(/color: rgba\(20, 30, 45, 0\.05\);/g, 'color: rgba(0, 0, 0, 0.05);');

// Chatbot UI Backgrounds
css = css.replace(/background: rgba\(5, 5, 10, 0\.95\);/g, 'background: rgba(255, 255, 255, 0.95);');
css = css.replace(/background: rgba\(255, 255, 255, 0\.3\);/g, 'background: rgba(0, 0, 0, 0.05);'); // messages area

// Scroll controls and borders
css = css.replace(/rgba\(20, 30, 45, 0\.7\)/g, 'rgba(0, 0, 0, 0.7)');

// Replace stats section before
css = css.replace(/\.stats-section::before \{\n  content: "";\n  position: absolute;\n  inset: 0;\n  background: rgba\(255, 255, 255, 0\.8\);\n\}/g, '.stats-section::before {\n  content: "";\n  position: absolute;\n  inset: 0;\n  background: rgba(255, 255, 255, 0.9);\n}');

fs.writeFileSync(cssPath, css);
console.log("CSS Theme updated successfully!");
