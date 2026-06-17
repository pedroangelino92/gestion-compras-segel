const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Find controls
let controlsMatch = html.match(/<div\s+class="controls"[\s\S]*?<\/button>\s*<\/div>\s*<\/div>/);
if (!controlsMatch) { throw new Error("No controls"); }
let controlsHTML = controlsMatch[0];

// 2. Find the whole header+tabs region: from `<div class="container" id="app-container" style="display: none">`
// to the start of `<!-- VIEW: SEGUIMIENTO -->`
let containerRegex = /<div class="container" id="app-container" style="display: none">[\s\S]*?<!-- VIEW: SEGUIMIENTO -->/;

let replacement = `<div class="container" id="app-container" style="display: none">
      <div class="sidebar">
        <div class="sidebar-logo">
          <div style="display: flex; align-items: center; gap: 12px">
            <img src="logo.png" alt="Logo" onerror="this.style.display = 'none'" style="height: 32px; width: auto; object-fit: contain;" />
            <div>
              <div style="font-size: 1.2rem; font-weight: 800; color: var(--gray-900); line-height: 1.2;">Segel S.A.</div>
              <div style="font-size: 0.75rem; color: var(--gray-500); font-weight: 600; text-transform: uppercase;">Gestión Compras</div>
            </div>
          </div>
        </div>
        <div class="sidebar-nav" id="sidebar-nav">
          <button type="button" class="tab-btn active" id="tab-btn-seguimiento" onclick="window.switchTab('seguimiento')">📋 Seguimiento Maestro</button>
          <button type="button" class="tab-btn" id="tab-btn-nuevo" onclick="window.switchTab('nuevo')">➕ Cargar Ticket</button>
          <button type="button" class="tab-btn" id="tab-btn-finanzas" onclick="window.switchTab('finanzas'); window.renderFinanzas();">💰 Finanzas</button>
          <button type="button" class="tab-btn" id="tab-btn-proveedores" onclick="window.switchTab('proveedores'); window.renderProveedores();">👥 Proveedores</button>
          <button type="button" class="tab-btn" id="tab-btn-dashboard" style="display: none" onclick="window.switchTab('dashboard'); window.renderDashboard();">📊 Análisis y Rendimiento</button>
          <button type="button" class="tab-btn" id="tab-btn-usuarios" style="display: none" onclick="window.switchTab('usuarios')">🛡️ Usuarios y Permisos</button>
          <button type="button" class="tab-btn" id="tab-btn-eliminados" style="display: none; color: var(--red)" onclick="window.switchTab('eliminados')">🗑️ Historial Eliminados</button>
        </div>
      </div>
      
      <div class="main-content">
        <div class="main-header">
          <div></div>
          ${controlsHTML.replace('<div\n        class="controls"', '<div class="controls"').replace(/<\/div>\s*<\/div>$/, '</div>')}
        </div>
        <div class="content-body">
      <!-- VIEW: SEGUIMIENTO -->`;

html = html.replace(containerRegex, replacement);

// Add the two closing divs before <!-- MODALES GLOBALES -->
html = html.replace('<!-- MODALES GLOBALES -->', '</div>\n      </div>\n\n    <!-- MODALES GLOBALES -->');

fs.writeFileSync('index.html', html);
console.log("Success");
