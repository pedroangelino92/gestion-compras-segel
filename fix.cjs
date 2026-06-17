const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The file currently has a corrupted first "app-container" at line 1523, 
// then "modal-proveedor", "login-view", "loading-overlay", 
// and then the REAL "app-container" at line 1765.
// Let's find the start of the first corrupted 'app-container'
let firstContainer = html.indexOf('<div class="container" id="app-container"');

// And the start of modal-proveedor
let modalProv = html.indexOf('<div\\n      id="modal-proveedor"');

// Remove the corrupted first app-container:
if (modalProv > firstContainer) {
    html = html.substring(0, firstContainer) + html.substring(modalProv);
}

// Now let's find the real "app-container"
let realContainer = html.indexOf('<div class="container" id="app-container"');

let headerStart = html.indexOf('<div\\n        class="header"', realContainer);
let tabsStart = html.indexOf('<div class="tabs">', realContainer);
let viewSeguimiento = html.indexOf('<!-- VIEW: SEGUIMIENTO -->', realContainer);

let controlsHTML = `          <div class="controls" style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
            <div id="notif-container" style="position: relative">
              <button type="button" class="btn-outline btn-icon" onclick="window.toggleNotifMenu()" style="position: relative; font-size: 1.2rem; border-color: transparent;" title="Notificaciones">
                🔔
                <span id="notif-badge" style="display: none; position: absolute; top: -4px; right: -4px; background: var(--red); color: white; font-size: 0.65rem; font-weight: 700; border-radius: 12px; padding: 2px 6px;">0</span>
              </button>
              <div id="notif-dropdown" style="display: none; flex-direction: column; position: absolute; right: 0; top: 45px; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); border-radius: var(--radius); width: 320px; max-height: 400px; overflow-y: auto; z-index: 100;">
                <div style="padding: 12px 16px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: var(--surface); z-index: 2;">
                  <h4 style="margin: 0; font-size: 0.95rem; font-weight: 600; color: var(--gray-900);">Notificaciones</h4>
                  <button onclick="window.marcarTodasLeidas()" style="background: none; border: none; color: var(--primary); font-size: 0.8rem; cursor: pointer; font-weight: 600; padding: 0;">Marcar leídas</button>
                </div>
                <div id="notif-list" style="display: flex; flex-direction: column">
                  <p style="padding: 16px; margin: 0; text-align: center; color: var(--gray-500); font-size: 0.85rem;">No tienes nuevas notificaciones.</p>
                </div>
              </div>
            </div>

            <div class="user-profile">
              <img id="user-profile-img" src="" alt="" />
              <div class="user-info">
                <span class="user-name" id="user-profile-name">...</span>
                <span class="user-role" id="user-profile-role">...</span>
              </div>
            </div>
            <button type="button" class="btn-outline btn-icon" onclick="window.toggleThemeUI()" title="Alternar Modo Oscuro" style="font-size: 1rem">🌓</button>
            <div style="display: flex; gap: 4px;">
              <button type="button" id="btn-exportar-excel" class="btn-outline" style="border-color: var(--green); color: var(--green); font-weight: 600;" onclick="window.exportToExcel()" title="Exportar a Excel (.xlsx)">📊 Exportar Excel</button>
              <button type="button" class="btn-outline" style="opacity: 0.6; font-size: 0.75rem; padding: 4px 8px;" onclick="window.exportToCSV()" title="Exportación CSV Legacy">CSV</button>
            </div>
            <button type="button" class="btn-danger" onclick="window.logout()">Salir</button>
          </div>`;

let replacement = `<div class="sidebar">
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

html = html.substring(0, headerStart) + replacement + html.substring(viewSeguimiento);

// Clean up extra unbalanced divs at the end from previous bad replace if they exist.
// We should make sure we have exactly 2 closing divs after the views.
// We'll search for "<!-- MODALES GLOBALES -->" and guarantee the divs before it.

let modalsIndex = html.indexOf('<!-- MODALES GLOBALES -->');
if (modalsIndex !== -1) {
    // Strip any closing divs right before it and replace with correct amount:
    let beforeModals = html.substring(0, modalsIndex);
    beforeModals = beforeModals.replace(/<\/div>\s*$/g, '').replace(/<\/div>\s*$/g, '').replace(/<\/div>\s*$/g, '').replace(/<\/div>\s*$/g, '');
    html = beforeModals + "\n        </div>\n      </div>\n    </div>\n\n    <!-- MODALES GLOBALES -->" + html.substring(modalsIndex + 25);
}

fs.writeFileSync('index.html', html);
console.log("Fixed HTML");
