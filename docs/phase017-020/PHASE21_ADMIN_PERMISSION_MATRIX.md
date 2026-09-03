# Phase 21 — Admin/Superadmin Permission Matrix

Generated: 2026-09-02T19:11:00.332Z

Legend: Create/Execute = POST mutation, Edit = PUT/PATCH, Delete/Archive = DELETE, Reverse/Void = explicit reversal permission, Export = data export, View = read access. Super Admin is system-wide and receives the complete permission registry; Administrator receives the operational registry excluding the two intentionally Super-Admin-only controls defined by the source bootstrap.

| Permission | Capability | Backend routes | Actions | UI exposed |
|---|---|---:|---|---|
| dashboard.view | View dashboard | 1 | View | Backend-only / contextual |
| search.view | Use global search | 0 | UI/permission only | Backend-only / contextual |
| staff.view | View staff | 2 | View | Backend-only / contextual |
| staff.manage | Manage staff | 6 | Manage, Create/Execute, Edit | Yes |
| roles.view | View roles | 3 | View | Backend-only / contextual |
| roles.manage | Manage roles | 3 | Create/Execute, Edit, Delete/Archive | Yes |
| branches.view | View branches | 1 | View | Backend-only / contextual |
| branches.manage | Manage branches | 2 | Create/Execute, Edit | Backend-only / contextual |
| settings.view | View settings | 2 | View | Backend-only / contextual |
| settings.manage | Manage settings | 1 | Edit | Yes |
| audit.view | View audit logs | 2 | View | Backend-only / contextual |
| audit.export | Export audit logs | 1 | Export | Yes |
| notifications.view | View notifications | 2 | View | Backend-only / contextual |
| notifications.manage | Manage notifications | 1 | Create/Execute | Yes |
| security.view | View security settings | 5 | View | Backend-only / contextual |
| security.manage | Manage security settings | 1 | Edit | Yes |
| organization.view | View organization | 1 | View | Backend-only / contextual |
| organization.manage | Manage organization | 1 | Edit | Yes |
| departments.view | View departments | 1 | View | Backend-only / contextual |
| departments.manage | Manage departments | 3 | Create/Execute, Edit, Delete/Archive | Yes |
| sessions.manage | Manage user sessions | 3 | Manage, Delete/Archive | Yes |
| staff.profile.manage | Manage staff profiles | 1 | Edit | Yes |
| featureflags.manage | Manage feature flags | 1 | Edit | Yes |
| catalog.view | View product catalog | 16 | View | Backend-only / contextual |
| catalog.manage | Manage product catalog | 34 | Create/Execute, Edit, Delete/Archive, Bulk/Create | Yes |
| catalog.publish | Publish products to websites | 1 | Publish | Yes |
| catalog.export | Export catalog data | 1 | Export | Yes |
| inventory.view | View inventory | 16 | View | Backend-only / contextual |
| inventory.manage | Manage inventory | 3 | Create/Execute, Edit | Yes |
| inventory.receive | Receive stock | 1 | Receive | Yes |
| inventory.transfer | Transfer stock | 4 | Create/Execute, Edit | Yes |
| inventory.adjust | Adjust stock | 1 | Create/Execute | Yes |
| inventory.reserve | Manage stock reservations | 2 | Create/Execute, Edit | Yes |
| inventory.serialized | Manage serialized inventory | 2 | Manage | Backend-only / contextual |
| inventory.export | Export inventory data | 1 | Export | Yes |
| inventory.stocktake | Perform stocktakes and reconciliation | 5 | Create/Execute, Edit | Yes |
| inventory.incidents | Manage inventory damage and loss | 2 | Create/Execute, Edit | Yes |
| catalog.tags | Manage product tags | 2 | Manage, Create/Execute | Yes |
| suppliers.view | View suppliers | 0 | UI/permission only | Backend-only / contextual |
| suppliers.manage | Manage suppliers | 0 | UI/permission only | Yes |
| procurement.view | View procurement | 0 | UI/permission only | Backend-only / contextual |
| procurement.manage | Manage purchase orders | 0 | UI/permission only | Yes |
| procurement.requisition | Manage requisitions | 0 | UI/permission only | Yes |
| procurement.approve | Approve procurement documents | 0 | UI/permission only | Yes |
| procurement.receive | Receive purchase orders | 0 | UI/permission only | Yes |
| procurement.invoice | Manage supplier invoices | 0 | UI/permission only | Yes |
| procurement.payments | Record supplier payments | 0 | UI/permission only | Yes |
| procurement.export | Export procurement data | 0 | UI/permission only | Yes |
| customers.view | View customers | 3 | View | Backend-only / contextual |
| customers.manage | Manage customers | 1 | Create/Execute | Yes |
| customers.export | Export customer data | 0 | UI/permission only | Yes |
| customers.privacy | Manage customer privacy | 0 | UI/permission only | Yes |
| crm.view | View CRM | 0 | UI/permission only | Backend-only / contextual |
| crm.manage | Manage CRM | 0 | UI/permission only | Yes |
| support.view | View support cases | 0 | UI/permission only | Backend-only / contextual |
| support.manage | Manage support cases | 0 | UI/permission only | Yes |
| sales.view | View sales | 0 | UI/permission only | Backend-only / contextual |
| sales.create | Create sales | 0 | UI/permission only | Yes |
| sales.void | Void completed sales | 0 | UI/permission only | Yes |
| sales.export | Export sales | 0 | UI/permission only | Yes |
| sales.approve_discount | Approve sales discounts | 0 | UI/permission only | Yes |
| sales.approve_price | Approve sales price overrides | 0 | UI/permission only | Backend-only / contextual |
| sales.shift | Manage cashier shifts and tills | 0 | UI/permission only | Yes |
| sales.cash_adjust | Record till cash movements | 0 | UI/permission only | Yes |
| sales.reconcile | Reconcile and close tills | 0 | UI/permission only | Yes |
| sales.receipts | Manage receipts and reprints | 0 | UI/permission only | Yes |
| sales.quotes | Manage sales quotations | 0 | UI/permission only | Yes |
| sales.orders | Manage sales order handoff | 0 | UI/permission only | Backend-only / contextual |
| sales.refund | Process sales payment reversals | 0 | UI/permission only | Backend-only / contextual |
| orders.view | View orders | 0 | UI/permission only | Backend-only / contextual |
| reviews.view | View product reviews and questions | 2 | View | Backend-only / contextual |
| reviews.manage | Moderate product reviews and questions | 2 | Edit | Backend-only / contextual |
| orders.create | Create orders | 0 | UI/permission only | Yes |
| orders.manage | Manage orders | 0 | UI/permission only | Yes |
| orders.export | Export orders | 0 | UI/permission only | Yes |
| web.view | View web management | 0 | UI/permission only | Backend-only / contextual |
| web.manage | Manage website content | 0 | UI/permission only | Yes |
| web.publish.request | Request website publication | 0 | UI/permission only | Yes |
| web.publish.approve | Approve website publication | 0 | UI/permission only | Yes |
| web.publish.execute | Execute website publication | 0 | UI/permission only | Yes |
| web.domains | Manage website domains | 0 | UI/permission only | Yes |
| web.media | Manage website media | 0 | UI/permission only | Yes |
| media.view | View media library | 0 | UI/permission only | Backend-only / contextual |
| media.manage | Manage media library | 0 | UI/permission only | Yes |
| pricing.view | View pricing | 0 | UI/permission only | Backend-only / contextual |
| pricing.manage | Manage pricing | 0 | UI/permission only | Yes |
| pricing.export | Export pricing | 0 | UI/permission only | Yes |
| promotions.view | View promotions | 0 | UI/permission only | Backend-only / contextual |
| promotions.manage | Manage promotions | 0 | UI/permission only | Yes |
| promotions.approve | Approve promotions | 0 | UI/permission only | Yes |
| delivery.view | View delivery and logistics | 0 | UI/permission only | Yes |
| delivery.manage | Manage delivery and logistics | 0 | UI/permission only | Yes |
| warranty.view | View warranty and repairs | 0 | UI/permission only | Backend-only / contextual |
| warranty.manage | Manage warranty claims and repair jobs | 0 | UI/permission only | Yes |
| returns.view | View returns and refunds | 0 | UI/permission only | Backend-only / contextual |
| returns.manage | Manage returns and inspections | 0 | UI/permission only | Yes |
| returns.refund | Process refunds | 0 | UI/permission only | Yes |
| documents.view | View documents | 0 | UI/permission only | Backend-only / contextual |
| documents.manage | Upload and manage documents | 0 | UI/permission only | Yes |
| documents.download | Download documents | 0 | UI/permission only | Yes |
| delivery.partners | Manage delivery partners | 0 | UI/permission only | Yes |
| delivery.reports | View delivery partner reports | 0 | UI/permission only | Yes |
| warranty.partners | Manage repair partners | 0 | UI/permission only | Yes |
| warranty.reports | View repair partner reports | 0 | UI/permission only | Yes |
| security.devices | Manage trusted devices | 2 | Manage, Delete/Archive | Yes |
| credit.view | View credit and installments | 0 | UI/permission only | Backend-only / contextual |
| credit.manage | Manage credit profiles and applications | 0 | UI/permission only | Yes |
| credit.approve | Approve credit and restructures | 0 | UI/permission only | Yes |
| credit.payments | Record credit payments | 0 | UI/permission only | Yes |
| credit.collections | Manage credit collections | 0 | UI/permission only | Backend-only / contextual |
| finance.view | View finance and accounting | 0 | UI/permission only | Backend-only / contextual |
| finance.manage | Manage finance configuration | 0 | UI/permission only | Yes |
| finance.journals | Create manual journals | 0 | UI/permission only | Yes |
| finance.close | Close accounting periods | 0 | UI/permission only | Yes |
| finance.sync | Synchronize operational transactions to finance | 0 | UI/permission only | Yes |
| bi.view | View business intelligence | 0 | UI/permission only | Backend-only / contextual |
| bi.export | Export business intelligence reports | 0 | UI/permission only | Yes |
| bi.manage | Manage saved business intelligence reports | 0 | UI/permission only | Yes |
| ai.view | View AI business intelligence | 0 | UI/permission only | Backend-only / contextual |
| ai.manage | Govern AI configuration and training | 0 | UI/permission only | Yes |
| ai.reports | Generate and view AI reports | 0 | UI/permission only | Yes |
| integrations.view | View integration hub | 0 | UI/permission only | Backend-only / contextual |
| integrations.manage | Manage integration connections | 0 | UI/permission only | Yes |
| integrations.secrets | Manage integration secrets | 0 | UI/permission only | Backend-only / contextual |
| integrations.webhooks | Manage integration webhooks | 0 | UI/permission only | Yes |
| integrations.export | Export integration activity | 0 | UI/permission only | Backend-only / contextual |
| operations.view | View system operations | 0 | UI/permission only | Backend-only / contextual |
| operations.manage | Manage system operations | 0 | UI/permission only | Yes |
| monitoring.view | View monitoring and observability | 0 | UI/permission only | Backend-only / contextual |
| monitoring.manage | Manage monitoring and observability | 0 | UI/permission only | Yes |
| backup.view | View backups and recovery | 0 | UI/permission only | Backend-only / contextual |
| backup.manage | Manage backups and recovery | 0 | UI/permission only | Yes |
| featureflags.manage | ai.manage | 1 | Edit | Yes |
| maxLoginAttempts | lockoutMinutes | 0 | UI/permission only | Backend-only / contextual |
| Active | Suspended | 0 | UI/permission only | Backend-only / contextual |
| Damage | Loss | 0 | UI/permission only | Backend-only / contextual |
| Mobile Money | Card | 0 | UI/permission only | Backend-only / contextual |

## Certification result
- Permission registry: **137** entries discovered from the backend source.
- Guarded API routes: **145**.
- Unexpected unguarded API routes: **0**.
- Unknown UI permission identifiers: **0**.
- BI endpoint surface checked: **19**; missing: **0**.