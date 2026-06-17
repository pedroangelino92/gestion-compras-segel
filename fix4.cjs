const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace .container css
let contStart = html.indexOf('.container {');
let contEnd = html.indexOf('}', contStart);

let oldContainer = html.substring(contStart, contEnd + 1);
let newContainer = `.container {
    display: flex;
    min-height: 100vh;
    width: 100%;
    max-width: none;
    margin: 0;
    padding: 0;
    background: var(--bg);
    animation: fadeIn 0.4s ease;
}`;

html = html.replace(oldContainer, newContainer);

let insertionCSS = `
      .sidebar {
        width: 260px;
        background: var(--surface);
        border-right: 1px solid var(--border);
        display: flex;
        flex-direction: column;
        height: 100vh;
        position: sticky;
        top: 0;
        z-index: 50;
      }
      .sidebar-logo {
        padding: 24px;
        border-bottom: 1px solid var(--border);
      }
      .sidebar-nav {
        flex: 1;
        overflow-y: auto;
        padding: 24px 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .tab-btn {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        font-size: 0.95rem;
        font-weight: 500;
        color: var(--gray-500);
        background: transparent;
        border: none;
        border-radius: var(--radius);
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
        width: 100%;
      }
      .tab-btn:hover {
        background: var(--gray-50);
        color: var(--gray-900);
      }
      .tab-btn.active {
        background: var(--primary-light);
        color: var(--primary);
        font-weight: 600;
      }
      .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .main-header {
        height: 80px;
        padding: 0 32px;
        background: var(--surface);
        border-bottom: 1px solid var(--border);
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        top: 0;
        z-index: 40;
      }
      .content-body {
        padding: 32px;
        max-width: 1600px;
        width: 100%;
        margin: 0 auto;
      }
`;

// Also I need to remove old .header and .tabs styles if I want, but I can just append my new styles before `</style>`
html = html.replace('</style>', insertionCSS + '\\n    </style>');

fs.writeFileSync('index.html', html);
console.log("CSS injected");
