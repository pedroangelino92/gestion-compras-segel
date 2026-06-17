const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const s1 = `<div
        class="header"
        style="
          display: flex;
          justify-content: space-between;`;
const e1 = `      <!-- VIEW: SEGUIMIENTO -->`;

let startIndex = html.indexOf(s1);
if(startIndex === -1) {
    console.log("Could not find start");
    process.exit(1);
}

let endIndex = html.indexOf(e1);
if(endIndex === -1) {
    console.log("Could not find end");
    process.exit(1);
}

let controlsStart = html.indexOf(`<div
          class="controls"`);
let controlsEnd = html.indexOf(`</button>
        </div>
      </div>`);

if(controlsStart === -1 || controlsEnd === -1) {
    console.log("Could not find controls");
    process.exit();
}

let controlsHTML = html.substring(controlsStart, controlsEnd + 17);

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

let newHtml = html.substring(0, startIndex) + replacement + html.substring(endIndex);

let mIndex = newHtml.indexOf(`</div>
    </div>

    <!-- MODALES GLOBALES -->`);
// add the closing tags for main-content and container
newHtml = newHtml.substring(0, mIndex) + `</div>
        </div>
    </div>

    <!-- MODALES GLOBALES -->` + newHtml.substring(mIndex + 35);

fs.writeFileSync('index.html', newHtml);
console.log("Done");
