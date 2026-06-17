const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// remove old .tab-btn
// find "/* Tabs */" all the way to "/* Tabla */" approx.
let tStart = html.indexOf('/* Tabs */');
let tEnd = html.indexOf('/* Tabla */', tStart);

if(tStart !== -1 && tEnd !== -1) {
    html = html.substring(0, tStart) + html.substring(tEnd);
}

fs.writeFileSync('index.html', html);
console.log("Old tabs css removed");
