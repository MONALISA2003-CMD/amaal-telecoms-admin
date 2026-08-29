-- PHASE 21 DEEP BI AUDIT — READ ONLY
-- Run against production/staging. No mutations.
SELECT 'sales' section, count(*)::bigint records, COALESCE(sum(grand_total),0)::numeric amount FROM sales WHERE status='Completed'
UNION ALL SELECT 'sale_payments',count(*),COALESCE(sum(sp.amount),0) FROM sale_payments sp JOIN sales s ON s.id=sp.sale_id WHERE s.status='Completed'
UNION ALL SELECT 'inventory',count(*),COALESCE(sum(on_hand),0) FROM inventory_balances
UNION ALL SELECT 'credit',count(*),COALESCE(sum(outstanding_principal),0) FROM credit_accounts WHERE status IN ('Active','Defaulted','Restructured')
UNION ALL SELECT 'delivery',count(*),COALESCE(sum(unit_count),0) FROM delivery_shipments
UNION ALL SELECT 'customers',count(*),0 FROM customers;

-- Sales/payment reconciliation: expected zero rows.
SELECT s.sale_no,s.grand_total,COALESCE(sum(sp.amount),0) payment_total
FROM sales s LEFT JOIN sale_payments sp ON sp.sale_id=s.id
WHERE s.status='Completed'
GROUP BY s.id,s.sale_no,s.grand_total
HAVING COALESCE(sum(sp.amount),0)<>s.grand_total;

-- Posted journal balance: expected zero rows.
SELECT j.journal_no,COALESCE(sum(l.debit),0) debits,COALESCE(sum(l.credit),0) credits
FROM finance_journals j JOIN finance_journal_lines l ON l.journal_id=j.id
WHERE j.status='Posted'
GROUP BY j.id,j.journal_no
HAVING COALESCE(sum(l.debit),0)<>COALESCE(sum(l.credit),0);

-- Serialized-unit provenance: expected zero rows.
SELECT s.serial_number,s.imei1,s.id
FROM serialized_units s
WHERE NOT EXISTS (SELECT 1 FROM inventory_batches b WHERE b.id=s.batch_id);

-- Sold units must not retain a physical warehouse location: expected zero rows.
SELECT s.serial_number,s.status,s.location_id
FROM serialized_units s
WHERE s.status='Sold' AND s.location_id IS NOT NULL;

-- Website management activity is derived from real records; zero is valid when no web records exist.
SELECT
 (SELECT count(*) FROM web_sites WHERE status='Active') active_sites,
 (SELECT count(*) FROM web_pages WHERE status='Published') published_pages,
 (SELECT count(*) FROM web_banners WHERE status='Published') published_banners,
 (SELECT count(*) FROM web_content_blocks WHERE status='Published') published_blocks,
 (SELECT count(*) FROM web_publish_queue WHERE status IN ('Pending','Approved')) pending_publications,
 (SELECT count(*) FROM web_publish_releases WHERE status='Published') published_releases;
