/**
 * Amaal Telecoms — TV master catalogue duplicate audit.
 * Read-only helper. It never connects to PostgreSQL and never deletes data.
 */
const CANONICAL_BRANDS = ['TCL','Hisense','CHiQ','Samsung','LG','Global Star','Black Ark'];
const LEGACY_BRANDS = ['LG Global Star','SPJ','Smart Plus'];

function normalize(value=''){ return String(value).trim().toLowerCase(); }

function auditRows(rows = []) {
  const tv = rows.filter(r => normalize(r.product_type) === 'tv');
  const wrongBrand = tv.filter(r => !CANONICAL_BRANDS.map(normalize).includes(normalize(r.brand)));
  const legacyBrand = tv.filter(r => LEGACY_BRANDS.map(normalize).includes(normalize(r.brand)));
  const byModel = new Map();
  for (const row of tv) {
    const model = normalize(row.manufacturer_model || row.model || row.name);
    if (!model) continue;
    const list = byModel.get(model) || []; list.push(row); byModel.set(model,list);
  }
  const duplicateModels = [...byModel.entries()].filter(([,list]) => list.length > 1).map(([model,records]) => ({model,records}));
  return { tvCount: tv.length, legacyBrandCount: legacyBrand.length, legacyBrand, wrongBrandCount: wrongBrand.length, wrongBrand, duplicateModelCount: duplicateModels.length, duplicateModels };
}

export { CANONICAL_BRANDS, LEGACY_BRANDS, auditRows };
