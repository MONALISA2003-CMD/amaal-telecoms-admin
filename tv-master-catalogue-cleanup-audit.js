/**
 * Amaal Telecoms — TV master catalogue duplicate audit.
 *
 * This is deliberately read-only. It reports legacy generic TV slugs that
 * must no longer be treated as canonical after MASTER_TELEVISION_PRODUCT_CATALOG v1.0.
 * It does not connect to PostgreSQL or delete data.
 */
const LEGACY_GENERIC_TV_SLUGS = [
  ...['tcl','hisense','samsung','lg-global-star','spj','chiq','smart-plus'].flatMap(brand =>
    ['32','43','50','55','65','75'].map(size => `${brand}-${size}-inch-tv`)
  )
];

const CANONICAL_BRANDS = ['TCL','Hisense','CHiQ','Samsung','LG','Global Star','Black Ark'];

function auditRows(rows = []) {
  const legacy = rows.filter(row => LEGACY_GENERIC_TV_SLUGS.includes(String(row.slug || '').toLowerCase()));
  const canonicalBrandSet = new Set(CANONICAL_BRANDS.map(v => v.toLowerCase()));
  const wrongBrand = rows.filter(row => row.product_type === 'TV' && row.brand && !canonicalBrandSet.has(String(row.brand).toLowerCase()));
  return { legacyCount: legacy.length, legacy, wrongBrandCount: wrongBrand.length, wrongBrand };
}

export { LEGACY_GENERIC_TV_SLUGS, CANONICAL_BRANDS, auditRows };
