const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

let containerIndex = html.indexOf('<div class="container" id="app-container"');

let headerStart = html.indexOf('<div\\n        class="header"', containerIndex);
let controlsStart = html.indexOf('<div\\n          class="controls"', headerStart);
let controlsEnd = html.indexOf('</button>\\n        </div>', controlsStart);

let controlsHTML = html.substring(controlsStart, controlsEnd + 24);

let viewSeguimiento = html.indexOf('<!-- VIEW: SEGUIMIENTO -->', containerIndex);

let replacement = `      <div class="sidebar">
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
          ${controlsHTML}
        </div>
        <div class="content-body">
`;

// Replace from `<div class="header"` to `<!-- VIEW: SEGUIMIENTO -->`
html = html.substring(0, headerStart) + replacement + html.substring(viewSeguimiento);

// We must also insert two closing divs before the script tags or modales globales.
// Since container opened the app-container, and we have main-content and content-body inside, it means we need two MORE closing divs than before.
// We can just add them right before `<!-- MODALES GLOBALES -->`
let modales = html.indexOf('<!-- MODALES GLOBALES -->');
html = html.substring(0, modales) + "\\n      </div>\\n      </div>\\n\\n    " + html.substring(modales);

fs.writeFileSync('index.html', html);
console.log("Success");
