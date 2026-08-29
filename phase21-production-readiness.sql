-- Amaal Telecoms Phase 21 read-only production readiness queries.
-- Do not execute DDL/DML from this file against production.
SELECT version();
SELECT COUNT(*) AS public_tables FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';
SELECT COUNT(*) AS public_views FROM information_schema.views WHERE table_schema='public';
SELECT COUNT(*) AS public_functions FROM information_schema.routines WHERE routine_schema='public';
SELECT COUNT(*) AS public_triggers FROM information_schema.triggers WHERE trigger_schema='public';
SELECT COUNT(*) AS foreign_keys FROM information_schema.table_constraints WHERE constraint_schema='public' AND constraint_type='FOREIGN KEY';
SELECT COUNT(*) AS public_indexes FROM pg_indexes WHERE schemaname='public';
SELECT COUNT(*) AS permissions FROM permissions;
SELECT COUNT(*) AS roles FROM roles;
SELECT COUNT(*) AS active_users FROM users WHERE status='Active';
SELECT COUNT(*) AS products FROM products;
SELECT COUNT(*) AS variants FROM product_variants;
SELECT COUNT(*) AS customers FROM customers;
SELECT COUNT(*) AS orders FROM orders;
SELECT COUNT(*) AS sales FROM sales;
SELECT COUNT(*) AS inventory_balances FROM inventory_balances;
SELECT COUNT(*) AS serialized_units FROM serialized_units;
SELECT COUNT(*) AS finance_journals FROM finance_journals;
SELECT COUNT(*) AS returns FROM return_requests;
SELECT COUNT(*) AS warranty_claims FROM warranty_claims;
SELECT COUNT(*) AS repair_jobs FROM repair_jobs;
SELECT COUNT(*) AS audit_logs FROM audit_logs;
SELECT COUNT(*) AS security_events FROM security_events;
