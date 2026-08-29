import pg from 'pg';
const { Pool } = pg;

const requiredTables = [
  'products','product_variants','brands','product_categories',
  'purchase_orders','goods_receipts','goods_receipt_lines',
  'inventory_batches','inventory_locations','inventory_balances','inventory_reservations',
  'serialized_units','serialized_unit_status_history',
  'orders','order_lines','order_serial_units','order_fulfillments',
  'sales','sale_lines','sale_serial_units',
  'delivery_shipments','delivery_shipment_serial_units',
  'return_requests','return_lines','warranty_claims','repair_jobs',
  'customers','suppliers','finance_journals','finance_journal_lines',
  'audit_logs','users','roles','permissions'
];

const requiredColumns = {
  products: ['id','name','slug','brand_id','category_id','status','website_visibility'],
  product_variants: ['id','product_id','sku','barcode','serialized','track_inventory','selling_price'],
  inventory_batches: ['id','batch_number','variant_id','location_id','quantity_received','received_at'],
  serialized_units: ['id','variant_id','location_id','serial_number','imei1','imei2','status','batch_id','barcode','qr_code'],
  order_serial_units: ['id','order_line_id','serialized_unit_id'],
  sale_serial_units: ['sale_line_id','serialized_unit_id'],
  delivery_shipment_serial_units: ['id','shipment_id','serialized_unit_id','order_serial_unit_id'],
};

const requiredTriggers = ['trg_serialized_unit_lifecycle','trg_serialized_unit_transition'];

function out(status, message, extra={}) {
  console.log(JSON.stringify({ audit: 'schema-reconciliation', status, message, ...extra }, null, 2));
}

if (!process.env.DATABASE_URL) {
  out('UNVERIFIED', 'DATABASE_URL is not available; source-side reconciliation checks are defined but require a live database connection.', {requiredTables: requiredTables.length, requiredTriggers});
  process.exit(0);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined });
try {
  const tableRows = await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'`);
  const tables = new Set(tableRows.rows.map(r => r.table_name));
  const missingTables = requiredTables.filter(t => !tables.has(t));

  const missingColumns = [];
  for (const [table, columns] of Object.entries(requiredColumns)) {
    const r = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name=$1`, [table]);
    const have = new Set(r.rows.map(x => x.column_name));
    for (const column of columns) if (!have.has(column)) missingColumns.push(`${table}.${column}`);
  }

  const triggerRows = await pool.query(`SELECT tgname FROM pg_trigger tg JOIN pg_class c ON c.oid=tg.tgrelid JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='public' AND NOT tg.tgisinternal`);
  const triggers = new Set(triggerRows.rows.map(r => r.tgname));
  const missingTriggers = requiredTriggers.filter(t => !triggers.has(t));

  const status = missingTables.length || missingColumns.length || missingTriggers.length ? 'FAIL' : 'PASS';
  out(status, status === 'PASS' ? 'Critical business schema baseline is present.' : 'Critical business schema baseline is incomplete.', {
    publicTableCount: tables.size,
    missingTables,
    missingColumns,
    missingTriggers
  });
} catch (error) {
  out('ERROR', error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
